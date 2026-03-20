import {
  Award,
  Bitcoin,
  CircleDot,
  Crosshair,
  Flag,
  Fuel,
  Gamepad2,
  Globe,
  Map,
  Medal,
  Trophy,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { MarketCardData } from "../data/marketData";

const iconMap = {
  trophy: Trophy,
  bitcoin: Bitcoin,
  globe: Globe,
  fuel: Fuel,
  flag: Flag,
  "gamepad-2": Gamepad2,
  "circle-dot": CircleDot,
  medal: Medal,
  award: Award,
  crosshair: Crosshair,
  zap: Zap,
  map: Map,
} as const;

function formatVoteSummary(yesVotes: number, noVotes: number) {
  const total = yesVotes + noVotes;
  const yesPct = Math.round((yesVotes / total) * 100);
  const noPct = 100 - yesPct;

  return {
    yesLabel: `${yesPct}% Yes`,
    noLabel: `${noPct}% No`,
    totalLabel: `${total.toLocaleString()} votes`,
  };
}

export function MarketCard({
  data,
  onVote,
}: {
  data: MarketCardData;
  onVote: (slug: string, side: "yes" | "no") => void;
}) {
  const Icon = iconMap[data.icon as keyof typeof iconMap] ?? Trophy;
  const summary = formatVoteSummary(data.yesVotes, data.noVotes);

  return (
    <article className="market-card">
      <Link to={`/event/${data.slug}`} className="market-card__overlay" aria-label={data.title} />

      <div className="market-card__header">
        <div className={`market-card__icon market-card__icon--${data.iconBackground}`}>
          <Icon size={18} strokeWidth={1.9} />
        </div>
        <h3>{data.title}</h3>
      </div>

      <p className="market-card__question">
        Are you interested in adding this event to Polymarket?
      </p>

      <div className="market-card__actions">
        <button
          type="button"
          className="chip chip--yes"
          onClick={() => onVote(data.slug, "yes")}
        >
          Yes
        </button>
        <button
          type="button"
          className="chip chip--no"
          onClick={() => onVote(data.slug, "no")}
        >
          No
        </button>
      </div>

      <div className="market-card__stats">
        <span className="stat stat--yes">{summary.yesLabel}</span>
        <span className="stat stat--no">{summary.noLabel}</span>
        <span className="stat stat--votes">{summary.totalLabel}</span>
      </div>
    </article>
  );
}
