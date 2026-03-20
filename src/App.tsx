import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  ChevronDown,
  FileText,
  Hexagon,
  Info,
  Link2,
  List,
  Plus,
  RefreshCcw,
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
import { comments, filters, marketCards, outcomes, rules, type MarketCardData } from "./data/marketData";

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

function AppShell({ children, showBack = false }: { children: ReactNode; showBack?: boolean }) {
  const location = useLocation();

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">
          <Hexagon size={28} strokeWidth={2.1} />
          <span>Polymarket</span>
        </div>

        <div className="searchbar">
          <Search size={16} strokeWidth={2} />
          <span>Search polymarkets...</span>
          <div className="searchbar__shortcut">/</div>
        </div>

        <div className="topbar__actions">
          <button type="button" className="ghost-link">
            How it works
          </button>
          <button type="button" className="ghost-link ghost-link--primary">
            Log In
          </button>
          <button type="button" className="primary-button primary-button--small">
            Sign Up
          </button>
        </div>
      </header>

      <nav className="filterbar">
        <div className="filterbar__inner">
          <div className="filterbar__lead">
            <TrendingUp size={16} strokeWidth={2} />
            <span>Trending</span>
          </div>
          {filters.slice(1).map((filter) => (
            <button key={filter} type="button" className="filter-link">
              {filter}
            </button>
          ))}
          <button type="button" className="filter-link filter-link--dropdown">
            More
            <ChevronDown size={14} strokeWidth={2} />
          </button>
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
  return (
    <AppShell>
      <section className="title-row">
        <h1>All markets</h1>
        <div className="title-row__actions">
          <button type="button" className="icon-button" aria-label="Search">
            <Search size={20} />
          </button>
          <button type="button" className="icon-button" aria-label="Filters">
            <Settings2 size={20} />
          </button>
          <Link to="/propose" className="outline-button outline-button--accent">
            <Plus size={14} />
            Suggest an Event
          </Link>
          <button type="button" className="icon-button" aria-label="Bookmark">
            <Bookmark size={20} />
          </button>
        </div>
      </section>

      <section className="cards-grid">
        {cards.map((card) => (
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

  return (
    <AppShell showBack>
      <section className="detail-header">
        <div className="detail-header__title">
          <div className="detail-header__badge" />
          <h1>{card.title}</h1>
        </div>

        <div className="detail-header__tools">
          <button type="button" className="icon-button" aria-label="Refresh">
            <RefreshCcw size={16} />
          </button>
          <button type="button" className="icon-button" aria-label="Share">
            <Link2 size={16} />
          </button>
          <button type="button" className="icon-button" aria-label="Bookmark">
            <Bookmark size={16} />
          </button>
        </div>
      </section>

      <div className="detail-layout">
        <section className="surface-card">
          <div className="surface-card__header surface-card__header--tight">
            <h2>Outcomes</h2>
          </div>

          <div className="outcomes-list">
            {outcomes.map((outcome) => (
              <div key={outcome.name} className="outcome-row">
                <div className="outcome-row__left">
                  <div className="outcome-row__dot" />
                  <div>
                    <h3>{outcome.name}</h3>
                    <p>{outcome.price}</p>
                  </div>
                </div>

                <div className="outcome-row__right">
                  <span className="outcome-row__probability">{outcome.probability}</span>
                  <button type="button" className="mini-chip mini-chip--yes">
                    {outcome.buyYes}
                  </button>
                  <button type="button" className="mini-chip mini-chip--no">
                    {outcome.buyNo}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card">
          <div className="tabs">
            <button type="button" className="tab tab--active">
              Rules
            </button>
            <button type="button" className="tab">
              Market Context
            </button>
          </div>

          <div className="rules-body">
            {rules.map((rule) => (
              <p key={rule.text} className={`rule rule--${rule.tone ?? "default"}`}>
                {rule.text}
              </p>
            ))}
          </div>
        </section>

        <section className="surface-card">
          <div className="surface-card__header surface-card__header--tight">
            <h2>Comments (905)</h2>
          </div>

          <div className="comment-input">
            <div className="comment-input__field">Add a comment...</div>
            <button type="button" className="primary-button primary-button--small primary-button--fixed">
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
            <p>⚠ Beware of external links.</p>
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
            <Field label="Resolution Date *" input="Select date..." icon={<Calendar size={16} />} select />
            <Field label="Resolution Time (ET)" input="11:59 PM" icon={<Timer size={16} />} select dark />
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
          <button type="button" className="outline-button">
            <Plus size={14} />
            Add Source
          </button>
        </FormSection>

        <FormSection icon={<List size={18} />} title="Outcomes">
          <p className="field-hint field-hint--standalone">
            Define the possible outcomes for your market. Each outcome should be clearly
            distinguishable.
          </p>
          <IndexedField number="1" color="green" value="Péter Magyar" />
          <IndexedField number="2" color="green" value="Viktor Orbán" />
          <IndexedField number="3" color="green" value="Other" />
          <button type="button" className="outline-button">
            <Plus size={14} />
            Add Outcome
          </button>
        </FormSection>
      </section>

      <footer className="form-footer">
        <div className="form-footer__note">
          <Info size={16} />
          <span>Your proposal will be reviewed by the Polymarket team within 48 hours.</span>
        </div>

        <div className="form-footer__actions">
          <button type="button" className="secondary-button">
            Save as Draft
          </button>
          <button type="button" className="primary-button">
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
