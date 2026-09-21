// Automatisch opgebouwd uit kennisbank/*.md. Pas de Markdown-bronnen aan.
const VALUE_TRADEOFFS = [
  {
    "id": "eenvoud",
    "title": "Eenvoud en uitzonderingsregels",
    "left": "Eenvoudige route",
    "right": "Ruimte voor uitzonderingen",
    "question": "Hoe houd je de route begrijpelijk én bereikbaar voor mensen die niet in de standaard passen?",
    "context": "Een korte route geeft overzicht. Extra uitzonderingen kunnen nodig zijn om passende hulp te bieden, maar vragen meer uitleg. Eenvoud voor de organisatie is niet vanzelf eenvoud voor de burger.",
    "example": "Een aanvraag heeft weinig vragen. Iemand met wisselende inkomsten kan daardoor de eigen situatie niet kwijt en ziet af van een aanvraag.",
    "effects": [
      "Je legt de nadruk op overzicht en weinig handelingen. Bijzondere omstandigheden kunnen buiten beeld blijven; mensen kunnen afhaken of passende hulp mislopen.",
      "Je combineert een korte basisroute met zichtbare hulp voor uitzonderingen. Dat houdt de eerste stap eenvoudig, maar vraagt capaciteit voor doorverwijzing en persoonlijke beoordeling.",
      "Je biedt meer ruimte voor bijzondere omstandigheden. Dat kan passende hulp verbeteren, maar ook meer vragen, bewijsstukken en onzekerheid opleveren."
    ],
    "actions": [
      "Bied bij elke stap een herkenbare mogelijkheid om de eigen situatie toe te lichten.",
      "Laat mensen de basisroute testen en controleer ook of zij de uitzonderingsroute vinden."
    ],
    "guardrail": "Laat vereenvoudiging niet betekenen dat iemand de eigen situatie nergens kan laten beoordelen."
  },
  {
    "id": "gelijkheid",
    "title": "Gelijkheid en individuele omstandigheden",
    "left": "Dezelfde aanpak",
    "right": "Individueel maatwerk",
    "question": "Wanneer is dezelfde behandeling eerlijk, en wanneer is juist een andere aanpak nodig?",
    "context": "Gelijke behandeling is niet hetzelfde als iedereen identiek behandelen. Relevante verschillen kunnen een andere aanpak rechtvaardigen. Bespreek welke verschillen ertoe doen en hoe je willekeur voorkomt.",
    "example": "Iedereen krijgt dezelfde reactietermijn, maar iemand met beperkte mogelijkheden om informatie te verwerken heeft meer tijd nodig.",
    "effects": [
      "Je kiest voor voorspelbaarheid en vergelijkbaarheid. Mensen met andere omstandigheden kunnen daardoor in de praktijk minder kans krijgen om mee te doen.",
      "Je gebruikt gedeelde uitgangspunten en motiveert afwijkingen. Dit ondersteunt uitlegbaar maatwerk, maar vraagt tijd voor overleg en vergelijking van besluiten.",
      "Je geeft persoonlijke omstandigheden veel gewicht. Dat kan beter aansluiten, maar maakt verschillen tussen medewerkers en besluiten moeilijker te controleren."
    ],
    "actions": [
      "Beschrijf welke omstandigheden een afwijking kunnen rechtvaardigen en leg de reden vast.",
      "Bespreek vergelijkbare gevallen met collega's en betrokken burgers."
    ],
    "guardrail": "Een afwijking vraagt een uitlegbare reden; een standaardregel vraagt aandacht voor ongelijke gevolgen."
  },
  {
    "id": "meten",
    "title": "Meten en ruimte voor oordeel",
    "left": "Meetbare indicatoren",
    "right": "Ervaringen en oordeel",
    "question": "Wat wil je meten, en wat mag niet uit beeld raken doordat het lastig meetbaar is?",
    "context": "Cijfers kunnen knelpunten zichtbaar maken. Ze kunnen ook een doel op zichzelf worden. Ervaringen en professioneel oordeel vullen cijfers aan, maar moeten eveneens bespreekbaar en controleerbaar zijn.",
    "example": "De gemiddelde afhandeltijd daalt, terwijl mensen vaker opnieuw moeten bellen omdat hun vraag niet is opgelost.",
    "effects": [
      "Je maakt prestaties vergelijkbaar en kunt patronen volgen. Het risico is dat medewerkers op de cijfers sturen en moeilijk meetbare schade buiten beeld blijft.",
      "Je legt cijfers naast ervaringen en onderzoekt verschillen. Dat geeft een rijker beeld, maar vraagt tijd om gegevens en verhalen samen te duiden.",
      "Je geeft ervaringen en professioneel oordeel meer ruimte. Daarmee zie je nuances, maar structurele problemen of willekeur kunnen zonder vaste controles onopgemerkt blijven."
    ],
    "actions": [
      "Combineer bijvoorbeeld doorlooptijd met herhaalcontact en ervaringen van mensen die vastlopen.",
      "Bespreek een casus waarin het cijfer en de ervaring iets anders vertellen."
    ],
    "guardrail": "Gebruik geen totaalcijfer als bewijs dat de menselijke maat op orde is."
  },
  {
    "id": "kosten",
    "title": "Geld en maatschappelijke gevolgen",
    "left": "Directe kosten beperken",
    "right": "Sociale schade voorkomen",
    "question": "Welke kosten bespaar je, wie draagt de lasten en welke gevolgen zie je pas later?",
    "context": "Geld, beschikbare tijd, stress, vertrouwen en waardigheid vragen een gezamenlijke afweging. Niet alles is betrouwbaar in euro's uit te drukken. Ook een goedbedoelde investering moet op haar werking worden onderzocht.",
    "example": "Automatische controle bespaart behandeltijd, maar onterechte signalen veroorzaken stress, bezwaar en herstelwerk.",
    "effects": [
      "Je houdt de directe uitgaven beheersbaar. Lasten kunnen verschuiven naar burgers, andere organisaties of later herstel, waardoor de totale kosten juist stijgen.",
      "Je weegt uitgaven, herstelwerk en ervaringen samen. Dit vraagt onderzoek; onzekerheden blijven zichtbaar in plaats van schijnbaar exacte bedragen te krijgen.",
      "Je investeert meer in het voorkomen van sociale schade. Daar staat minder budget voor andere doelen tegenover; toets of de investering mensen daadwerkelijk helpt."
    ],
    "actions": [
      "Maak apart zichtbaar: kosten voor de organisatie, lasten voor burgers en mogelijke herstelkosten.",
      "Noteer wat je weet, wat je vermoedt en wanneer je de effecten gaat toetsen."
    ],
    "guardrail": "Presenteer onzekere maatschappelijke effecten niet als bewezen besparingen."
  },
  {
    "id": "standaard",
    "title": "Standaardisatie en context",
    "left": "Gedeelde standaard",
    "right": "Aanpassen aan de situatie",
    "question": "Wat kun je gezamenlijk regelen, en waar moet de aanpak kunnen verschillen?",
    "context": "Een gedeelde oplossing kan goedkoper en breder beschikbaar zijn, ook voor kleine organisaties. Of zij effectief is, hangt af van de situatie. Aanpassen vraagt extra beheer en kennis.",
    "example": "Meerdere organisaties gebruiken hetzelfde aanvraagformulier, maar de bereikbaarheid van hulp en de behoeften van gebruikers verschillen.",
    "effects": [
      "Je benut schaalvoordeel, hergebruik en een herkenbaar proces. Een vaste inrichting kan lokale omstandigheden missen en mensen buitensluiten.",
      "Je deelt een basis en spreekt af welke onderdelen aanpasbaar zijn. Dat combineert hergebruik met maatwerk, maar vraagt duidelijke grenzen en gezamenlijk beheer.",
      "Je past de oplossing sterk aan de situatie aan. Dit kan beter werken voor specifieke groepen, maar maakt onderhoud duurder en samenwerking lastiger."
    ],
    "actions": [
      "Scheid vaste basisafspraken van onderdelen die medewerkers of organisaties mogen aanpassen.",
      "Toets de standaard met mensen die moeilijk toegang krijgen, voordat je de aanpak breder invoert."
    ],
    "guardrail": "Een gedeelde oplossing moet ruimte houden om uitsluiting te signaleren en te herstellen."
  },
  {
    "id": "grenzen",
    "title": "Begrensde inzet en extra ondersteuning",
    "left": "Vaste inzet per situatie",
    "right": "Meer inzet bij grote behoefte",
    "question": "Hoe verdeel je schaarse tijd en middelen, en wat gebeurt er met iemand die meer nodig heeft?",
    "context": "Extra hulp voor één persoon kan ten koste gaan van hulp aan anderen. Een vaste grens kan mensen met complexe problemen juist structureel tekortdoen. Maak de reden, gevolgen en verantwoordelijkheid voor die grens zichtbaar.",
    "example": "Een medewerker kan tien korte aanvragen behandelen of veel tijd besteden aan één vastgelopen situatie.",
    "effects": [
      "Je bewaakt capaciteit en bereik voor een grotere groep. Mensen met complexe problemen kunnen buiten de ondersteuning vallen of telkens opnieuw moeten beginnen.",
      "Je hanteert een basisinzet met gemotiveerde extra ondersteuning. Dat vraagt een bereikbaar aanspreekpunt en afspraken over wie over extra inzet beslist.",
      "Je laat de inzet sterker meebewegen met de behoefte. Dat kan ernstige schade voorkomen, maar wachttijden en tekorten voor andere mensen vergroten."
    ],
    "actions": [
      "Leg vast wie over extra inzet beslist en hoe iemand zo'n beoordeling kan krijgen.",
      "Volg zowel de gevolgen voor randgevallen als de wachttijden voor de rest van de groep."
    ],
    "guardrail": "Maak een grens bespreekbaar en wijs iemand aan die vastgelopen situaties verder helpt."
  },
  {
    "id": "beheer",
    "title": "Publiek, privaat of samen",
    "left": "Publieke regie",
    "right": "Private regie",
    "question": "Waar leg je ontwikkeling en beheer, en hoe behoud je zeggenschap over de publieke opgave?",
    "context": "Zelf bouwen vraagt kennis en blijvende capaciteit. Inkopen kan toegang tot expertise geven, maar ook afhankelijkheid. Een bestaande oplossing aanpassen aan eigen eisen is een zelfstandige mogelijkheid; een samenwerking is niet vanzelf de beste keuze.",
    "example": "Een ingekochte assistent werkt snel, maar de organisatie kan de uitleg, gegevensverwerking of menselijke overdracht niet zelf aanpassen.",
    "effects": [
      "Je houdt als publieke organisatie meer directe invloed op ontwerp en beheer, ook wanneer je onderdelen inkoopt. Je moet voldoende kennis en continuïteit organiseren; versnipperde oplossingen kunnen kosten verhogen.",
      "Je past een bestaande oplossing aan publieke eisen aan. Dit kan hergebruik en zeggenschap combineren, maar alleen als aanpassingen technisch en contractueel mogelijk blijven.",
      "Je legt meer regie bij een private partij en benut diens capaciteit en kennis. Je kunt afhankelijk worden van diens keuzes, prijs en mogelijkheden; controle, invloed van burgers en overstappen vragen concrete afspraken."
    ],
    "actions": [
      "Leg vast wie over wijzigingen, gegevensgebruik, uitleg en menselijke overdracht beslist.",
      "Onderzoek of je kunt aanpassen, onafhankelijk controleren en overstappen; reserveer ook intern beheercapaciteit."
    ],
    "guardrail": "Publieke verantwoordelijkheid verdwijnt niet wanneer een leverancier de uitvoering verzorgt."
  },
  {
    "id": "macht",
    "title": "Sturing en zeggenschap",
    "left": "Centrale sturing",
    "right": "Ruimte voor burger en medewerker",
    "question": "Wie krijgt meer invloed door de AI-toepassing, en wie kan een uitkomst ter discussie stellen?",
    "context": "Technologie verandert wie informatie ziet, keuzes maakt en kan ingrijpen. Centrale sturing kan beleid consistent maken. Meer ruimte voor burgers en medewerkers kan tegenwicht bieden, maar vraagt ondersteuning en duidelijke verantwoordelijkheden.",
    "example": "Een AI-advies wordt de standaard in een dossier. De medewerker kan formeel afwijken, maar krijgt daar geen tijd voor; de burger ziet niet hoe het advies tot stand kwam.",
    "effects": [
      "Je bevordert een consistente uitvoering. De invloed van systeembeheerders en beleidsmakers groeit; ervaringen van burgers en medewerkers kunnen minder gewicht krijgen.",
      "Je combineert gedeelde kaders met zichtbare inspraak en mogelijkheden om af te wijken. Dit vraagt tijd voor overleg en duidelijkheid over wie uiteindelijk beslist.",
      "Je geeft burgers en medewerkers meer invloed op de aanpak. Dit kan de aansluiting verbeteren, maar verschillen in kennis, tijd of mondigheid kunnen ongelijkheid versterken."
    ],
    "actions": [
      "Breng in kaart wie informatie krijgt, beslist, kan afwijken en een uitkomst kan laten herzien.",
      "Zorg dat ook minder mondige mensen ondersteuning krijgen om hun perspectief in te brengen."
    ],
    "guardrail": "Een mogelijkheid om invloed uit te oefenen moet ook praktisch bereikbaar en begrijpelijk zijn."
  }
];
