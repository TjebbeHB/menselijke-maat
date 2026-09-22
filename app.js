const STORAGE_KEY = "menselijke-maat-verkenner-v2";

const PHASES = ["eu", "values", "vignettes", "citizens", "report"];
const KNOWLEDGE_URL = "https://tjebbehb.github.io/menselijke-maat/";

const EU_QUESTIONS = [
  {
    id: "purpose",
    title: "Waarvoor wil je AI inzetten?",
    help: "Kies wat het meest lijkt op de toepassing die jullie bespreken.",
    options: [
      ["support", "Ondersteuning", "AI helpt bij samenvatten, zoeken of voorbereiden."],
      ["advice", "Advies aan medewerkers", "AI geeft een signaal, score of voorstel aan een ambtenaar."],
      ["decision", "Besluit of toegang", "AI heeft invloed op een besluit of toegang tot dienstverlening."],
    ],
  },
  {
    id: "rights",
    title: "Kan een burger merkbaar geraakt worden?",
    help: "Denk aan geld, hulp, toezicht, bezwaar, wachttijd of toegang tot een regeling.",
    options: [
      ["yes", "Ja", "De uitkomst kan gevolgen hebben voor burgers."],
      ["maybe", "Misschien", "Dat is nog niet goed uitgezocht."],
      ["no", "Nee", "Het blijft intern en zonder effect op dienstverlening."],
    ],
  },
  {
    id: "prohibited",
    title: "Zit er mogelijk een verboden AI-praktijk in?",
    help: "Bij twijfel: kies 'onzeker' en laat dit eerst juridisch toetsen.",
    tooltip:
      "Social scoring betekent dat mensen een algemene score krijgen op basis van gedrag, kenmerken of voorspellingen, waarna toegang tot diensten of rechten kan veranderen. De AI Act verbiedt bepaalde vormen hiervan.",
    options: [
      ["yes", "Ja", "Bijvoorbeeld social scoring, verboden biometrie of manipulatieve sturing."],
      ["maybe", "Onzeker", "Er is juridische duiding nodig voordat je verder gaat."],
      ["no", "Nee", "Er zijn geen duidelijke signalen van verboden praktijken."],
    ],
  },
  {
    id: "data",
    title: "Welke data gebruikt de toepassing?",
    help: "Kies het gevoeligste type data dat in de praktijk voorkomt.",
    tooltip:
      "Bijzondere persoonsgegevens zijn bijvoorbeeld gegevens over gezondheid, afkomst, religie of biometrische kenmerken. Daarvoor gelden zwaardere privacy-eisen.",
    options: [
      ["anonymous", "Anoniem of synthetisch", "Geen persoonsgegevens."],
      ["personal", "Persoonsgegevens", "Data kan tot personen herleid worden."],
      ["sensitive", "Kwetsbaar of bijzonder", "Bijvoorbeeld gezondheid, schulden, kinderen of biometrie."],
    ],
  },
  {
    id: "human",
    title: "Kan een mens de AI-uitkomst echt controleren?",
    help: "Het gaat niet om een vinkje, maar om echte tijd, kennis en bevoegdheid om af te wijken.",
    options: [
      ["strong", "Ja, goed geregeld", "Medewerkers kunnen begrijpen, controleren en afwijken."],
      ["partial", "Deels", "Er is menselijk toezicht, maar nog niet sterk genoeg."],
      ["weak", "Nee of onduidelijk", "De AI-uitkomst zal waarschijnlijk leidend worden."],
    ],
  },
  {
    id: "procurement",
    title: "Zijn afspraken over AI al vastgelegd?",
    help: "Denk aan logging, auditrechten, modelwijzigingen, incidenten, data en uitleg.",
    options: [
      ["ready", "Ja", "Er zijn duidelijke AI-afspraken en contractvoorwaarden."],
      ["partial", "Deels", "Er is iets geregeld, maar nog niet compleet."],
      ["none", "Nog niet", "Er zijn nog geen specifieke AI-afspraken."],
    ],
  },
];

const SCORE_OPTIONS = [
  ["good", "Goed geregeld", 2],
  ["partial", "Deels", 1],
  ["missing", "Nog niet", 0],
];

const VIGNETTES = [
  {
    id: "stress",
    label: "Schuldenstress",
    title: "Alleenstaande ouder met schuldenstress",
    scenario:
      "De burger moet meerdere bewijsstukken aanleveren, begrijpt de brief niet goed en stopt zodra een formulier terugkomt met fouten.",
    prompts: [
      "Waar wordt dit proces voor deze burger slechter dan nu?",
      "Wanneer moet een medewerker actief contact opnemen?",
      "Welke indicator toont vroeg dat deze groep vastloopt?",
    ],
  },
  {
    id: "caregiver",
    label: "Mantelzorger",
    title: "Oudere burger met mantelzorger",
    scenario:
      "De formele aanvrager en de feitelijke gebruiker zijn niet dezelfde persoon. Informatie loopt via een familielid.",
    prompts: [
      "Welke stap veronderstelt te veel zelfstandigheid?",
      "Hoe regel je toestemming en overdracht zonder extra last?",
      "Wat moet dezelfde dag nog via een mens kunnen?",
    ],
  },
  {
    id: "language",
    label: "Taalbarrière",
    title: "Burger met taalbarrière en laag vertrouwen",
    scenario:
      "De burger begrijpt formele taal slecht, vertrouwt overheidsteksten weinig en haakt af bij modelmatige toon.",
    prompts: [
      "Welke uitleg moet in gewone taal beschikbaar zijn?",
      "Hoe voorkom je dat AI-taal afstandelijk of dreigend voelt?",
      "Hoe test je of de uitleg echt wordt begrepen?",
    ],
  },
  {
    id: "worker",
    label: "Medewerker",
    title: "Uitvoerende medewerker met hoge werkdruk",
    scenario:
      "De tool lijkt tijd te winnen, maar uitzonderingen en subtiele context uit gesprekken raken makkelijker uit beeld.",
    prompts: [
      "Waar kan interne efficiëntie botsen met menselijke dienstverlening?",
      "Op welke momenten moeten medewerkers kunnen afwijken?",
      "Welke signalen tonen dat medewerkers te veel op AI gaan leunen?",
    ],
  },
  {
    id: "neurodivergence",
    label: "Neurodivergentie",
    title: "Burger die informatie anders verwerkt",
    scenario: "Een neurodivergente burger raakt overbelast door veel prikkels, onduidelijke instructies of onverwachte veranderingen. Wat helpt verschilt per persoon; ga daarover in gesprek.",
    prompts: [
      "Kan iemand de route in eigen tempo doorlopen, pauzeren en hervatten?",
      "Zijn instructies concreet en voorspelbaar, zonder onnodige prikkels?",
      "Kan iemand passende ondersteuning of een andere contactvorm kiezen zonder een diagnose te moeten delen?"
    ]
  },
];

