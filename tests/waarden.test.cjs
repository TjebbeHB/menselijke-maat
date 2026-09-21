const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const vm = require('node:vm');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');

async function main() {
  const model = vm.runInNewContext(fs.readFileSync(path.join(root, 'waarden.js'), 'utf8') + fs.readFileSync(path.join(root, 'normen.js'), 'utf8') + ';({values:VALUE_TRADEOFFS,norms:NORMS,links:NORM_LINKS,positions:VALUE_POSITIONS})');
  assert.equal(model.values.length, 8);
  assert.equal(model.norms.length, 4);
  assert.deepEqual(Array.from(model.positions), [-3, -2, -1, 1, 2, 3]);
  for (const item of model.values) for (const side of ['left', 'right']) {
    const links = model.links[item.id][side];
    assert.ok(links.length);
    assert.equal(new Set(links.map((link) => link.norm)).size, links.length);
    for (const link of links) assert.ok(model.norms.some((norm) => norm.id === link.norm) && link.reason && link.action);
  }
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      res.setHeader('Content-Type', ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' })[path.extname(file)] || 'text/plain');
      res.end(fs.readFileSync(file));
    } catch { res.writeHead(404).end(); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(fs.existsSync(chrome) ? { executablePath: chrome } : {}) });
    const page = await browser.newPage({ viewport: { width: 1365, height: 1000 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const url = `http://127.0.0.1:${server.address().port}/`;
    await page.goto(url);
    await page.locator('[data-start-tool]').first().click();
    await page.locator('[data-phase-link="values"]').click();
    assert.equal(await page.locator('#sliderChoice').textContent(), 'Nog open');
    assert.equal(await page.evaluate(() => Object.keys(state.valueChoices).length), 0);
    assert.equal(await page.evaluate(() => getNormProfile().every((norm) => norm.points === 0 && norm.open > 0)), true);
    await page.locator('#valueSlider').focus();
    await page.locator('#valueSlider').press('Home');
    assert.equal(await page.evaluate(() => state.valueChoices.eenvoud), -3);
    await page.locator('#valueSlider').press('ArrowRight');
    await page.locator('#valueSlider').press('ArrowRight');
    assert.equal(await page.evaluate(() => state.valueChoices.eenvoud), -1);
    await page.locator('#valueSlider').press('ArrowRight');
    assert.equal(await page.evaluate(() => state.valueChoices.eenvoud), 1);
    const note = 'Meer hulp | minder stappen\n<img src=x onerror=alert(1)> **reden**';
    await page.locator('#valueNote').fill(note);
    await page.locator('[data-open-knowledge]').click();
    assert.equal(await page.locator('#knowledge').isVisible(), true);
    assert.equal(await page.locator('#waarde-eenvoud').isVisible(), true);
    await page.locator('#returnToValues').click();
    assert.equal(await page.locator('#valueNote').inputValue(), note);
    await page.reload();
    assert.equal(await page.locator('#valueNote').inputValue(), note);
    assert.equal(await page.evaluate(() => state.valueChoices.eenvoud), 1);
    // Both sides and every strength produce exactly the disclosed point contributions.
    const scoring = await page.evaluate(() => {
      for (const item of VALUE_TRADEOFFS) for (const position of VALUE_POSITIONS) {
        const saved = state.valueChoices;
        state.valueChoices = { [item.id]: position };
        const rows = getNormProfile();
        const links = NORM_LINKS[item.id][position < 0 ? 'left' : 'right'];
        for (const row of rows) {
          const expected = links.some((link) => link.norm === row.id) ? Math.abs(position) : 0;
          if (row.points !== expected || row.points > row.maximum) return false;
        }
        state.valueChoices = saved;
      }
      return true;
    });
    assert.equal(scoring, true);
    for (let index = 0; index < 8; index++) {
      await page.locator(`[data-value-index="${index}"]`).click();
      await page.locator('#valueSlider').press('End');
    }
    await page.locator('[data-value-index="6"]').click();
    await page.locator('[name="delivery-mode"][value="adapt"]').check();
    await page.locator('[data-phase-link="report"]').click();
    assert.match(await page.locator('#reportPreview').textContent(), /8\/8 keuzes vastgelegd/);
    assert.equal(await page.locator('#reportPreview img').count(), 0);
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadReport').click();
    const download = await downloadPromise;
    const markdown = fs.readFileSync(await download.path(), 'utf8');
    assert.match(markdown, /Aandachtsprofiel/);
    assert.match(markdown, /aandachtsprofiel-1/);
    assert.match(markdown, /Bestaande oplossing aanpassen/);
    assert.match(markdown, /&lt;img/);
    assert.match(markdown, /hulp \\\| minder stappen/);
    for (const item of model.values) assert.ok(markdown.includes(`#waarde-${item.id}`));
    const totals = await page.evaluate(() => getNormProfile().map((norm) => ({ points: norm.points, max: norm.maximum, open: norm.open })));
    totals.forEach((norm) => { assert.ok(norm.points <= norm.max); assert.equal(norm.open, 0); });
    // Check narrow layout, then save review images locally (not in the published site).
    fs.mkdirSync(path.join(root, 'test-results'), { recursive: true });
    await page.screenshot({ path: path.join(root, 'test-results/report-desktop.png'), fullPage: true });
    await page.locator('[data-phase-link="values"]').click();
    await page.locator('[data-value-index="0"]').click();
    await page.screenshot({ path: path.join(root, 'test-results/slider-desktop.png'), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.screenshot({ path: path.join(root, 'test-results/slider-mobile.png'), fullPage: true });
    await page.locator('#clearValue').click();
    assert.equal(await page.evaluate(() => state.valueChoices.eenvoud), undefined);
    await page.locator('#valueSlider').click();
    assert.ok([-3, -2, -1, 1, 2, 3].includes(await page.evaluate(() => state.valueChoices.eenvoud)));
    await page.goto(url + '#waarde-macht');
    assert.equal(await page.locator('#knowledge').isVisible(), true);
    assert.equal(await page.locator('#waarde-macht').isVisible(), true);
    await page.locator('[data-weigh="macht"]').click();
    assert.equal(await page.evaluate(() => state.valueIndex), 7);
    // Existing checklist answers must not become slider preferences.
    await page.evaluate(() => localStorage.setItem(STORAGE_KEY, JSON.stringify({ view: 'tool', phase: 'checklist', checklist: { easier: 'good' }, euAnswers: { data: 'personal' } })));
    await page.goto(url);
    await page.reload();
    assert.equal(await page.evaluate(() => state.phase), 'values');
    assert.equal(await page.evaluate(() => Object.keys(state.valueChoices).length), 0);
    assert.equal(await page.evaluate(() => state.euAnswers.data), 'personal');
    assert.deepEqual(errors, []);
    console.log('Geslaagd: zes standen, 48 puntenscenario’s, opslag, terugkeer kennisbank, verslag, migratie en mobiele weergave.');
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
