export type FilterTag =
  | "Trending"
  | "Breaking"
  | "New"
  | "Politics"
  | "Sports"
  | "Crypto"
  | "Iran"
  | "Finance"
  | "Geopolitics"
  | "Tech"
  | "Culture"
  | "Economy"
  | "Weather"
  | "Elections";

type AssessmentColor = "blue" | "amber" | "green";

export type AssessmentMetric = {
  label: string;
  value: string;
  note: string;
  color: AssessmentColor;
  width: string;
};

export type AssessmentData = {
  score: string;
  summary: string;
  metrics: AssessmentMetric[];
};

export type MarketCardData = {
  slug: string;
  title: string;
  icon: string;
  iconBackground: string;
  imageUrl: string;
  yesVotes: number;
  noVotes: number;
  category: Exclude<FilterTag, "Trending" | "Breaking" | "New">;
  outcomes: string[];
  rules: string[];
  marketContext: string[];
  assessment: AssessmentData;
};

export type CommentData = {
  author: string;
  time: string;
  badges?: string[];
  avatar: "gray" | "blue";
  body: string;
  link?: boolean;
  readMore?: boolean;
  actions: string[];
  repliesLabel?: string;
  replies?: {
    author: string;
    time: string;
    body: string;
  }[];
};

export const filters: FilterTag[] = [
  "Trending",
  "Breaking",
  "New",
  "Politics",
  "Sports",
  "Crypto",
  "Iran",
  "Finance",
  "Geopolitics",
  "Tech",
  "Culture",
  "Economy",
  "Weather",
  "Elections",
];

function createAssessment(
  score: string,
  summary: string,
  metrics: [
    reliability: [string, string, string],
    clarity: [string, string, string],
    risk: [string, string, string],
    momentum: [string, string, string],
  ],
): AssessmentData {
  return {
    score,
    summary,
    metrics: [
      {
        label: "SOURCE RELIABILITY",
        value: metrics[0][0],
        note: metrics[0][1],
        color: "blue",
        width: metrics[0][2],
      },
      {
        label: "RULE CLARITY",
        value: metrics[1][0],
        note: metrics[1][1],
        color: "blue",
        width: metrics[1][2],
      },
      {
        label: "RISK LEVEL",
        value: metrics[2][0],
        note: metrics[2][1],
        color: "amber",
        width: metrics[2][2],
      },
      {
        label: "MARKET MOMENTUM",
        value: metrics[3][0],
        note: metrics[3][1],
        color: "green",
        width: metrics[3][2],
      },
    ],
  };
}

const bankRulesImage = "/market-images/us-bank-rules.jpg";
const bankEffectiveImage = "/market-images/us-bank-effective-date.jpg";
const nintendoSalesImage = "/market-images/nintendo-sales-report.jpg";
const nintendoGuidanceImage = "/market-images/nintendo-guidance.jpg";
const googleSearchImage = "/market-images/google-search-health.jpg";
const instagramEncryptionImage = "/market-images/instagram-encryption.jpg";
const regulatorProbeImage = "/market-images/regulator-probe.jpg";
const wbcYearImage = "/market-images/wbc-year.jpg";
const wbcMidseasonImage = "/market-images/wbc-midseason.jpg";
const usHeatImage = "/market-images/us-heat-record.jpg";
const phoenixHeatImage = "/market-images/phoenix-heat.jpg";
const ukHormuzImage = "/market-images/uk-hormuz.jpg";
const japanHormuzImage = "/market-images/japan-hormuz.jpg";
const franceHormuzImage = "/market-images/france-hormuz.jpg";
const natoHormuzImage = "/market-images/nato-hormuz.jpg";
const taylorAwardsImage = "/market-images/taylor-awards-total.jpg";
const taylorArtistImage = "/market-images/taylor-artist-year.jpg";
const harryMsgImage = "/market-images/harry-msg.jpg";
const conanOscarsImage = "/market-images/conan-oscars.jpg";
const tinaImmersiveImage = "/market-images/tina-immersive.jpg";