const VIGNETTE_STATUS = [
  ["todo", "Nog niet besproken"],
  ["done", "Besproken"],
  ["redesign", "Herontwerp nodig"],
];

const SURVEY = [
  {
    id: "understand",
    title: "Ik begrijp wat er van mij verwacht wordt.",
    help: "Meet begrijpelijkheid van het huidige proces.",
  },
  {
    id: "human",
    title: "Ik kan een mens bereiken als ik vastloop.",
    help: "Meet of de menselijke route echt zichtbaar en bereikbaar is.",
  },
  {
    id: "fair",
    title: "Ik voel mij eerlijk en respectvol behandeld.",
    help: "Meet ervaren rechtvaardigheid en toon.",
  },
  {
    id: "effort",
    title: "Het proces kost mij niet onnodig veel tijd of moeite.",
    help: "Meet administratieve last en kanaalwisselingen.",
  },
];

const state = loadState();

const dom = {
  views: document.querySelectorAll(".view"),
  navLinks: document.querySelectorAll("[data-view-link]"),
  phaseLinks: document.querySelectorAll("[data-phase-link]"),
  phases: document.querySelectorAll(".phase"),
  questionCard: document.querySelector("#questionCard"),
  euAnswerList: document.querySelector("#euAnswerList"),
  euProgress: document.querySelector("#euProgress"),
  previousQuestion: document.querySelector("#previousQuestion"),
  valueNavigation: document.querySelector("#valueNavigation"),
  valueCard: document.querySelector("#valueCard"),
  valuesProgress: document.querySelector("#valuesProgress"),
  valuesSummary: document.querySelector("#valuesSummary"),
  valueKnowledge: document.querySelector("#valueKnowledge"),
  returnToValues: document.querySelector("#returnToValues"),
  vignetteTabs: document.querySelector("#vignetteTabs"),
  vignetteMeta: document.querySelector("#vignetteMeta"),
  vignetteName: document.querySelector("#vignetteName"),
  vignetteScenario: document.querySelector("#vignetteScenario"),
  vignettePrompts: document.querySelector("#vignettePrompts"),
  vignetteStatuses: document.querySelector("#vignetteStatuses"),
  vignetteNotes: document.querySelector("#vignetteNotes"),
  vignetteScore: document.querySelector("#vignetteScore"),
  vignetteSummary: document.querySelector("#vignetteSummary"),
  surveyGrid: document.querySelector("#surveyGrid"),
  surveyScore: document.querySelector("#surveyScore"),
  surveySummary: document.querySelector("#surveySummary"),
  reportPreview: document.querySelector("#reportPreview"),
  downloadReport: document.querySelector("#downloadReport"),
  resetProgress: document.querySelector("#resetProgress"),
};

function defaultState() {
  return {
    view: "home",
    phase: "eu",
    euIndex: 0,
    euAnswers: {},
    valueIndex: 0,
    valueChoices: {},
    valueNotes: {},
    scoringVersion: SCORING_VERSION,
    deliveryMode: "",
    selectedVignette: VIGNETTES[0].id,
    vignetteStatus: Object.fromEntries(VIGNETTES.map((item) => [item.id, "todo"])),
    vignetteNotes: Object.fromEntries(VIGNETTES.map((item) => [item.id, ""])),
    survey: {},
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    const next = { ...defaultState(), ...saved };
    if (next.phase === "checklist") next.phase = "values";
    next.valueIndex = Number.isInteger(next.valueIndex) ? Math.max(0, Math.min(VALUE_TRADEOFFS.length - 1, next.valueIndex)) : 0;
    next.valueChoices = {};
    next.valueNotes = {};
    delete next.valueReview;
    if (next.view === "tools") next.view = "knowledge";
    VALUE_TRADEOFFS.forEach((item) => {
      const choice = saved.valueChoices?.[item.id];
      if (saved.scoringVersion === SCORING_VERSION && VALUE_POSITIONS.includes(choice)) next.valueChoices[item.id] = choice;
      if (saved.scoringVersion === "aandachtsprofiel-1") {
        if ([-3, -1, 1, 3].includes(choice)) next.valueChoices[item.id] = Math.sign(choice) * (Math.abs(choice) === 3 ? 2 : 1);
      }
      next.valueNotes[item.id] = typeof saved.valueNotes?.[item.id] === "string" ? saved.valueNotes[item.id] : "";
    });
    next.scoringVersion = SCORING_VERSION;
    next.deliveryMode = ["build", "adapt", "buy"].includes(saved.deliveryMode) ? saved.deliveryMode : "";
    next.vignetteStatus = { ...defaultState().vignetteStatus, ...(saved.vignetteStatus || {}) };
    next.vignetteNotes = { ...defaultState().vignetteNotes, ...(saved.vignetteNotes || {}) };
    if (!VIGNETTES.some((item) => item.id === next.selectedVignette)) next.selectedVignette = VIGNETTES[0].id;
    return next;
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // If browser storage is unavailable, the prototype still works for the current session.
  }
}

