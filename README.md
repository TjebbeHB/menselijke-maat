# Menselijke Maat Verkenner

[Open de website](https://tjebbehb.github.io/menselijke-maat/)

Een beslisboom en kennisbank voor het bespreken en evalueren van AI in publieke dienstverlening: bij ontwikkeling, inkoop, aanbesteding en gebruik. Gebaseerd op de openbare [GAK-proefversie van Digicampus](https://github.com/digicampus-prototypes/GAK), met een uitgewerkte waardenafweging en verbinding met de waardenhiërarchie uit het aangeleverde tussentijdsrapport (hoofdstukken 3 en 4).

## Wat is nieuw?

- Stap 2 bevat acht afwegingen met vier schuifstanden: sterk links, licht links, licht rechts en sterk rechts, zonder middenstand.
- Achter de schermen geven lichte en sterke voorkeuren 1 en 2 aandachtspunten aan de gekoppelde normen. De punten verschijnen alleen in het rapport.
- Het rapport verbindt de vier normen aan concrete ontwerpmaatregelen en toont waar de punten vandaan komen.
- Dit profiel is een redactioneel hulpmiddel, geen gevalideerde meting of totaalcijfer voor de menselijke maat. Open vragen blijven zichtbaar; tegengestelde voorkeuren heffen elkaars aandachtspunten niet op.
- Bij publiek/privaat beheer staat de uitvoering (zelf bouwen, aanpassen, inkopen) apart van de regievraag.
- Keuzes en toelichtingen blijven lokaal in de browser. De Markdown-uitvoer neemt het profiel, de verantwoording, keuzes en kennisbanklinks mee.

## Teksten bewerken zonder code

Ga naar [kennisbank](kennisbank/LEES-MIJ.md), open een genummerd Markdown-bestand en gebruik het potloodje van GitHub. Na het opslaan op `main` bouwt GitHub Actions de tekst om en publiceert de website. Laat de technische velden en kopnamen staan zoals uitgelegd in de leeswijzer.

De puntentoekenning en koppelingen naar normen staan afzonderlijk in `normen.js`. Pas die alleen aan als je bewust het inhoudelijke afwegingsmodel wijzigt. De versie van dat model staat ook in ieder verslag.

## Lokaal werken

Open `index.html` rechtstreeks in een browser. Na het wijzigen van Markdown:

```sh
npm ci
npm run build
```

Voor de browsertests:

```sh
npx playwright install chromium
npm test
```

De tests controleren alle 32 combinaties van afweging en schuifstand, toetsenbordbediening, opslag, kennisbanknavigatie, verslag, migratie en de mobiele weergave. Op macOS gebruiken ze een aanwezige Chrome-installatie; elders de geïnstalleerde Playwright-browser.

## Publicatie

De workflow `.github/workflows/pages.yml` bouwt de kennisbank, voert tests uit en publiceert via GitHub Pages. Alleen websitebestanden, illustraties en openbare kennisbankteksten gaan naar de website. Het aangeleverde onderzoeksrapport en screenshots zijn context en worden niet als bronbestanden meegestuurd.
