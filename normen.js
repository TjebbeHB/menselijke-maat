// Redactionele vertaling van de vier normen uit het aangeleverde tussentijdsrapport.
// Punten geven aandacht voor het ontwerp aan, niet de kwaliteit van de menselijke maat.
const NORMS = [
  { id: "responsief", title: "Luisteren en bijsturen", sourceTitle: "Responsieve wetgeving", description: "Signalen van burgers werken door in beleid en ontwerp.", action: "Betrek burgers bij ontwerpkeuzes, leg die keuzes uit en spreek af wie signalen omzet in een aanpassing." },
  { id: "betwistbaar", title: "Kunnen begrijpen en betwisten", sourceTitle: "In beroep kunnen gaan", description: "Mensen kunnen een uitkomst begrijpen, controleren en laten herzien.", action: "Maak besluitstappen herleidbaar en bied een zichtbare route naar menselijke herbeoordeling, zonder misleidende of ontmoedigende drempels." },
  { id: "leefwereld", title: "Aansluiten op de leefwereld", sourceTitle: "Verbinding tussen leefwerelden", description: "Het proces houdt rekening met wat iemand ervaart, nodig heeft en daadwerkelijk kan doen.", action: "Laat medewerkers samen met burgers onderzoeken hoe hun situatie in het systeem terechtkomt; bied hulp en ruimte voor andere vormen van toelichting." },
  { id: "eenvoud", title: "Eenvoudig en toegankelijk houden", sourceTitle: "Simpliciteit", description: "Bewijslast, handelingen en vereiste kennis blijven beperkt, zodat mensen kunnen meedoen en de uitkomst kunnen controleren.", action: "Beperk vragen en bewijsstukken en toets met betrokken mensen of de route en uitleg begrijpelijk zijn, ook bij stress of neurodivergentie." }
];