function init() {
  renderValueKnowledge();
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#waarde-"]');
    if (!link) return;
    event.preventDefault();
    if (state.view === "tool") dom.returnToValues.hidden = false;
    history.pushState(null, "", link.getAttribute("href"));
    openKnowledgeFromHash();
  });
  dom.returnToValues.addEventListener("click", () => {
    state.view = "tool";
    state.phase = "values";
    history.replaceState(null, "", location.pathname + location.search);
    saveState();
    render();
    document.querySelector("#valueQuestion").focus();
  });
  window.addEventListener("hashchange", openKnowledgeFromHash);
  document.querySelectorAll("[data-start-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = "tool";
      state.phase = "eu";
      saveState();
      render();
    });
  });

  dom.navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      state.view = link.dataset.viewLink;
      saveState();
      render();
    });
  });

  dom.phaseLinks.forEach((link) => {
    link.addEventListener("click", () => {
      state.view = "tool";
      state.phase = link.dataset.phaseLink;
      saveState();
      render();
    });
  });

  document.querySelectorAll("[data-next-phase]").forEach((button) => {
    button.addEventListener("click", () => goRelativePhase(1));
  });

  document.querySelectorAll("[data-prev-phase]").forEach((button) => {
    button.addEventListener("click", () => goRelativePhase(-1));
  });

  dom.previousQuestion.addEventListener("click", () => {
    state.euIndex = Math.max(0, state.euIndex - 1);
    saveState();
    render();
  });

  dom.vignetteNotes.addEventListener("input", (event) => {
    state.vignetteNotes[state.selectedVignette] = event.target.value;
    saveState();
    renderVignetteSummary();
    renderReport();
  });

  dom.downloadReport.addEventListener("click", downloadReport);

  dom.resetProgress.addEventListener("click", () => {
    Object.assign(state, defaultState(), { view: "tool" });
    saveState();
    render();
  });

  render();
  openKnowledgeFromHash();
}

function goRelativePhase(direction) {
  const current = PHASES.indexOf(state.phase);
  state.view = "tool";
  state.phase = PHASES[Math.min(PHASES.length - 1, Math.max(0, current + direction))];
  saveState();
  render();
}

function render() {
  renderViews();
  renderPhases();
  renderQuestion();
  renderValues();
  renderVignettes();
  renderSurvey();
  renderReport();
}

function renderViews() {
  dom.views.forEach((view) => view.classList.toggle("active-view", view.id === state.view));
  dom.navLinks.forEach((link) => link.classList.toggle("active", link.dataset.viewLink === state.view));
}

function renderPhases() {
  dom.phases.forEach((phase) => phase.classList.toggle("active-phase", phase.dataset.phase === state.phase));
  dom.phaseLinks.forEach((link) => link.classList.toggle("active", link.dataset.phaseLink === state.phase));
}

function renderQuestion() {
  const question = EU_QUESTIONS[state.euIndex];
  const answeredCount = Object.keys(state.euAnswers).length;
  dom.euProgress.textContent = `${answeredCount}/${EU_QUESTIONS.length}`;
  dom.previousQuestion.disabled = state.euIndex === 0;

  const tooltip = question.tooltip
    ? `<button class="tooltip" type="button" aria-label="Uitleg bij dit begrip">i<span>${question.tooltip}</span></button>`
    : "";

  dom.questionCard.innerHTML = `
    <p class="kicker">Vraag ${state.euIndex + 1} van ${EU_QUESTIONS.length}</p>
    <div class="question-title-row">
      <h2>${question.title}</h2>
      ${tooltip}
    </div>
    <p>${question.help}</p>
    <div class="option-grid">
      ${question.options
        .map(([value, label, note]) => {
          const active = state.euAnswers[question.id] === value ? " active" : "";
          return `<button class="option-button${active}" type="button" data-eu-answer="${value}">
            <strong>${label}</strong>
            <span>${note}</span>
          </button>`;
        })
        .join("")}
    </div>
  `;

  dom.questionCard.querySelectorAll("[data-eu-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.euAnswers[question.id] = button.dataset.euAnswer;
      if (state.euIndex < EU_QUESTIONS.length - 1) {
        state.euIndex += 1;
      } else {
        state.phase = "values";
      }
      saveState();
      render();
    });
  });

  dom.euAnswerList.innerHTML = EU_QUESTIONS.map((item) => {
    const answer = state.euAnswers[item.id];
    if (!answer) return "";
    const option = item.options.find(([value]) => value === answer);
    return `<li><strong>${item.title}</strong><br>${option[1]}</li>`;
  }).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function valueLabel(item) {
  const choice = state.valueChoices[item.id];
  if (!VALUE_POSITIONS.includes(choice)) return "Nog open";
  const strength = ["", "Lichte", "Sterke"][Math.abs(choice)];
  return `${strength} voorkeur voor ${(choice < 0 ? item.left : item.right).toLowerCase()}`;
}

function valueEffect(item) {
  const choice = state.valueChoices[item.id];
  if (choice === undefined) return "Kies een richting om de mogelijke gevolgen te verkennen. Je kunt dit ook openlaten voor het gesprek.";
  return item.effects[choice < 0 ? 0 : 2];
}

function normContributions(item) {
  const choice = state.valueChoices[item.id];
  if (!VALUE_POSITIONS.includes(choice)) return [];
  return NORM_LINKS[item.id][choice < 0 ? "left" : "right"].map((link) => ({ ...link, points: Math.abs(choice), tradeoff: item.title, id: item.id }));
}

