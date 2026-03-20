import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  ChevronDown,
  Code,
  FileText,
  Info,
  Link2,
  List,
  Plus,
  Scale,
  Search,
  Send,
  Settings2,
  Timer,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { MarketCard } from "./components/MarketCard";
import { comments, filters, marketCards, type FilterTag, type MarketCardData } from "./data/marketData";

function App() {
  const [cards, setCards] = useState(marketCards);

  const handleVote = (slug: string, side: "yes" | "no") => {
    setCards((current) =>
      current.map((card) =>
        card.slug === slug
          ? {
              ...card,
              yesVotes: side === "yes" ? card.yesVotes + 1 : card.yesVotes,
              noVotes: side === "no" ? card.noVotes + 1 : card.noVotes,
            }
          : card,
      ),
    );
  };

  return (
    <Routes>
      <Route path="/" element={<MarketsPage cards={cards} onVote={handleVote} />} />
      <Route path="/event/:slug" element={<EventDetailPage cards={cards} />} />
      <Route path="/propose" element={<ProposeEventPage />} />
    </Routes>
  );
}

type OutcomeTone = "green" | "red" | "blue" | "violet" | "amber";

function getOutcomePresentation(outcome: string, index: number) {
  const normalized = outcome.toLowerCase();

  if (normalized === "yes") {
    return { tone: "green" as OutcomeTone, badge: "YES", accent: "Bullish" };
  }

  if (normalized === "no" || normalized === "someone else" || normalized.includes("no announcement")) {
    return { tone: "red" as OutcomeTone, badge: normalized === "no" ? "NO" : "ALT", accent: "Fallback" };
  }

  if (/^\d{4}$/.test(outcome)) {
    return { tone: "violet" as OutcomeTone, badge: outcome.slice(2), accent: "Year pick" };
  }

  if (normalized.includes("under")) {
    return { tone: "amber" as OutcomeTone, badge: "LOW", accent: "Lower range" };
  }

  if (
    normalized.includes("million") ||
    normalized.includes("another year") ||
    normalized.includes("or more") ||
    normalized.includes("to")
  ) {
    return { tone: "blue" as OutcomeTone, badge: "MID", accent: "Bracket" };
  }

  const initials = outcome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const tones: OutcomeTone[] = ["violet", "blue", "amber", "green"];

  return {
    tone: tones[index % tones.length],
    badge: initials || "EV",
    accent: "Named outcome",
  };
}

function AppShell({
  children,
  showBack = false,
  activeFilter,
  onFilterChange,
}: {
  children: ReactNode;
  showBack?: boolean;
  activeFilter?: FilterTag;
  onFilterChange?: (filter: FilterTag) => void;
}) {
  const location = useLocation();

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">
          <img src="/images/icon-radar.png" alt="PolyVote" className="brand__logo" />
          <span>PolyVote</span>
        </div>

        <div className="topbar__actions">
          <button type="button" className="ghost-link">
            How it works
          </button>
          <button type="button" className="ghost-link ghost-link--primary">
            Log In
          </button>
          <button type="button" className="brand-button">
            Sign Up
          </button>
        </div>
      </header>

      <nav className="filterbar">
        <div className="filterbar__inner">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`filter-link${activeFilter === filter ? " filter-link--active" : ""}`}
              onClick={onFilterChange ? () => onFilterChange(filter) : undefined}
            >
              {index === 0 ? <TrendingUp size={16} strokeWidth={2} /> : null}
              {filter}
            </button>
          ))}
        </div>
      </nav>

      {showBack ? (
        <div className="back-row">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} strokeWidth={2} />
            Back to All Markets
          </Link>
        </div>
      ) : null}

      <main className={`page-content${location.pathname === "/" ? " page-content--markets" : ""}`}>
        {children}
      </main>
    </div>
  );
}

