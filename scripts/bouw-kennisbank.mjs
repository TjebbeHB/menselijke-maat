import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = (await readdir(path.join(root, 'kennisbank'))).filter((name) => /^\d{2}-.+\.md$/.test(name)).sort();
const ids = new Set();
const articles = [];
for (const file of files) {
  const text = (await readFile(path.join(root, 'kennisbank', file), 'utf8')).replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: voorblad ontbreekt`);
  const meta = Object.fromEntries(match[1].split('\n').map((line) => {
    const colon = line.indexOf(':');
    if (colon < 0) throw new Error(`${file}: ongeldige regel in voorblad`);
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
  }));
  for (const key of ['id', 'title', 'left', 'right', 'question']) if (!meta[key]) throw new Error(`${file}: ${key} ontbreekt`);
  if (!/^[a-z][a-z0-9-]*$/.test(meta.id) || ids.has(meta.id)) throw new Error(`${file}: ongeldig of dubbel id`);
  ids.add(meta.id);
  const sections = Object.fromEntries([...match[2].matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map((part) => [part[1].trim(), part[2].trim()]));
  const section = (title) => {
    if (!sections[title]) throw new Error(`${file}: sectie ${title} ontbreekt`);
    return sections[title];
  };
  articles.push({ ...meta, context: section('Context'), example: section('Voorbeeld'), effects: [section('Meer nadruk op links'), section('Combineren in de uitvoering'), section('Meer nadruk op rechts')], actions: section('Mogelijke uitwerkingen').split('\n').filter((line) => line.startsWith('- ')).map((line) => line.slice(2)), guardrail: section('Aandachtspunt') });
}
if (articles.length !== 8) throw new Error('Deze versie verwacht acht afwegingen; pas bij uitbreiding ook de normkoppelingen aan.');
await writeFile(path.join(root, 'waarden.js'), '// Automatisch opgebouwd uit kennisbank/*.md. Pas de Markdown-bronnen aan.\nconst VALUE_TRADEOFFS = ' + JSON.stringify(articles, null, 2) + ';\n');
console.log(`${articles.length} kennisbankartikelen opgebouwd.`);