function getNormProfile() {
  return NORMS.map((norm) => {
    const relevant = VALUE_TRADEOFFS.filter((item) => [...NORM_LINKS[item.id].left, ...NORM_LINKS[item.id].right].some((link) => link.norm === norm.id));
    const contributions = VALUE_TRADEOFFS.flatMap(normContributions).filter((entry) => entry.norm === norm.id);
    const answered = relevant.filter((item) => VALUE_POSITIONS.includes(state.valueChoices[item.id])).length;
    return { ...norm, contributions, points: contributions.reduce((sum, entry) => sum + entry.points, 0), maximum: relevant.length * 2, open: relevant.length - answered };
  });
}

function renderValues() {
  const item = VALUE_TRADEOFFS[state.valueIndex];
  dom.valueNavigation.innerHTML = VALUE_TRADEOFFS.map((entry, index) => `<button type="button" class="chip${index === state.valueIndex ? " active" : ""}" data-value-index="${index}" aria-label="${index + 1}. ${escapeHtml(entry.title)}${state.valueChoices[entry.id] !== undefined ? ", keuze vastgelegd" : ", nog open"}" ${index === state.valueIndex ? 'aria-current="step"' : ""}>${index + 1}${state.valueChoices[entry.id] !== undefined ? " ✓" : ""}</button>`).join("");
  dom.valueNavigation.querySelectorAll("[data-value-index]").forEach((button) => button.addEventListener("click", () => selectValue(Number(button.dataset.valueIndex))));
  dom.valueCard.innerHTML = `
    <p class="kicker">Afweging ${state.valueIndex + 1} van ${VALUE_TRADEOFFS.length} · ${escapeHtml(item.title)}</p>
    <h3 id="valueQuestion" tabindex="-1">${escapeHtml(item.question)}</h3>
    <p>${escapeHtml(item.context)}</p>
    <p class="value-example"><strong>Bijvoorbeeld:</strong> ${escapeHtml(item.example)}</p>
    <div class="value-scale${state.valueChoices[item.id] === undefined ? " unanswered" : ""}" id="valueScale">
      <label for="valueSlider" class="value-note-label">Welke kant krijgt voorrang?</label>
      <div class="scale-poles"><strong>${escapeHtml(item.left)}</strong><strong>${escapeHtml(item.right)}</strong></div>
      <input type="range" id="valueSlider" min="0" max="3" step="1" value="${VALUE_POSITIONS.indexOf(state.valueChoices[item.id]) >= 0 ? VALUE_POSITIONS.indexOf(state.valueChoices[item.id]) : 1}" aria-describedby="sliderHint sliderChoice" aria-valuetext="${escapeHtml(valueLabel(item))}">
      <div class="scale-ticks" aria-hidden="true"><span>Sterk</span><span>Licht</span><span>Licht</span><span>Sterk</span></div>
      <p id="sliderHint" class="muted-note">Vier standen, zonder midden. Klik, sleep of gebruik de pijltjestoetsen. Een keuze telt pas nadat je de schuifregelaar gebruikt.</p>
      <output id="sliderChoice" for="valueSlider" aria-live="polite">${escapeHtml(valueLabel(item))}</output>
    </div>
    <div class="value-consequence" aria-live="polite"><strong>Wat kan deze keuze betekenen?</strong><p id="valueEffect">${escapeHtml(valueEffect(item))}</p></div>
    ${item.id === "beheer" ? `<fieldset class="delivery-options"><legend>Hoe wil je dit uitvoeren? <span>(optioneel)</span></legend>${[["build", "Zelf bouwen"], ["adapt", "Bestaande oplossing aanpassen"], ["buy", "Inkopen"]].map(([id, label]) => `<label><input type="radio" name="delivery-mode" value="${id}" ${state.deliveryMode === id ? "checked" : ""}> ${label}</label>`).join("")}</fieldset>` : ""}
    <label class="value-note-label" for="valueNote">Waarom past dit? Wie kan nadeel ervaren en wat doe je daarmee? <span>(optioneel)</span></label>
    <textarea id="valueNote" rows="3" placeholder="Een paar zinnen is genoeg. Noteer eventueel wat nog uitgezocht moet worden.">${escapeHtml(state.valueNotes[item.id] || "")}</textarea>
    <div class="value-links"><a href="#waarde-${item.id}" data-open-knowledge>Verdiep deze afweging in de kennisbank →</a><button type="button" class="small-button ghost" id="clearValue">Keuze openlaten</button></div>
    <div class="phase-actions"><button type="button" class="small-button" id="previousValue" ${state.valueIndex === 0 ? "disabled" : ""}>← Vorige afweging</button><button type="button" class="small-button primary" id="nextValue">${state.valueIndex === VALUE_TRADEOFFS.length - 1 ? "Verder naar de casussen →" : "Volgende afweging →"}</button></div>`;
  const slider = document.querySelector("#valueSlider");
  const updateChoice = () => {
    state.valueChoices[item.id] = VALUE_POSITIONS[Number(slider.value)];
    saveState();
    slider.setAttribute("aria-valuetext", valueLabel(item));
    document.querySelector("#sliderChoice").textContent = valueLabel(item);
    document.querySelector("#valueScale").classList.remove("unanswered");
    document.querySelector("#valueEffect").textContent = valueEffect(item);
    renderValueProgress();
    renderReport();
  };
  slider.addEventListener("input", updateChoice);
  slider.addEventListener("pointerup", updateChoice);
  slider.addEventListener("keydown", (event) => {
    if (["Enter", " "].includes(event.key)) { event.preventDefault(); updateChoice(); }
  });
  dom.valueCard.querySelectorAll('[name="delivery-mode"]').forEach((input) => input.addEventListener("change", () => { state.deliveryMode = input.value; saveState(); renderReport(); }));
  document.querySelector("#valueNote").addEventListener("input", (event) => {
    state.valueNotes[item.id] = event.target.value;
    saveState();
    renderValueProgress();
    renderReport();
  });
  document.querySelector("#clearValue").addEventListener("click", () => {
    delete state.valueChoices[item.id];
    saveState();
    renderValues();
    renderReport();
    document.querySelector("#clearValue").focus();
  });
  document.querySelector("#previousValue").addEventListener("click", () => selectValue(state.valueIndex - 1));
  document.querySelector("#nextValue").addEventListener("click", () => {
    if (state.valueIndex < VALUE_TRADEOFFS.length - 1) selectValue(state.valueIndex + 1);
    else goRelativePhase(1);
  });
  renderValueProgress();
}