export const marketCards: MarketCardData[] = [
  {
    slug: "us-big-bank-capital-rules-2026",
    title: "Will U.S. regulators finalize looser big-bank capital rules in 2026?",
    icon: "landmark",
    iconBackground: "lavender",
    imageUrl: bankRulesImage,
    yesVotes: 1312,
    noVotes: 829,
    category: "Finance",
    outcomes: ["Yes", "No"],
    rules: [
      "On March 19, 2026, the OCC highlighted new proposed rulemakings to modernize the regulatory capital framework, and reporting said the package would reduce capital requirements for the biggest U.S. banks after a public comment period.",
      "This market resolves to Yes if the Federal Reserve, FDIC, and OCC adopt a final rule by December 31, 2026, 11:59 PM ET that is substantially similar to the March 19, 2026 proposal and lowers regulatory capital requirements for the largest U.S. banking organizations versus the framework in force immediately before that proposal. Otherwise, this market resolves to No.",
      "The primary resolution source will be official publications from the Federal Reserve, FDIC, and OCC; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "Large-bank capital policy has become a live Washington issue again after regulators signaled they want a less restrictive framework for the biggest institutions.",
      "Traders in this market are effectively pricing the odds that the Fed, FDIC, and OCC stay aligned long enough to move from proposal language to a final adopted rule.",
      "The key swing factor is whether political momentum for easing capital pressure survives the public comment period without being diluted in interagency negotiations.",
    ],
    assessment: createAssessment("7.8 / 10", "High-quality official sourcing, but the interagency timeline still introduces execution risk.", [
      ["8.8", "Official agencies", "88%"],
      ["8.1", "Detailed trigger", "81%"],
      ["4.1", "Political drag", "41%"],
      ["7.2", "Policy focus", "72%"],
    ]),
  },
  {
    slug: "us-big-bank-capital-relief-effective-before-2027",
    title: "Will the new U.S. big-bank capital relief take effect before January 1, 2027?",
    icon: "building-2",
    iconBackground: "orange",
    imageUrl: bankEffectiveImage,
    yesVotes: 998,
    noVotes: 754,
    category: "Finance",
    outcomes: ["Yes", "No"],
    rules: [
      "This market is based on the same March 19, 2026 U.S. bank-capital proposal.",
      "It resolves to Yes if a final rule implementing capital relief for the largest U.S. banks is officially published with an effective date before January 1, 2027. If no such final rule is adopted, or if the effective date is January 1, 2027 or later, this market resolves to No.",
      "The primary resolution source will be the Federal Register and official Federal Reserve, FDIC, and OCC publications; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "This contract is narrower than the headline capital-relief market because it asks whether regulators can both finalize the rule and make it effective before the year turns.",
      "That creates a timing trade around publication logistics, transition periods, and whether agencies want banks implementing relief immediately.",
      "Even if policymakers agree on substance, an effective-date delay could still send this market to No.",
    ],
    assessment: createAssessment("7.2 / 10", "Clear resolution path, though effective-date wording creates an extra timing hurdle.", [
      ["8.6", "Federal Register", "86%"],
      ["7.9", "Binary event", "79%"],
      ["4.8", "Timing risk", "48%"],
      ["6.8", "Closely watched", "68%"],
    ]),
  },
  {
    slug: "nintendo-switch-2-units-fy-march-2026",
    title: "How many Nintendo Switch 2 units will Nintendo officially report for FY ending March 2026?",
    icon: "gamepad-2",
    iconBackground: "rose",
    imageUrl: nintendoSalesImage,
    yesVotes: 1411,
    noVotes: 1090,
    category: "Tech",
    outcomes: ["Under 19.0 million", "19.0 million to 19.99 million", "20.0 million or more"],
    rules: [
      "Nintendo says its earnings release for the fiscal year ending March 2026 is scheduled for May 8, 2026.",
      "Recent reporting says Nintendo had raised its Switch 2 forecast to 19 million for FY ending March 2026, after reaching 17.37 million units by December 31, 2025.",
      "This market resolves according to the official Nintendo unit figure for Switch 2 in the company's FY ending March 2026 earnings materials first released on or after May 8, 2026.",
      "The primary resolution source will be Nintendo investor-relations materials; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "Nintendo bulls are balancing holiday sell-through against the risk that late-quarter momentum failed to push the console above a psychologically important 20 million threshold.",
      "Because the figure comes from official earnings materials, this market is less about leaks and more about where Nintendo lands in its own reported accounting cut.",
      "Multi-range outcomes make this one sensitive to even small revisions in the final shipment number.",
    ],
    assessment: createAssessment("8.4 / 10", "Strong corporate reporting source and a tightly defined release date make this a clean multi-outcome market.", [
      ["9.2", "Investor relations", "92%"],
      ["8.7", "Numeric bracket", "87%"],
      ["3.2", "Limited ambiguity", "32%"],
      ["8.0", "High retail interest", "80%"],
    ]),
  },
  {
    slug: "nintendo-switch-2-guidance-fy-march-2027",
    title: "What will Nintendo's first official Switch 2 sales guidance for FY ending March 2027 be?",
    icon: "monitor-play",
    iconBackground: "green",
    imageUrl: nintendoGuidanceImage,
    yesVotes: 1277,
    noVotes: 992,
    category: "Tech",
    outcomes: [
      "Under 20.0 million",
      "20.0 million to 21.99 million",
      "22.0 million or more",
      "No guidance on May 8, 2026",
    ],
    rules: [
      "Nintendo's FY ending March 2026 results are scheduled for May 8, 2026, and the company recently projected 19 million Switch 2 units for the prior fiscal year.",
      "This market resolves according to the first official Nintendo guidance for Switch 2 unit sales for FY ending March 2027, as stated in Nintendo's earnings materials or same-day briefing on May 8, 2026.",
      "If Nintendo provides no explicit FY ending March 2027 Switch 2 unit-sales guidance that day, this market resolves to No guidance on May 8, 2026.",
      "The primary resolution source will be Nintendo investor-relations materials.",
    ],
    marketContext: [
      "Guidance markets trade more on management tone than reported history, so this one centers on how confident Nintendo wants to sound at the start of a new fiscal year.",
      "The spread between 20 million and 22 million matters because it reflects whether Nintendo sees Switch 2 as a mass-scale follow-up or a more measured cycle.",
      "The surprise branch is the final outcome: management could decide to withhold unit guidance entirely if visibility is weak.",
    ],
    assessment: createAssessment("8.0 / 10", "Good source quality with slightly more interpretation risk because guidance depends on management framing.", [
      ["9.0", "Official briefing", "90%"],
      ["8.3", "Explicit buckets", "83%"],
      ["3.9", "Guidance nuance", "39%"],
      ["7.7", "Earnings catalyst", "77%"],
    ]),
  },
  {
    slug: "google-restore-what-people-suggest",
    title: "Will Google restore \"What People Suggest\" in Search by September 30, 2026?",
    icon: "search",
    iconBackground: "blue",
    imageUrl: googleSearchImage,
    yesVotes: 1105,
    noVotes: 1381,
    category: "Tech",
    outcomes: ["Yes", "No"],
    rules: [
      "Google recently removed its \"What People Suggest\" feature, which surfaced AI-organized health tips drawn from online communities, even as Google promoted broader health-AI updates at The Check Up 2026.",
      "This market resolves to Yes if, by September 30, 2026, 11:59 PM ET, Google publicly restores a Search feature explicitly branded \"What People Suggest\" or launches a clearly designated successor that again presents crowdsourced patient-experience summaries directly in Google Search results. Otherwise, this market resolves to No.",
      "The primary resolution source will be official Google product, blog, or support pages; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "This market is really about whether Google sees enough value in community-style health guidance to reintroduce the idea after already backing away from it once.",
      "Branding matters here: traders need either the exact feature name or an unmistakably direct successor inside Search itself.",
      "The setup creates room for partial product changes that may look similar but still fail the market's explicit restoration standard.",
    ],
    assessment: createAssessment("6.9 / 10", "Product definitions are thoughtful, though successor branding still leaves room for debate at the edges.", [
      ["8.4", "Official product pages", "84%"],
      ["6.8", "Successor test", "68%"],
      ["5.0", "Branding edge cases", "50%"],
      ["6.5", "Moderate chatter", "65%"],
    ]),
  },
  {
    slug: "instagram-end-optional-encrypted-dms",
    title: "Will Instagram end optional end-to-end encrypted DMs by May 8, 2026?",
    icon: "lock",
    iconBackground: "lavender",
    imageUrl: instagramEncryptionImage,
    yesVotes: 1509,
    noVotes: 503,
    category: "Tech",
    outcomes: ["Yes", "No"],
    rules: [
      "Meta updated a privacy post on March 9, 2026 to say very few people were opting into end-to-end encrypted Instagram DMs and that the option would be removed in coming months; major tech outlets reported the cutoff date as May 8, 2026.",
      "This market resolves to Yes if, by May 8, 2026, 11:59 PM ET, ordinary Instagram users can no longer create or maintain optional end-to-end encrypted DM threads on Instagram. Otherwise, this market resolves to No.",
      "The primary resolution source will be official Meta/Instagram documentation; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "The question tracks a product rollback rather than a launch, which often makes timing cleaner because the company usually stages the change on a set platform deadline.",
      "What matters is the ordinary user experience on Instagram DMs, not broader Meta messaging products or optional legacy edge cases.",
      "If Meta delays the removal, even briefly, traders long Yes could still lose despite the policy direction being obvious.",
    ],
    assessment: createAssessment("7.7 / 10", "Company documentation is strong, and the user-facing trigger is relatively concrete.", [
      ["8.7", "Meta documentation", "87%"],
      ["8.0", "User testable", "80%"],
      ["4.0", "Rollout slippage", "40%"],
      ["7.1", "High attention", "71%"],
    ]),
  },
  {
    slug: "eu-uk-probe-instagram-encryption-rollback",
    title: "Will an EU or UK regulator open a formal probe into Instagram's encryption rollback by June 30, 2026?",
    icon: "shield-alert",
    iconBackground: "orange",
    imageUrl: regulatorProbeImage,
    yesVotes: 904,
    noVotes: 1206,
    category: "Tech",
    outcomes: ["Yes", "No"],
    rules: [
      "This market follows Meta's decision to remove optional end-to-end encrypted Instagram DMs.",
      "It resolves to Yes if, by June 30, 2026, 11:59 PM ET, the European Commission, an EU national data-protection authority, the UK ICO, or another official UK/EU regulator publicly announces a formal investigation, probe, or enforcement proceeding specifically tied to Instagram's removal of that encryption option. Otherwise, this market resolves to No.",
      "The primary resolution source will be official regulator publications; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "This market depends on whether privacy backlash turns into a named official proceeding rather than just criticism from policy groups or lawmakers.",
      "Formal action standards in Europe and the UK can be slow, so the deadline is the real pressure point here.",
      "A noisy media cycle around encryption does not count unless a regulator explicitly opens a probe tied to this rollback.",
    ],
    assessment: createAssessment("7.1 / 10", "Official regulator sourcing is strong, but the formal-probe threshold makes timing harder to handicap.", [
      ["8.9", "Regulator notices", "89%"],
      ["7.4", "Formal probe test", "74%"],
      ["4.7", "Process delays", "47%"],
      ["6.1", "Policy-driven", "61%"],
    ]),
  },
  {
    slug: "next-world-baseball-classic-year",
    title: "Which year will the next World Baseball Classic be officially scheduled for?",
    icon: "baseball",
    iconBackground: "rose",
    imageUrl: wbcYearImage,
    yesVotes: 1733,
    noVotes: 1144,
    category: "Sports",
    outcomes: ["2029", "2030", "Another year", "No announcement by December 31, 2026"],
    rules: [
      "The 2026 World Baseball Classic drew record attendance and viewership, and AP reported Commissioner Rob Manfred said the next edition could be affected by the 2028 Olympics and could land in 2029 or 2030.",
      "This market resolves according to the first official announcement from MLB/WBCI specifying the year of the next World Baseball Classic.",
      "If no such announcement is made by December 31, 2026, 11:59 PM ET, this market resolves to No announcement by December 31, 2026.",
      "The primary resolution source will be official MLB/WBCI communications.",
    ],
    marketContext: [
      "After a breakout 2026 tournament, MLB has to decide whether the next WBC should protect its momentum or avoid a collision with the 2028 Olympic baseball calendar.",
      "That leaves traders debating whether organizers prefer a quick 2029 return or a longer reset into 2030.",
      "The extra outcomes capture both scheduling creativity and the possibility that the governing bodies simply stay silent this year.",
    ],
    assessment: createAssessment("7.9 / 10", "The announcement trigger is clean, with most uncertainty concentrated in league scheduling strategy.", [
      ["8.8", "MLB/WBCI release", "88%"],
      ["8.2", "First announcement", "82%"],
      ["3.8", "Calendar politics", "38%"],
      ["7.3", "Fan engagement", "73%"],
    ]),
  },
  {
    slug: "next-world-baseball-classic-midseason",
    title: "Will the next World Baseball Classic be moved to midseason?",
    icon: "calendar-range",
    iconBackground: "green",
    imageUrl: wbcMidseasonImage,
    yesVotes: 846,
    noVotes: 1541,
    category: "Sports",
    outcomes: ["Yes", "No"],
    rules: [
      "AP reported that, after the record-breaking 2026 tournament, MLB is considering whether a future World Baseball Classic should move from spring training to the middle of the MLB season.",
      "This market resolves to Yes if MLB/WBCI officially announces by December 31, 2026, 11:59 PM ET that the next full World Baseball Classic tournament will be held primarily between May 1 and August 31. Otherwise, this market resolves to No.",
      "The primary resolution source will be official MLB/WBCI communications; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "The case for midseason is competitive intensity, but the downside is obvious disruption to MLB clubs and player availability.",
      "That tension is why this market has a more polarized shape than the year-scheduling contract above.",
      "It only resolves Yes on a clear official calendar shift into the core baseball season window.",
    ],
    assessment: createAssessment("7.4 / 10", "Clear seasonal window, though league phrasing around tournament timing could still require close reading.", [
      ["8.6", "Official league source", "86%"],
      ["7.8", "Specific date band", "78%"],
      ["4.2", "Announcement nuance", "42%"],
      ["6.9", "Debate heavy", "69%"],
    ]),
  },
  {
    slug: "any-us-location-over-110f-before-march-31-2026",
    title: "Will any U.S. location exceed 110F before March 31, 2026?",
    icon: "sun-medium",
    iconBackground: "orange",
    imageUrl: usHeatImage,
    yesVotes: 722,
    noVotes: 1684,
    category: "Weather",
    outcomes: ["Yes", "No"],
    rules: [
      "AP reported that Martinez Lake, Arizona, reached 110F, the highest March temperature ever recorded in the U.S., with additional extreme heat expected in the Southwest.",
      "This market resolves to Yes if any official U.S. temperature observation recognized by NOAA/NWS records 110.1F or higher between March 20, 2026 and March 31, 2026, 11:59 PM ET. Otherwise, this market resolves to No.",
      "The primary resolution source will be NOAA/NWS data; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "The market is effectively a short-dated weather extreme contract focused on whether an already historic Southwest heat wave sets another official record.",
      "Because the threshold is 110.1F rather than 110.0F, even a tied record can still miss resolution.",
      "This kind of market trades heavily on forecast volatility and the exact quality-controlled station reading that NOAA recognizes.",
    ],
    assessment: createAssessment("8.1 / 10", "Official weather data keeps this clean, and the numeric threshold is unusually precise.", [
      ["9.1", "NOAA/NWS data", "91%"],
      ["8.5", "Exact threshold", "85%"],
      ["3.5", "Forecast swing", "35%"],
      ["7.4", "Short-term heat", "74%"],
    ]),
  },
  {
    slug: "phoenix-hit-106f-before-march-31-2026",
    title: "Will Phoenix hit 106F or higher before March 31, 2026?",
    icon: "thermometer-sun",
    iconBackground: "rose",
    imageUrl: phoenixHeatImage,
    yesVotes: 691,
    noVotes: 1495,
    category: "Weather",
    outcomes: ["Yes", "No"],
    rules: [
      "Phoenix has already hit 105F during the March 2026 heat wave, according to AP reporting on the record Southwest heat.",
      "This market resolves to Yes if Phoenix, Arizona officially records a daily high of 106.0F or higher on any date from March 20, 2026 through March 31, 2026, 11:59 PM ET. Otherwise, this market resolves to No.",
      "The primary resolution source will be official National Weather Service Phoenix climate reports; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "Compared with the broader U.S. heat market, this one strips things down to a single city and a single daily-high trigger.",
      "That focus makes it easier to follow, but also more vulnerable to a one-degree miss if the heat wave underperforms at the Phoenix climate station.",
      "The market will likely react sharply to each afternoon forecast update because the window is so short.",
    ],
    assessment: createAssessment("8.3 / 10", "Highly trackable local data and a simple binary threshold make this one of the cleaner weather contracts.", [
      ["9.0", "NWS Phoenix", "90%"],
      ["8.8", "City-specific", "88%"],
      ["3.3", "One-degree miss", "33%"],
      ["7.6", "Fast-moving", "76%"],
    ]),
  },
  {
    slug: "uk-naval-deployment-strait-of-hormuz",
    title: "Will the UK announce a naval deployment to help secure the Strait of Hormuz by April 30, 2026?",
    icon: "ship-wheel",
    iconBackground: "blue",
    imageUrl: ukHormuzImage,
    yesVotes: 1182,
    noVotes: 1079,
    category: "Iran",
    outcomes: ["Yes", "No"],
    rules: [
      "After U.S. pressure for allied help in securing shipping through the Strait of Hormuz, AP/PBS reporting said no firm commitments had yet been made, while broader reporting noted some allies had expressed readiness to contribute to safe passage.",
      "This market resolves to Yes if the UK government officially announces by April 30, 2026, 11:59 PM ET that Royal Navy vessels or a UK-led maritime mission will be deployed specifically to help secure shipping in or through the Strait of Hormuz. Otherwise, this market resolves to No.",
      "The primary resolution source will be official UK government statements; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "Britain already has regional maritime experience, so traders are weighing capability against the domestic and diplomatic cost of a fresh official deployment.",
      "The market cares about a public announcement specifically tied to securing Hormuz shipping, not a vague commitment to regional stability.",
      "Because London often calibrates military language carefully, wording precision could matter as much as the operational reality.",
    ],
    assessment: createAssessment("7.0 / 10", "Government sourcing is solid, but official language around deployments can be carefully hedged.", [
      ["8.5", "UK statements", "85%"],
      ["7.0", "Mission wording", "70%"],
      ["4.9", "Diplomatic caution", "49%"],
      ["6.4", "Geopolitical watch", "64%"],
    ]),
  },
  {
    slug: "japan-naval-deployment-strait-of-hormuz",
    title: "Will Japan announce a naval deployment to help secure the Strait of Hormuz by April 30, 2026?",
    icon: "anchor",
    iconBackground: "lavender",
    imageUrl: japanHormuzImage,
    yesVotes: 953,
    noVotes: 1167,
    category: "Iran",
    outcomes: ["Yes", "No"],
    rules: [
      "This market concerns whether Japan converts current discussions into an official deployment announcement.",
      "It resolves to Yes if, by April 30, 2026, 11:59 PM ET, the Japanese government formally announces a deployment of Maritime Self-Defense Force vessels or another official Japanese maritime security contribution specifically aimed at securing shipping in or through the Strait of Hormuz. Otherwise, this market resolves to No.",
      "The primary resolution source will be official Japanese government statements; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "Japan has energy-security reasons to care deeply about Hormuz, but constitutional and political sensitivities can slow any visible military move.",
      "That makes this market a test of whether Tokyo chooses a clearly named deployment or sticks to quieter diplomacy.",
      "A partial support package that stops short of an official maritime-security contribution would still fail the contract.",
    ],
    assessment: createAssessment("6.8 / 10", "Resolution is clear enough, but policy constraints make the probability path less straightforward.", [
      ["8.4", "Official cabinet source", "84%"],
      ["7.2", "Defined contribution", "72%"],
      ["5.1", "Domestic constraints", "51%"],
      ["5.9", "Headline sensitive", "59%"],
    ]),
  },
  {
    slug: "france-naval-deployment-strait-of-hormuz",
    title: "Will France announce a naval deployment to help secure the Strait of Hormuz by April 30, 2026?",
    icon: "sailboat",
    iconBackground: "green",
    imageUrl: franceHormuzImage,
    yesVotes: 874,
    noVotes: 1210,
    category: "Iran",
    outcomes: ["Yes", "No"],
    rules: [
      "This market resolves to Yes if, by April 30, 2026, 11:59 PM ET, France officially announces that French naval assets will be deployed specifically to secure commercial shipping in or through the Strait of Hormuz. Otherwise, this market resolves to No.",
      "The primary resolution source will be official French government or defense-ministry statements; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "France can act alone or inside a coalition, so traders are parsing whether Paris wants visible leadership or strategic ambiguity.",
      "Unlike the UK and Japan markets, this one is slightly cleaner because it only cares about French naval assets, not broader mission architecture.",
      "Still, the announcement must directly tie the deployment to protecting shipping in or through Hormuz.",
    ],
    assessment: createAssessment("7.3 / 10", "Lean wording and strong state sources help, though coalition-style announcements may still need interpretation.", [
      ["8.6", "Defense ministry", "86%"],
      ["7.7", "Direct asset test", "77%"],
      ["4.4", "Coalition phrasing", "44%"],
      ["6.6", "Regional tension", "66%"],
    ]),
  },
  {
    slug: "nato-joint-maritime-mission-hormuz",
    title: "Will NATO announce a joint maritime mission tied to the Strait of Hormuz by April 30, 2026?",
    icon: "globe-2",
    iconBackground: "orange",
    imageUrl: natoHormuzImage,
    yesVotes: 744,
    noVotes: 1481,
    category: "Geopolitics",
    outcomes: ["Yes", "No"],
    rules: [
      "Trump said he wanted allies to help secure the Strait of Hormuz, but AP/PBS reporting indicated NATO and most allies had not committed at the time of reporting.",
      "This market resolves to Yes if NATO officially announces by April 30, 2026, 11:59 PM ET a joint maritime or naval mission explicitly covering the Strait of Hormuz or the immediate shipping corridor around it. Otherwise, this market resolves to No.",
      "The primary resolution source will be NATO statements; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "This is the most institutionally difficult Hormuz market because it requires alliance-level agreement rather than a single national announcement.",
      "NATO could still support regional security politically while never creating the explicit mission label this contract demands.",
      "That gap between diplomatic sympathy and formal mission approval is what gives the No side its natural edge.",
    ],
    assessment: createAssessment("6.7 / 10", "Alliance announcements are authoritative, but institutional complexity makes timing and wording harder to forecast.", [
      ["8.7", "NATO communique", "87%"],
      ["7.1", "Explicit mission test", "71%"],
      ["5.4", "Consensus hurdle", "54%"],
      ["5.7", "Lower immediacy", "57%"],
    ]),
  },
  {
    slug: "taylor-swift-4-awards-iheartradio-2026",
    title: "Will Taylor Swift win 4 or more awards at the 2026 iHeartRadio Music Awards?",
    icon: "music-4",
    iconBackground: "rose",
    imageUrl: taylorAwardsImage,
    yesVotes: 1654,
    noVotes: 722,
    category: "Culture",
    outcomes: ["Yes", "No"],
    rules: [
      "The 2026 iHeartRadio Music Awards are set for March 26, 2026, and Taylor Swift is nominated in multiple categories, including Song of the Year, Artist of the Year, Pop Artist of the Year, Pop Song of the Year, and several fan-voted categories.",
      "This market resolves to Yes if Taylor Swift is officially credited with winning 4 or more awards during the 2026 iHeartRadio Music Awards. Otherwise, this market resolves to No.",
      "The primary resolution source will be iHeartRadio's official winners list or official broadcast materials.",
    ],
    marketContext: [
      "This market is partly a popularity trade and partly a structure trade around how many winnable categories Swift actually converts on award night.",
      "Because some categories are fan-voted, online mobilization and campaign energy can matter almost as much as industry momentum.",
      "The threshold of four wins is high enough that even a strong night could still miss the contract.",
    ],
    assessment: createAssessment("7.8 / 10", "Awards sourcing is clear, but multi-category dependencies add some natural variance.", [
      ["8.8", "Official winners list", "88%"],
      ["8.0", "Countable threshold", "80%"],
      ["4.1", "Category variance", "41%"],
      ["7.5", "Fan-driven interest", "75%"],
    ]),
  },
  {
    slug: "taylor-swift-artist-of-the-year-iheartradio-2026",
    title: "Will Taylor Swift win Artist of the Year at the 2026 iHeartRadio Music Awards?",
    icon: "mic-2",
    iconBackground: "blue",
    imageUrl: taylorArtistImage,
    yesVotes: 1320,
    noVotes: 902,
    category: "Culture",
    outcomes: ["Taylor Swift", "Someone else"],
    rules: [
      "Taylor Swift is an official nominee for Artist of the Year at the 2026 iHeartRadio Music Awards, which air on March 26, 2026.",
      "This market resolves to Taylor Swift if iHeartRadio officially names her the winner of the Artist of the Year category at the 2026 ceremony. Otherwise, this market resolves to Someone else.",
      "The primary resolution source will be iHeartRadio's official winners list or official broadcast materials.",
    ],
    marketContext: [
      "Compared with the four-award market, this contract isolates the night's flagship category into a straight name-versus-field question.",
      "It should trade more directly on award-show narratives, current chart dominance, and whether iHeart wants a broad headline winner.",
      "Because the outcome set is binary, it is much simpler to follow live once the category is announced.",
    ],
    assessment: createAssessment("8.2 / 10", "Single-category resolution and official award sourcing make this especially straightforward.", [
      ["8.9", "Broadcast result", "89%"],
      ["8.8", "Binary naming", "88%"],
      ["3.4", "Upset risk", "34%"],
      ["7.1", "Main category", "71%"],
    ]),
  },
  {
    slug: "harry-styles-msg-residency-sellout",
    title: "Will Harry Styles sell out all 30 Madison Square Garden residency shows before opening night?",
    icon: "ticket",
    iconBackground: "green",
    imageUrl: harryMsgImage,
    yesVotes: 1571,
    noVotes: 611,
    category: "Culture",
    outcomes: ["Yes", "No"],
    rules: [
      "Madison Square Garden announced that Harry Styles will play 30 shows there from August 26 through October 31, 2026, his only U.S. dates of the year, following the release of a new album and a major return-to-SNL moment.",
      "This market resolves to Yes if, by August 26, 2026, 7:00 PM ET, all 30 official MSG dates are listed as sold out on first-party sale pages or otherwise have no standard primary-market tickets available for purchase. Resale inventory will not count. Otherwise, this market resolves to No.",
      "The primary resolution source will be official MSG/Ticketmaster event pages.",
    ],
    marketContext: [
      "This is a pure ticketing-demand market built around whether one of pop's strongest live draws can fully clear a huge 30-show residency before night one.",
      "The first-party distinction matters because a strong resale market will not save the Yes side if standard inventory still exists on official sale pages.",
      "Momentum around a new album cycle could become the decisive factor as opening night gets closer.",
    ],
    assessment: createAssessment("7.6 / 10", "Primary-market sellout language is solid, though venue inventory behavior can change quickly near showtime.", [
      ["8.5", "Ticketmaster pages", "85%"],
      ["7.9", "Primary market only", "79%"],
      ["4.3", "Inventory churn", "43%"],
      ["7.0", "Strong fanbase", "70%"],
    ]),
  },
  {
    slug: "conan-obrien-2027-oscars-host-by-june-2026",
    title: "Will Conan O'Brien be announced as the 2027 Oscars host by June 30, 2026?",
    icon: "clapperboard",
    iconBackground: "lavender",
    imageUrl: conanOscarsImage,
    yesVotes: 1023,
    noVotes: 1191,
    category: "Culture",
    outcomes: ["Yes", "No"],
    rules: [
      "Conan O'Brien hosted the 2026 Oscars, and AP reported that the telecast drew just under 17.9 million viewers, down from the prior year.",
      "This market resolves to Yes if, by June 30, 2026, 11:59 PM ET, the Academy, ABC, or another official Oscars broadcaster/producer announces Conan O'Brien as the host of the 2027 Academy Awards. Otherwise, this market resolves to No.",
      "The primary resolution source will be official Academy or broadcaster announcements; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "Oscars host decisions are partly ratings-driven and partly relationship-driven, so this market asks whether Conan's 2026 performance was good enough for an unusually early renewal.",
      "The June 30 deadline is aggressive compared with the Academy's usual cadence, which naturally boosts the No case.",
      "Even warm press or insider chatter does not count without an official broadcaster or Academy announcement.",
    ],
    assessment: createAssessment("7.5 / 10", "The official-announcement requirement is clear, though the early deadline is a meaningful source of uncertainty.", [
      ["8.6", "Academy/ABC", "86%"],
      ["8.1", "Named host test", "81%"],
      ["4.4", "Early deadline", "44%"],
      ["6.7", "Entertainment buzz", "67%"],
    ]),
  },
  {
    slug: "pophouse-tina-turner-immersive-project-2026",
    title: "Will Pophouse announce a Tina Turner immersive or avatar-based project by December 31, 2026?",
    icon: "sparkles",
    iconBackground: "orange",
    imageUrl: tinaImmersiveImage,
    yesVotes: 842,
    noVotes: 1348,
    category: "Culture",
    outcomes: ["Yes", "No"],
    rules: [
      "AP reported that Pophouse acquired Tina Turner's name, image, likeness, and most music rights, and that the company is known for digital avatars and immersive experiences, though no specific Tina project has yet been confirmed.",
      "This market resolves to Yes if, by December 31, 2026, 11:59 PM ET, Pophouse or an officially authorized partner publicly announces a Tina Turner project that is explicitly described as an immersive experience, avatar concert, digital stage show, VR/AR experience, or equivalent. Otherwise, this market resolves to No.",
      "The primary resolution source will be official Pophouse, BMG, or Tina Turner estate communications; a consensus of credible reporting may also be used.",
    ],
    marketContext: [
      "This market is less about rights ownership itself and more about whether Pophouse moves quickly enough to turn those rights into a branded experiential product announcement.",
      "Because the allowed labels include several modern format names, the contract can still resolve Yes even if the company avoids the word avatar.",
      "The long runway to year-end gives this one more time value than many of the other entertainment markets on the board.",
    ],
    assessment: createAssessment("7.0 / 10", "Official partner sourcing is good, but creative-project language may require careful interpretation.", [
      ["8.3", "Rights-holder source", "83%"],
      ["7.1", "Equivalent formats", "71%"],
      ["4.8", "Naming ambiguity", "48%"],
      ["6.3", "Longer timeline", "63%"],
    ]),
  },
];

export const comments: CommentData[] = [
  {
    author: "ArsinoAbles8",
    time: "24m ago",
    badges: ["TOP COMMENT"],
    avatar: "gray",
    body: "The framing is interesting, but the resolution wording still matters more than the headline.",
    readMore: true,
    actions: ["702", "Reply", "Share"],
  },
  {
    author: "renwenss4429",
    time: "32m ago",
    badges: ["YES 100 Shares", "Top"],
    avatar: "blue",
    body: "https://x.com/freeHungar15929/status/20346674175284...",
    link: true,
    actions: ["0", "Reply"],
    repliesLabel: "2 Replies",
    replies: [
      {
        author: "ctakongg",
        time: "5m ago",
        body: "Need the official source on this one before size gets bigger.",
      },
    ],
  },
];