function MarketsPage({
  cards,
  onVote,
}: {
  cards: MarketCardData[];
  onVote: (slug: string, side: "yes" | "no") => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("Trending");
  const filteredCards =
    activeFilter === "Trending" || activeFilter === "Breaking" || activeFilter === "New"
      ? cards
      : cards.filter((card) => card.category === activeFilter);

  return (
    <AppShell activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      <section className="title-row">
        <h1>All markets</h1>
        <div className="title-row__actions">
          <button type="button" className="icon-button" aria-label="Search">
            <Search size={18} />
          </button>
          <button type="button" className="icon-button" aria-label="Filters">
            <Settings2 size={18} />
          </button>
          <Link to="/propose" className="suggest-button">
            <Plus size={14} />
            Suggest an Event
          </Link>
          <button type="button" className="icon-button" aria-label="Bookmark">
            <Bookmark size={18} />
          </button>
        </div>
      </section>

      <section className="cards-grid">
        {filteredCards.map((card) => (
          <div key={card.slug} className="market-card--interactive">
            <MarketCard data={card} onVote={onVote} />
          </div>
        ))}
      </section>
    </AppShell>
  );
}

function EventDetailPage({ cards }: { cards: MarketCardData[] }) {
  const { slug } = useParams();
  const card = cards.find((item) => item.slug === slug) ?? cards[0];
  const [activeTab, setActiveTab] = useState<"rules" | "context">("rules");
  const commentCount = useMemo(() => 885 + (card.yesVotes % 90), [card.yesVotes]);

  return (
    <AppShell showBack>
      <section className="event-header">
        <p className="event-breadcrumb">World · {card.category}</p>

        <div className="event-title-row">
          <div className="event-title-row__left">
            <img src={card.imageUrl} alt={card.title} className="event-image" />
            <h1>{card.title}</h1>
          </div>

          <div className="event-title-row__actions">
            <button type="button" className="icon-button" aria-label="Embed">
              <Code size={18} />
            </button>
            <button type="button" className="icon-button" aria-label="Link">
              <Link2 size={18} />
            </button>
            <button type="button" className="icon-button" aria-label="Bookmark">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </section>

      <div className="detail-layout">
        <section className="surface-card">
          <div className="surface-card__header">
            <h2>Outcomes</h2>
          </div>
          <div className="simple-list">
            {card.outcomes.map((outcome, index) => (
              <div key={outcome} className="simple-list__row">
                <div
                  className={`simple-list__avatar simple-list__avatar--${getOutcomePresentation(outcome, index).tone}`}
                >
                  {getOutcomePresentation(outcome, index).badge}
                </div>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card">
          <div className="tabs">
            <button
              type="button"
              className={`tab${activeTab === "rules" ? " tab--active" : ""}`}
              onClick={() => setActiveTab("rules")}
            >
              Rules
            </button>
            <button
              type="button"
              className={`tab${activeTab === "context" ? " tab--active" : ""}`}
              onClick={() => setActiveTab("context")}
            >
              Market Context
            </button>
          </div>

          <div className="rules-body">
            {(activeTab === "rules" ? card.rules : card.marketContext).map((rule, index, list) => (
              <p key={rule} className={`rule${index === list.length - 1 ? " rule--muted" : ""}`}>
                {rule}
              </p>
            ))}
          </div>
        </section>

        <section className="surface-card">
          <div className="surface-card__header surface-card__header--space">
            <div className="assessment-title">
              <div className="assessment-title__icon">
                <FileText size={18} />
              </div>
              <h2>AI Assessment</h2>
            </div>
            <div className="assessment-badge">AUTO-GENERATED</div>
          </div>

          <div className="assessment-body">
            <div className="score-card">
              <span className="kicker">OVERALL SCORE</span>
              <strong>{card.assessment.score}</strong>
              <p>{card.assessment.summary}</p>
            </div>

            <div className="metrics-grid">
              {card.assessment.metrics.map((metric) => (
                <div key={metric.label} className="metric-card">
                  <span className="kicker">{metric.label}</span>
                  <div className="metric-bar">
                    <div
                      className={`metric-bar__fill metric-bar__fill--${metric.color}`}
                      style={{ width: metric.width }}
                    />
                  </div>
                  <div className="metric-card__footer">
                    <strong>{metric.value}</strong>
                    <span className={metric.color === "amber" ? "metric-note metric-note--amber" : "metric-note"}>
                      {metric.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card">
          <div className="surface-card__header">
            <h2>Comments ({commentCount})</h2>
          </div>

          <div className="comment-input">
            <div className="comment-input__field">Add a comment...</div>
            <button type="button" className="brand-button brand-button--small">
              Post
            </button>
          </div>

          <div className="comments-toolbar">
            <div className="comments-toolbar__left">
              <button type="button" className="comments-toolbar__sort">
                Newest
                <ChevronDown size={14} />
              </button>
              <span>Holders</span>
            </div>
            <p>Beware of external links.</p>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <article key={comment.author + comment.time} className="comment-card">
                <div className={`comment-card__avatar comment-card__avatar--${comment.avatar}`} />
                <div className="comment-card__body">
                  <div className="comment-card__meta">
                    <strong>{comment.author}</strong>
                    <span>{comment.time}</span>
                    {comment.badges?.map((badge) => (
                      <span key={badge} className="comment-badge">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <p className={comment.link ? "comment-card__link" : ""}>{comment.body}</p>
                  {comment.readMore ? (
                    <button type="button" className="read-more">
                      Read more
                    </button>
                  ) : null}

                  <div className="comment-actions">
                    {comment.actions.map((action) => (
                      <button key={action} type="button">
                        {action}
                      </button>
                    ))}
                  </div>

                  {comment.repliesLabel ? (
                    <button type="button" className="reply-toggle">
                      {comment.repliesLabel}
                    </button>
                  ) : null}

                  {comment.replies?.map((reply) => (
                    <div key={reply.author + reply.time} className="reply-card">
                      <div className="reply-card__line" />
                      <div className="reply-card__content">
                        <div className="comment-card__meta">
                          <strong>{reply.author}</strong>
                          <span>{reply.time}</span>
                        </div>
                        <p>{reply.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ProposeEventPage() {
  return (
    <AppShell showBack>
      <section className="propose-header">
        <h1>Propose a New Event</h1>
        <p>
          Submit your market idea for review. Provide as much detail as possible to increase
          approval chances.
        </p>
      </section>

      <section className="surface-card">
        <FormSection icon={<FileText size={18} />} title="Event Details">
          <Field label="Event Title *" input="e.g. Next Prime Minister of Hungary" />
          <Field label="Category" input="Select category..." select />
          <div className="field-row">
            <Field label="Resolution Date *" input="Select date..." select />
            <Field label="Resolution Time (ET)" input="11:59 PM ET" icon={<Timer size={16} />} select dark />
          </div>
          <Field
            label="Event Context *"
            hint="Describe the background and context of the event. What is happening and why is it significant?"
            textarea="Parliamentary elections are scheduled to be held in Hungary on April 12 2026. The current ruling party Fidesz faces a strong challenge from the opposition..."
          />
        </FormSection>

        <FormSection icon={<Scale size={18} />} title="Market Rules">
          <Field
            label="Resolution Rules *"
            hint="Define clear, unambiguous rules for how the market will resolve. Be as specific as possible."
            textarea={`This market will resolve to the individual who is next officially appointed and confirmed as Prime Minister of Hungary following the 2026 parliamentary election.\n\nTo count for resolution, the individual must be formally elected and appointed to the role...`}
          />
          <Field
            label="Edge Cases & Conditions"
            hint="What happens if the event doesn't occur? Describe fallback resolution."
            textarea='If no Prime Minister is confirmed by December 31, 2026, 11:59 PM ET, this market will resolve to "Other."'
            compact
          />
        </FormSection>

        <FormSection icon={<Link2 size={18} />} title="Resolution Sources">
          <p className="field-hint field-hint--standalone">
            Add URLs or references that will be used to verify the outcome.
          </p>
          <IndexedField number="1" color="blue" value="https://government.hu/official-results" />
          <IndexedField number="2" color="blue" value="https://reuters.com/hungary-elections" />
          <button type="button" className="ghost-outline-button">
            <Plus size={14} />
            Add Source
          </button>
        </FormSection>

        <FormSection icon={<List size={18} />} title="Outcomes">
          <p className="field-hint field-hint--standalone">
            Define the possible outcomes for your market. Each outcome should be clearly
            distinguishable.
          </p>
          <IndexedField number="1" color="green" value="Peter Magyar" />
          <IndexedField number="2" color="green" value="Viktor Orban" />
          <IndexedField number="3" color="green" value="Other" />
          <button type="button" className="ghost-outline-button">
            <Plus size={14} />
            Add Outcome
          </button>
        </FormSection>
      </section>

      <footer className="form-footer">
        <div className="form-footer__note">
          <Info size={16} />
          <span>Your proposal will be reviewed by the PolyVote team within 48 hours.</span>
        </div>

        <div className="form-footer__actions">
          <button type="button" className="ghost-outline-button ghost-outline-button--footer">
            Save as Draft
          </button>
          <button type="button" className="brand-button">
            <Send size={16} />
            Submit Proposal
          </button>
        </div>
      </footer>
    </AppShell>
  );
}

function FormSection({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="form-section">
      <div className="form-section__header">
        <div className="section-icon">{icon}</div>
        <h2>{title}</h2>
      </div>
      <div className="form-section__body">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  input,
  textarea,
  select = false,
  icon,
  dark = false,
  compact = false,
}: {
  label: string;
  hint?: string;
  input?: string;
  textarea?: string;
  select?: boolean;
  icon?: ReactNode;
  dark?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      {hint ? <p className="field-hint">{hint}</p> : null}
      {textarea ? (
        <div className={`textarea${compact ? " textarea--compact" : ""}`}>{textarea}</div>
      ) : (
        <div className={`input-shell${dark ? " input-shell--dark" : ""}`}>
          <span>{input}</span>
          {select ? icon ?? <ChevronDown size={16} /> : null}
        </div>
      )}
    </div>
  );
}

function IndexedField({
  number,
  color,
  value,
}: {
  number: string;
  color: "blue" | "green";
  value: string;
}) {
  return (
    <div className="indexed-field">
      <div className={`indexed-field__number indexed-field__number--${color}`}>{number}</div>
      <div className="indexed-field__input">{value}</div>
      <button type="button" className="trash-button" aria-label="Delete item">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default App;