function selectValue(index) {
  state.valueIndex = index;
  saveState();
  renderValues();
  document.querySelector("#valueQuestion").focus();
}

function renderValueProgress() {
  const summary = getValuesSummary();
  dom.valuesProgress.textContent = `${summary.answered}/${VALUE_TRADEOFFS.length}`;
  dom.valuesSummary.textContent = summary.text;
  dom.valueNavigation.querySelectorAll("[data-value-index]").forEach((button) => {
    const index = Number(button.dataset.valueIndex);
    const item = VALUE_TRADEOFFS[index];
    const answered = state.valueChoices[item.id] !== undefined;
    button.textContent = `${index + 1}${answered ? " ✓" : ""}`;
    button.setAttribute("aria-label", `${index + 1}. ${item.title}, ${answered ? "keuze vastgelegd" : "nog open"}`);
  });
}

function renderValueKnowledge() {
  dom.valueKnowledge.innerHTML = `<h2>Waarden in de praktijk</h2><nav class="knowledge-index" aria-label="Waarden in de kennisbank">${VALUE_TRADEOFFS.map((item) => `<a href="#waarde-${item.id}">${escapeHtml(item.title)}</a>`).join("")}</nav>` + VALUE_TRADEOFFS.map((item) => `<article id="waarde-${item.id}" class="knowledge-article" tabindex="-1"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.context)}</p><p><strong>Voorbeeld:</strong> ${escapeHtml(item.example)}</p><h4>Mogelijke gevolgen van de richting</h4><ul>${item.effects.map((effect) => `<li>${escapeHtml(effect)}</li>`).join("")}</ul><h4>Mogelijke uitwerkingen</h4><ul>${item.actions.map((action) => `<li>${escapeHtml(action)}</li>`).join("")}</ul><p class="value-consequence"><strong>Aandachtspunt:</strong> ${escapeHtml(item.guardrail)}</p><button type="button" class="small-button" data-weigh="${item.id}">Bespreek deze afweging →</button></article>`).join("");
  dom.valueKnowledge.querySelectorAll("[data-weigh]").forEach((button) => button.addEventListener("click", () => {
    state.valueIndex = VALUE_TRADEOFFS.findIndex((item) => item.id === button.dataset.weigh);
    dom.returnToValues.click();
  }));
  dom.valueKnowledge.insertAdjacentHTML("afterbegin", `<section class="hierarchy"><h2>Menselijke maat in het ontwerp</h2><figure class="hierarchy-figure"><picture><source media="(max-width: 680px)" srcset="assets/waardenhierarchie-mobiel.svg" width="620" height="1594"><img src="assets/waardenhierarchie.svg" width="1240" height="740" alt="Waardenhiërarchie: menselijke maat wordt vertaald naar vier normen en vervolgens naar concrete ontwerpkeuzes. De volledige uitleg staat onder de afbeelding."></picture></figure><details class="hierarchy-text"><summary>Lees de waardenhiërarchie als tekst</summary><div class="norm-grid">${NORMS.map((norm) => `<article><h3>${escapeHtml(norm.title)}</h3><p>${escapeHtml(norm.description)}</p><p><strong>Ontwerpkeuze:</strong> ${escapeHtml(norm.action)}</p></article>`).join("")}</div></details></section>`);
  VALUE_TRADEOFFS.forEach((item) => {
    document.querySelector(`#waarde-${item.id}`).insertAdjacentHTML("beforeend", `<details class="norm-mapping"><summary>Koppeling aan de normen</summary>${["left", "right"].map((side) => `<h4>Bij meer nadruk op ${(side === "left" ? item.left : item.right).toLowerCase()}</h4><ul>${NORM_LINKS[item.id][side].map((link) => `<li><strong>${escapeHtml(NORMS.find((norm) => norm.id === link.norm).title)}:</strong> ${escapeHtml(link.reason)} ${escapeHtml(link.action)}</li>`).join("")}</ul>`).join("")}<p>Het rapport verbindt je voorkeur aan deze normen en bijbehorende ontwerpkeuzes.</p></details>`);
  });
}

function scoringExplanation() {
  return `<details class="scoring-method"><summary>Hoe worden de aandachtspunten berekend?</summary><p>De vier standen zijn −2, −1, +1 en +2. Het teken geeft de kant aan; een lichte voorkeur geeft 1 punt en een sterke voorkeur 2 punten aan iedere norm die bij die kant extra ontwerpaandacht vraagt. Er worden geen punten afgetrokken: zorgen kunnen elkaar niet wegstrepen.</p><p>Per norm tellen we de punten op. Het maximum is twee maal het aantal afwegingen dat aan die norm kan raken. De maxima verschillen; vergelijk de ruwe aantallen daarom niet als een ranglijst. Open vragen tellen niet als nul: ze staan apart vermeld en maken het profiel voorlopig.</p><p>De uitkomst is geen rapportcijfer, risicokans of bewijs dat aan een norm is voldaan. De koppelingen tussen de afwegingen en de vier normen en de weging 1–2 zijn een nog niet gevalideerde uitwerking (${SCORING_VERSION}). Alle vier de normen blijven van belang, ook bij nul extra punten. Ontwerpkeuzes verdienen geen aftrekpunten; hun werking moet je in de praktijk toetsen.</p></details>`;
}