// Elke koppeling bevat een reden en een concrete ontwerpactie. Beide kanten kunnen aandacht vragen.
const NORM_LINKS = {
  eenvoud: {
    left: [
      { norm: "responsief", reason: "Een korte vaste route kan signalen over uitzonderingen missen.", action: "Bied een zichtbare mogelijkheid om bijzondere omstandigheden te melden en wijs iemand aan die daarop reageert." },
      { norm: "leefwereld", reason: "De persoonlijke situatie kan niet in de standaardvragen passen.", action: "Test met mensen die niet in de standaardroute passen of zij hun situatie kunnen toelichten." }
    ],
    right: [
      { norm: "eenvoud", reason: "Meer uitzonderingen kunnen meer handelingen en onduidelijkheid opleveren.", action: "Toon alleen relevante vervolgvragen en bied hulp bij het kiezen van de juiste route." },
      { norm: "betwistbaar", reason: "De reden voor een uitzondering kan moeilijk te achterhalen zijn.", action: "Geef bij een afwijking een begrijpelijke reden en een route om die te laten herzien." }
    ]
  },
  gelijkheid: {
    left: [
      { norm: "leefwereld", reason: "Dezelfde aanpak kan bij verschillende omstandigheden ongelijk uitpakken.", action: "Toets wie met dezelfde eisen minder kans heeft om de procedure te doorlopen." },
      { norm: "responsief", reason: "Een vaste aanpak kan weinig ruimte laten om op signalen te reageren.", action: "Leg vast hoe een medewerker een knellende standaard kan aanpassen of voorleggen." }
    ],
    right: [
      { norm: "betwistbaar", reason: "Verschillen in behandeling vragen uitlegbare redenen.", action: "Leg de reden voor maatwerk vast en bespreek vergelijkbare gevallen om willekeur tegen te gaan." },
      { norm: "eenvoud", reason: "Maatwerk kan de procedure minder voorspelbaar maken.", action: "Vertel vooraf welke stappen en informatie nodig zijn en wie helpt als dat niet lukt." }
    ]
  },
  meten: {
    left: [
      { norm: "leefwereld", reason: "Wat niet in de indicator past, kan uit beeld verdwijnen.", action: "Leg cijfers naast ervaringen van mensen die vastlopen en onderzoek tegenstrijdige signalen." },
      { norm: "responsief", reason: "Sturen op indicatoren kan nieuwe signalen wegdrukken.", action: "Bespreek regelmatig of de indicatoren nog meten wat burgers belangrijk vinden." }
    ],
    right: [
      { norm: "betwistbaar", reason: "Oordelen zonder vaste registratie kunnen lastig te controleren zijn.", action: "Leg redenen vast en vergelijk periodiek casussen en terugkerende klachten." }
    ]
  },
  kosten: {
    left: [
      { norm: "leefwereld", reason: "Een besparing kan tijd, stress en herstelwerk naar burgers verschuiven.", action: "Maak naast organisatiekosten ook herhaalcontact, ervaren last en gemiste toegang zichtbaar." },
      { norm: "responsief", reason: "Een strak kostenkader kan reacties op individuele problemen beperken.", action: "Reserveer tijd voor signalen en herstel en leg vast wanneer extra inzet mogelijk is." }
    ],
    right: [
      { norm: "responsief", reason: "Extra inzet voor één doel kan middelen voor andere behoeften beperken.", action: "Bespreek met betrokken groepen welke behoeften voorrang krijgen en toets of de extra inzet helpt." },
      { norm: "betwistbaar", reason: "Moeilijk meetbare baten maken de verdeling van middelen lastiger te beoordelen.", action: "Maak aannames en verdelingskeuzes openbaar uitlegbaar zonder onzekere baten als feiten te presenteren." }
    ]
  },
  standaard: {
    left: [
      { norm: "leefwereld", reason: "Een gedeelde standaard kan specifieke omstandigheden missen.", action: "Test de standaard in verschillende situaties en regel een bereikbare uitzonderingsroute." },
      { norm: "responsief", reason: "Een gedeeld systeem kan moeilijk lokaal aanpasbaar zijn.", action: "Spreek af wie signalen verzamelt en wie wijzigingen in de gedeelde basis mag doorvoeren." }
    ],
    right: [
      { norm: "eenvoud", reason: "Veel varianten kunnen de route ingewikkeld maken.", action: "Houd een herkenbare basisroute en beperk verschillen tot wat aantoonbaar nodig is." },
      { norm: "betwistbaar", reason: "Uiteenlopende werkwijzen kunnen verschillen moeilijk verklaarbaar maken.", action: "Documenteer welke onderdelen verschillen en waarom, zodat mensen een uitkomst kunnen controleren." }
    ]
  },
  grenzen: {
    left: [
      { norm: "leefwereld", reason: "Een vaste grens kan mensen met complexe behoeften tekortdoen.", action: "Onderzoek wie buiten de ondersteuning valt en bied een aanspreekpunt voor vastgelopen situaties." },
      { norm: "responsief", reason: "De grens kan verhinderen dat nieuwe signalen tot extra hulp leiden.", action: "Maak duidelijk wie een uitzondering kan toestaan en hoe iemand daarom kan vragen." }
    ],
    right: [
      { norm: "responsief", reason: "Extra hulp voor enkelen kan bereik en wachttijd voor anderen beïnvloeden.", action: "Volg ook de gevolgen voor andere groepen en bespreek de verdeling van schaarse capaciteit." },
      { norm: "betwistbaar", reason: "Verschillen in inzet kunnen moeilijk te rechtvaardigen zijn.", action: "Leg de reden voor extra inzet vast en bied een route om verdelingskeuzes te bespreken." }
    ]
  },
  beheer: {
    left: [
      { norm: "eenvoud", reason: "Eigen oplossingen kunnen versnipperen en meer handelingen veroorzaken.", action: "Werk met gedeelde standaarden en test de hele route over verschillende systemen heen." },
      { norm: "betwistbaar", reason: "Eigen beheer garandeert nog geen onafhankelijke controle.", action: "Organiseer controle buiten het ontwikkelteam en leg besluiten en wijzigingen herleidbaar vast." }
    ],
    right: [
      { norm: "responsief", reason: "Wijzigingen kunnen afhankelijk worden van de leverancier.", action: "Leg vast hoe signalen van burgers tot aanpassingen leiden en welke aanpassingsrechten de organisatie houdt." },
      { norm: "betwistbaar", reason: "Beperkt inzicht in een leverancierssysteem kan betwisten bemoeilijken.", action: "Borg toegang tot uitleg, onafhankelijke controle en menselijke herbeoordeling in proces en overeenkomst." }
    ]
  },
  macht: {
    left: [
      { norm: "responsief", reason: "Centrale beslissers kunnen signalen van burgers en uitvoerders minder gewicht geven.", action: "Geef burgers en uitvoerders invloed op ontwerpbesluiten en maak zichtbaar wat met hun signalen gebeurt." },
      { norm: "betwistbaar", reason: "Een centraal AI-advies kan in de praktijk onbetwistbaar worden.", action: "Geef medewerkers tijd en bevoegdheid om af te wijken en burgers een bereikbare route voor herbeoordeling." }
    ],
    right: [
      { norm: "leefwereld", reason: "Niet iedereen heeft evenveel tijd, kennis of mondigheid om invloed uit te oefenen.", action: "Bied actieve ondersteuning en betrek ook mensen die niet vanzelf meepraten." },
      { norm: "betwistbaar", reason: "Verspreide zeggenschap kan onduidelijk maken wie beslist.", action: "Maak per besluit zichtbaar wie verantwoordelijk is en waar iemand terechtkan met een betwisting." }
    ]
  }
};

const VALUE_POSITIONS = [-2, -1, 1, 2];
const SCORING_VERSION = "aandachtsprofiel-2";
