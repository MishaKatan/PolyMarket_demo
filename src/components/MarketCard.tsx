import { useNavigate } from "react-router-dom";
import type { MarketCardData } from "../data/marketData";

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
  const navigate = useNavigate();
  const summary = formatVoteSummary(data.yesVotes, data.noVotes);

  return (
    <article
      className="market-card"
      onClick={() => navigate(`/event/${data.slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          navigate(`/event/${data.slug}`);
        }
      }}
      aria-label={data.title}
    >
      <div className="market-card__media">
        <img src={data.imageUrl} alt={data.title} className="market-card__image" />
      </div>

      <div className="market-card__header">
        <div className={`market-card__category market-card__category--${data.iconBackground}`}>
          {data.category}
        </div>
        <h3>{data.title}</h3>
      </div>

      <div className="market-card__question-wrap">
        <p className="market-card__question">
          Are you interested in adding this event to PolyVote?
        </p>
      </div>

      <div className="market-card__actions">
        <button
          type="button"
          className="chip chip--yes"
          onClick={(event) => {
            event.stopPropagation();
            onVote(data.slug, "yes");
          }}
        >
          Yes
        </button>
        <button
          type="button"
          className="chip chip--no"
          onClick={(event) => {
            event.stopPropagation();
            onVote(data.slug, "no");
          }}
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