function normProfileHtml() {
  const summary = getValuesSummary();
  return `<h3>${summary.open.length ? "Voorlopig aandachtsprofiel" : "Aandachtsprofiel bij je keuzes"}</h3><p>${summary.label}. De punten helpen om ontwerpaandacht te verdelen over de vier normen. Ze beoordelen niet of een keuze goed of fout is.</p><div class="norm-grid">${getNormProfile().map((norm) => `<article><h4>${escapeHtml(norm.title)}</h4><p class="norm-points">${norm.points} <span>van ${norm.maximum} mogelijke aandachtspunten</span></p><p>${norm.open ? `${norm.open} relevante afweging(en) nog open; de uitkomst is voorlopig.` : "Alle relevante afwegingen ingevuld."}</p><p><strong>Ontwerpkeuze:</strong> ${escapeHtml(norm.action)}</p><details><summary>Waarom deze punten en wat kun je doen?</summary>${norm.contributions.length ? `<ul>${norm.contributions.map((entry) => `<li><strong>${escapeHtml(entry.tradeoff)}: +${entry.points}.</strong> ${escapeHtml(entry.reason)}<br><strong>Ontwerpkeuze:</strong> ${escapeHtml(entry.action)} <a href="#waarde-${entry.id}">Verdieping</a></li>`).join("")}</ul>` : "<p>Uit de ingevulde keuzes volgt nog geen extra aandachtspunt voor deze norm. Dat zegt niet of de norm geborgd is.</p>"}</details></article>`).join("")}</div>${scoringExplanation()}`;
}

function openKnowledgeFromHash() {
  const item = VALUE_TRADEOFFS.find((entry) => location.hash === `#waarde-${entry.id}`);
  if (!item) return;
  state.view = "knowledge";
  saveState();
  renderViews();
  const article = document.querySelector(`#waarde-${item.id}`);
  article.scrollIntoView({ block: "start" });
  article.focus({ preventScroll: true });
}

function renderVignettes() {
  dom.vignetteTabs.innerHTML = VIGNETTES.map((item) => {
    const active = item.id === state.selectedVignette ? " active" : "";
    return `<button class="chip${active}" type="button" data-vignette="${item.id}">${item.label}</button>`;
  }).join("");

  dom.vignetteTabs.querySelectorAll("[data-vignette]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedVignette = button.dataset.vignette;
      saveState();
      renderVignettes();
    });
  });

  const current = VIGNETTES.find((item) => item.id === state.selectedVignette);
  dom.vignetteMeta.textContent = current.label;
  dom.vignetteName.textContent = current.title;
  dom.vignetteScenario.textContent = current.scenario;
  dom.vignettePrompts.innerHTML = current.prompts.map((prompt) => `<li>${prompt}</li>`).join("");
  dom.vignetteStatuses.innerHTML = VIGNETTE_STATUS.map(([value, label]) => {
    const active = state.vignetteStatus[current.id] === value ? " active" : "";
    return `<button class="status-button${active}" type="button" data-status="${value}">${label}</button>`;
  }).join("");
  dom.vignetteNotes.value = state.vignetteNotes[current.id] || "";

  dom.vignetteStatuses.querySelectorAll("[data-status]").forEach((button) => {
    button.addEventListener("click", () => {
      state.vignetteStatus[current.id] = button.dataset.status;
      saveState();
      renderVignettes();
      renderReport();
    });
  });

  renderVignetteSummary();
}

function renderVignetteSummary() {
  const statuses = Object.values(state.vignetteStatus);
  const done = statuses.filter((status) => status === "done").length;
  const redesign = statuses.filter((status) => status === "redesign").length;
  const notes = Object.values(state.vignetteNotes).filter((note) => note.trim()).length;
  dom.vignetteScore.textContent = redesign > 0 ? `${redesign} herontwerp` : `${done}/${VIGNETTES.length} besproken`;
  dom.vignetteSummary.textContent = `${done} casussen besproken, ${redesign} met herontwerpsignaal en ${notes} met notities.`;
}

function renderSurvey() {
  dom.surveyGrid.innerHTML = SURVEY.map((item) => `
    <article class="row-question">
      <div>
        <h3>${item.title}</h3>
        <p>${item.help}</p>
      </div>
      <div class="segmented">
        ${SCORE_OPTIONS.map(([value, label]) => {
          const active = state.survey[item.id] === value ? " active" : "";
          return `<button class="segment${active}" type="button" data-survey="${item.id}" data-value="${value}">${label}</button>`;
        }).join("")}
      </div>
    </article>
  `).join("");

  dom.surveyGrid.querySelectorAll("[data-survey]").forEach((button) => {
    button.addEventListener("click", () => {
      state.survey[button.dataset.survey] = button.dataset.value;
      saveState();
      renderSurvey();
      renderReport();
    });
  });

  const summary = getSurveySummary();
  dom.surveyScore.textContent = summary.label;
  dom.surveySummary.textContent = summary.text;
}

function getValuesSummary() {
  const open = VALUE_TRADEOFFS.filter((item) => state.valueChoices[item.id] === undefined);
  const answered = VALUE_TRADEOFFS.length - open.length;
  const notes = VALUE_TRADEOFFS.filter((item) => state.valueNotes[item.id]?.trim()).length;
  return { answered, open, label: `${answered}/${VALUE_TRADEOFFS.length} keuzes vastgelegd`, text: `${answered} keuzes vastgelegd, ${open.length} nog open en ${notes} toelichtingen. ${open.length ? "Het aandachtsprofiel is voorlopig." : "Bekijk de gevolgen van je keuzes in het rapport."}` };
}

