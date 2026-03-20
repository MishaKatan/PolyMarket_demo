export type MarketCardData = {
  slug: string;
  title: string;
  icon: string;
  iconBackground: string;
  yesVotes: number;
  noVotes: number;
};

export type OutcomeData = {
  name: string;
  price: string;
  probability: string;
  buyYes: string;
  buyNo: string;
};

export type RuleData = {
  text: string;
  tone?: "default" | "danger" | "muted";
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

export const filters = [
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

export const marketCards: MarketCardData[] = [
  { slug: "2026-ncaa-tournament-winner", title: "2026 NCAA Tournament Winner", icon: "trophy", iconBackground: "lavender", yesVotes: 1896, noVotes: 445 },
  { slug: "btc-5-minute-up-or-down", title: "BTC 5 Minute Up or Down", icon: "bitcoin", iconBackground: "orange", yesVotes: 513, noVotes: 474 },
  { slug: "us-confirm-aliens-before-2027", title: "Will the US confirm that aliens exist before 2027?", icon: "globe", iconBackground: "rose", yesVotes: 857, noVotes: 3655 },
  { slug: "crude-oil-hit-100-by-end-of-march", title: "Will Crude Oil hit $100 by end of March?", icon: "fuel", iconBackground: "green", yesVotes: 3296, noVotes: 493 },
  { slug: "us-forces-enter-iran", title: "US forces enter Iran by..?", icon: "flag", iconBackground: "rose", yesVotes: 3622, noVotes: 1480 },
  { slug: "jd-gaming-vs-loud-esports", title: "JD Gaming vs LOUD — Esports", icon: "gamepad-2", iconBackground: "blue", yesVotes: 306, noVotes: 6 },
  { slug: "tcu-vs-ohio-state", title: "TCU Horned Frogs vs Ohio State Buckeyes", icon: "circle-dot", iconBackground: "orange", yesVotes: 832, noVotes: 1058 },
  { slug: "south-florida-vs-louisville", title: "South Florida Bulls vs Louisville Cardinals", icon: "medal", iconBackground: "green", yesVotes: 975, noVotes: 1592 },
  { slug: "vcu-vs-north-carolina", title: "VCU Rams vs North Carolina Tar Heels", icon: "award", iconBackground: "blue", yesVotes: 655, noVotes: 801 },
  { slug: "mouz-vs-themongolz-cs2", title: "MOUZ vs TheMongolz — CS2", icon: "crosshair", iconBackground: "rose", yesVotes: 626, noVotes: 208 },
  { slug: "pistons-vs-wizards-nba", title: "Pistons vs Wizards — NBA", icon: "zap", iconBackground: "orange", yesVotes: 610, noVotes: 68 },
  { slug: "us-invade-cuba-2026", title: "Will the U.S. invade Cuba in 2026?", icon: "map", iconBackground: "rose", yesVotes: 1553, noVotes: 4657 },
];

export const outcomes: OutcomeData[] = [
  { name: "Péter Magyar", price: "49¢/72.50 W", probability: "64%", buyYes: "Buy Yes 64¢", buyNo: "Buy No 39¢" },
  { name: "Viktor Orbán", price: "43¢/34.50 W", probability: "36%", buyYes: "Buy Yes 36¢", buyNo: "Buy No 66¢" },
  { name: "Lezsó Toroczkai", price: "1¢/0.50 W", probability: "1%", buyYes: "Buy Yes 1¢", buyNo: "Buy No 99¢" },
  { name: "János Lázár", price: "1¢/0.25 W", probability: "<1%", buyYes: "Buy Yes 1¢", buyNo: "Buy No 99¢" },
];

export const rules: RuleData[] = [
  { text: "Parliamentary elections are scheduled to be held in Hungary on April 12 2026." },
  { text: "This market will resolve to the individual who is next officially appointed and confirmed as Prime Minister of Hungary following the 2026 parliamentary election." },
  { text: "To count for resolution, the individual must be formally elected and appointed to the role of Prime Minister. Any interim or caretaker Prime Minister will not count toward the resolution of this market.", tone: "danger" },
  { text: "If no such Prime Minister is confirmed by December 31, 2026, 11:59 PM ET, this market will resolve to \"Other.\"", tone: "danger" },
  { text: "The primary resolution source for this market will be official information from the Government of Hungary; however, a consensus of credible reporting may also be used." },
  { text: "Market Opened: Jul 24, 2025, 5:55 PM ET", tone: "muted" },
];

export const comments: CommentData[] = [
  {
    author: "ArsinoAbles8",
    time: "24m ago",
    badges: ["TOP COMMENT"],
    avatar: "gray",
    body: "A Tisza csak egy hype, főleg a fiatalok körében akik teljesen életképtelenek mert egy szöget nem tudnak egyenesen beütni a falba. A mai fiatalok gyengék mentálisan és fizikailag is...",
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
    repliesLabel: "2 Replies ▲",
    replies: [
      {
        author: "ctakongg",
        time: "5m ago",
        body: "@renwenss4429 To register 2000 ads please browse news? where exactly",
      },
    ],
  },
];