function getSurveySummary() {
  return getScoreSummary(SURVEY, state.survey, "burgerperspectief");
}

function getScoreSummary(items, answers, label) {
  const answered = items.filter((item) => answers[item.id]);
  const total = items.reduce((sum, item) => {
    const option = SCORE_OPTIONS.find(([value]) => value === answers[item.id]);
    return sum + (option ? option[2] : 0);
  }, 0);
  const max = items.length * 2;
  const grade = answered.length ? Math.round((total / max) * 10) : 0;
  const weak = items.filter((item) => ["missing", "partial"].includes(answers[item.id])).map((item) => item.title);

  if (!answered.length) {
    return {
      label: "Nog open",
      grade,
      weak,
      text: `Vul de ${label} in om een score en aandachtspunten te krijgen.`,
    };
  }

  if (answered.length < items.length) {
    return {
      label: `${answered.length}/${items.length}`,
      grade,
      weak,
      text: `De ${label} is deels ingevuld. Voorlopige score: ${grade}/10.`,
    };
  }

  return {
    label: `${grade}/10`,
    grade,
    weak,
    text: grade >= 7 ? `Sterke basis. Score: ${grade}/10.` : `Nog kwetsbaar. Score: ${grade}/10.`,
  };
}

function classifyRoute() {
  const answers = state.euAnswers;
  const risks = [];
  if (answers.prohibited === "yes") risks.push("Mogelijk verboden praktijk");
  if (answers.prohibited === "maybe") risks.push("Juridische onzekerheid over verboden praktijk");
  if (["yes", "maybe"].includes(answers.rights) || answers.purpose === "decision") risks.push("Impact op rechten of toegang");
  if (answers.data === "sensitive") risks.push("Kwetsbare of bijzondere data");
  if (answers.human === "weak") risks.push("Menselijk toezicht is zwak");
  if (["partial", "none"].includes(answers.procurement)) risks.push("AI-afspraken zijn nog niet volledig");

  const incomplete = EU_QUESTIONS.some((question) => !question.options.some(([value]) => value === answers[question.id]));
  const route = answers.prohibited === "yes" ? "Stop en herontwerp" : answers.prohibited === "maybe" ? "Eerst juridisch toetsen" : incomplete ? "Nog niet bepaald: EU-vragen staan open" : risks.length >= 3 ? "Verzwaarde waarborgen" : "Beheerst verder verkennen";
  return { route, risks };
}

function buildRecommendations() {
  const { route, risks } = classifyRoute();
  const values = getValuesSummary();
  const survey = getSurveySummary();
  const recommendations = [];

  if (route.startsWith("Nog niet bepaald")) recommendations.push("Vul de EU-vragen aan om de juridische en bestuurlijke aandachtspunten te verkennen.");
  if (route === "Eerst juridisch toetsen") recommendations.push("Bespreek de onzekerheid over een mogelijk verboden praktijk met een juridisch deskundige.");

  if (route === "Stop en herontwerp") {
    recommendations.push("Stop de huidige ontwerpkeuze en laat eerst juridisch toetsen of er sprake is van een verboden AI-praktijk.");
  }

  if (risks.includes("Impact op rechten of toegang")) {
    recommendations.push("Leg vast waar menselijke controle, bezwaar, herstel en uitleg beschikbaar zijn voor burgers.");
  }

  if (risks.includes("Kwetsbare of bijzondere data")) {
    recommendations.push("Werk grondslag, dataminimalisatie, DPIA en beveiligingsmaatregelen uit voordat je opschaalt.");
  }

  if (risks.includes("AI-afspraken zijn nog niet volledig")) {
    recommendations.push("Maak inkoopafspraken over auditrechten, logging, modelwijzigingen, incidenten en dataverwerking.");
  }

  if (values.open.length) {
    recommendations.push(`Bespreek de nog open waardenafwegingen: ${values.open.map((item) => item.title).join(", ")}.`);
  }
  const withoutNotes = VALUE_TRADEOFFS.filter((item) => state.valueChoices[item.id] !== undefined && !state.valueNotes[item.id]?.trim());
  if (withoutNotes.length) recommendations.push(`Licht in het gesprek de reden en gevolgen toe bij: ${withoutNotes.map((item) => item.title).join(", ")}.`);

  if (survey.weak.length) {
    recommendations.push(`Onderzoek deze burgerperspectieven extra: ${survey.weak.slice(0, 2).join(", ")}.`);
  }

  if (!recommendations.length) {
    recommendations.push("De basis oogt werkbaar. Blijf meten of de toepassing voor burgers echt begrijpelijker, menselijker en makkelijker wordt.");
  }

  return recommendations;
}

function renderReport() {
  const { route, risks } = classifyRoute();
  const values = getValuesSummary();
  const survey = getSurveySummary();
  const recommendations = buildRecommendations();

  dom.reportPreview.innerHTML = `
    <article class="report-block">
      <h3>Samenvatting</h3>
      <p><strong>Route:</strong> ${route}</p>
      <p><strong>Waardenafweging:</strong> ${values.label} · <strong>Burgerperspectief:</strong> ${survey.label}</p>
    </article>
    <article class="report-block">
      ${normProfileHtml()}
    </article>
    <article class="report-block">
      <h3>Keuzes om samen te bespreken</h3>
      <p>${values.text}</p>
      ${VALUE_TRADEOFFS.map((item) => `<details class="value-report"><summary>${escapeHtml(item.title)} — ${escapeHtml(valueLabel(item))}</summary><p>${escapeHtml(valueEffect(item))}</p><p><strong>Toelichting:</strong> ${escapeHtml(state.valueNotes[item.id]?.trim() || "Nog niet toegelicht")}</p><a href="#waarde-${item.id}">Bekijk de mogelijke uitwerkingen in de kennisbank →</a></details>`).join("")}
    </article>
    <article class="report-block">
      <h3>Belangrijkste risico's</h3>
      <ul>${(risks.length ? risks : ["Geen grote rode vlaggen ingevuld."]).map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="report-block">
      <h3>Aanbevolen acties</h3>
      <ol>${recommendations.map((item) => `<li>${item}</li>`).join("")}</ol>
    </article>
  `;
}

function answerLabel(question, value) {
  const option = question.options.find(([optionValue]) => optionValue === value);
  return option ? option[1] : "Niet ingevuld";
}

function tableRows(items, answers) {
  return items
    .map((item) => {
      const option = SCORE_OPTIONS.find(([value]) => value === answers[item.id]);
      return `| ${item.title} | ${option ? option[1] : "Niet ingevuld"} |`;
    })
    .join("\n");
}

function markdownText(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\\/g, "\\\\").replace(/([`*_{}\[\]()#+.!|~-])/g, "\\$1").replace(/\r?\n/g, "<br>");
}

function valuesMarkdown() {
  return VALUE_TRADEOFFS.map((item) => `### ${item.title}\n\n- Richting: ${valueLabel(item)}\n- Positie op de schaal: ${state.valueChoices[item.id] === undefined ? "Nog open" : state.valueChoices[item.id]}\n- Mogelijke gevolgen: ${valueEffect(item)}\n- Eigen toelichting: ${markdownText(state.valueNotes[item.id]?.trim() || "Nog niet toegelicht")}\n- Mogelijke uitwerkingen: ${item.actions.join(" ")}\n- Aandachtspunt: ${item.guardrail}\n${item.id === "beheer" ? `- Uitvoering: ${{build: "Zelf bouwen", adapt: "Bestaande oplossing aanpassen", buy: "Inkopen"}[state.deliveryMode] || "Nog open"} (los van de punten)\n` : ""}- [Verdieping in de kennisbank](${KNOWLEDGE_URL}#waarde-${item.id})`).join("\n\n");
}

function normProfileMarkdown() {
  return `### ${getValuesSummary().open.length ? "Voorlopig aandachtsprofiel" : "Aandachtsprofiel"}\n\nWaarde: menselijke maat. De vier normen vertalen we hieronder naar ontwerpkeuzes.\n\n` + getNormProfile().map((norm) => `#### ${norm.title}\n\n${norm.points} van ${norm.maximum} mogelijke aandachtspunten; ${norm.open} relevante afweging(en) nog open.\n\nOntwerpkeuze: ${norm.action}\n\n${norm.contributions.length ? norm.contributions.map((entry) => `- ${entry.tradeoff}: +${entry.points}. ${entry.reason} Ontwerpkeuze: ${entry.action}`).join("\n") : "Nog geen extra punten uit de ingevulde keuzes; dit zegt niet of de norm geborgd is."}`).join("\n\n") + `\n\n#### Verantwoording van de puntentelling\n\nLichte en sterke voorkeuren geven respectievelijk 1 en 2 aandachtspunten aan elke gekoppelde norm. Punten tellen op en strepen elkaar niet weg. Het maximum per norm is twee maal het aantal mogelijk relevante afwegingen. Vergelijk de ruwe aantallen niet als ranglijst: de maxima verschillen. Open vragen worden apart geteld en maken het profiel voorlopig. Alle normen blijven van belang, ook bij nul punten. Ontwerpkeuzes verlagen de punten niet; hun werking vraagt toetsing in de praktijk.\n\nDe koppelingen tussen afwegingen en normen en de weging zijn een niet gevalideerde uitwerking (${SCORING_VERSION}), geen rapportcijfer, risicokans of bewijs van naleving.\n\n`;
}

function buildMarkdown() {
  const { route, risks } = classifyRoute();
  const values = getValuesSummary();
  const survey = getSurveySummary();
  const recommendations = buildRecommendations();

  const euRows = EU_QUESTIONS.map((question) => `| ${question.title} | ${answerLabel(question, state.euAnswers[question.id])} |`).join("\n");
  const vignetteRows = VIGNETTES.map((item) => {
    const status = VIGNETTE_STATUS.find(([value]) => value === state.vignetteStatus[item.id]);
    const note = state.vignetteNotes[item.id]?.trim() || "Geen notitie";
    return `| ${item.title} | ${status ? status[1] : "Nog niet besproken"} | ${markdownText(note)} |`;
  }).join("\n");

  return `# Menselijke Maat AI Verkenner

## 1. Samenvatting

| Onderdeel | Uitkomst |
| --- | --- |
| Route | ${route} |
| Waardenafweging | ${values.label} |
| Burgerperspectief | ${survey.label} |

## 2. EU-regels en verantwoordelijkheden

| Vraag | Antwoord |
| --- | --- |
${euRows}

## 3. Belangrijkste risico's

${(risks.length ? risks : ["Geen grote rode vlaggen ingevuld."]).map((item) => `- ${item}`).join("\n")}

## 4. Waardenafweging

${values.text}

${normProfileMarkdown()}

${valuesMarkdown()}

## 5. Ongeziene burgers

| Casus | Status | Notitie |
| --- | --- | --- |
${vignetteRows}

## 6. Burgerperspectief

${survey.text}

| Vraag | Beoordeling |
| --- | --- |
${tableRows(SURVEY, state.survey)}

## 7. Aanbevolen acties

${recommendations.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Gegenereerd op ${new Date().toLocaleString("nl-NL")}.
`;
}

function downloadReport() {
  const blob = new Blob([buildMarkdown()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "menselijke-maat-ai-verkenner-rapport.md";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

init();
