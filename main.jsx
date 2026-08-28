import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gamepad2,
  HeartPulse,
  Home,
  Image,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import "./styles.css";
import { appData } from "./data/problemData";

function App() {
  const [active, setActive] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = [
    { label: "Home", icon: Home },
    { label: "Memory", icon: Brain },
    { label: "Games", icon: Gamepad2 },
    { label: "Reminders", icon: CalendarDays },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Brain size={21} /></div>
          <div>
            <strong>{appData.brand.name}</strong>
            <span>{appData.brand.tagline}</span>
          </div>
          <button className="icon-button close-menu" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="nav-section">
          <p className="eyebrow">MAIN MENU</p>
          {nav.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => { setActive(label); setMobileOpen(false); }}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="nav-section secondary">
          <p className="eyebrow">SUPPORT</p>
          <button className="nav-item"><MessageCircle size={19} /><span>Care Team</span></button>
          <button className="nav-item"><Settings size={19} /><span>Settings</span></button>
        </div>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon"><ShieldCheck size={19} /></div>
            <div>
              <strong>You're supported</strong>
              <p>Your care circle is connected.</p>
            </div>
          </div>
          <div className="mini-profile">
            <div className="avatar">AP</div>
            <div>
              <strong>{appData.patient.name}</strong>
              <span>{appData.patient.role}</span>
            </div>
            <ChevronRight size={17} />
          </div>
        </div>
      </aside>

      {mobileOpen && <div className="backdrop" onClick={() => setMobileOpen(false)} />}

      <main className="main">
        <header className="topbar">
          <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="topbar-title">
            <span className="muted">Saturday, August 29</span>
            <h1>{active === "Home" ? "Good morning, {appData.patient.firstName}" : active}</h1>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search memories..." />
            </div>
            <button className="profile-button">
              <div className="avatar small">AP</div>
              <span>{appData.patient.name}</span>
            </button>
          </div>
        </header>

        <div className="content">
          {active === "Home" ? <HomePage /> : <PlaceholderPage title={active} />}
        </div>
      </main>
    </div>
  );
}

function HomePage() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <>
      <section className="welcome-card">
        <div>
          <div className="welcome-pill"><Sparkles size={15} /> A gentle start to your day</div>
          <h2>Let's keep your mind active, one moment at a time.</h2>
          <p>Play a short game, revisit a familiar memory, or check today's reminders.</p>
          <div className="welcome-actions">
            <button className="primary-btn" onClick={() => setGameStarted(true)}>
              <Gamepad2 size={18} /> Start today's game
            </button>
            <button className="secondary-btn"><Brain size={18} /> View memories</button>
          </div>
        </div>
        <div className="welcome-illustration">
          <div className="sun"></div>
          <div className="leaf leaf-one"></div>
          <div className="leaf leaf-two"></div>
          <div className="illustration-card">
            <Brain size={34} />
            <span>Today's focus</span>
            <strong>Remember & Match</strong>
          </div>
        </div>
      </section>

      {gameStarted && (
        <div className="game-toast">
          <CheckCircle2 size={20} />
          <span>Game ready! This prototype can later open the full cognitive game.</span>
          <button onClick={() => setGameStarted(false)}><X size={16} /></button>
        </div>
      )}

      <section className="section-heading">
        <div>
          <p className="eyebrow">TODAY</p>
          <h3>Your daily overview</h3>
        </div>
        <button className="text-button">See all <ChevronRight size={16} /></button>
      </section>

      <section className="stat-grid">
        <StatCard icon={<Brain />} label="Cognitive activity" value="18 min" note="12% more than yesterday" />
        <StatCard icon={<CheckCircle2 />} label="Reminders completed" value="4 / 5" note="One reminder remaining" />
        <StatCard icon={<HeartPulse />} label="Daily wellbeing" value="Good" note="Based on today's check-in" />
      </section>

      <div className="dashboard-grid">
        <section className="panel games-panel">
          <PanelHeader title="Cognitive games" subtitle="Short activities designed for gentle daily practice" action="View all" />
          <div className="game-list">
            {appData.games.map((game) => (
              <GameCard key={game.title} game={game} />
            ))}
          </div>
        </section>

        <section className="panel reminders-panel">
          <PanelHeader title="Today's reminders" subtitle="Simple prompts for the day" action="Manage" />
          <div className="reminders">
            {appData.reminders.map((item) => (
              <div className={`reminder ${item.done ? "done" : ""}`} key={item.title}>
                <div className="reminder-check">{item.done ? <CheckCircle2 size={18} /> : <Clock3 size={18} />}</div>
                <div className="reminder-copy">
                  <strong>{item.title}</strong>
                  <span>{item.time}</span>
                </div>
                <ChevronRight size={17} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="dashboard-grid lower">
        <section className="panel memory-panel">
          <PanelHeader title="Memory moments" subtitle="Familiar people, places and moments" action="Open memory book" />
          <div className="memory-grid">
            {appData.memories.map((memory) => (
              <div className="memory-card" key={memory.title}>
                <div className={`memory-image ${memory.tone}`}>
                  <Image size={25} />
                </div>
                <div className="memory-info">
                  <strong>{memory.title}</strong>
                  <span>{memory.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel care-panel">
          <PanelHeader title="Care circle" subtitle="People connected to your support" />
          <div className="care-person">
            <div className="avatar caregiver">SC</div>
            <div>
              <strong>{appData.caregiver.name}</strong>
              <span>{appData.caregiver.relation}</span>
            </div>
            <button className="call-button"><Phone size={17} /></button>
          </div>
          <div className="care-note">
            <MessageCircle size={17} />
            <p>{appData.caregiver.note}</p>
          </div>
          <button className="outline-wide">Open care chat</button>
        </section>
      </div>

      <footer className="footer">
        <span>Smaran Caregiver prototype • Frontend only</span>
        <span><Moon size={14} /> Calm mode</span>
      </footer>
    </>
  );
}

function StatCard({ icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </div>
  );
}

function PanelHeader({ title, subtitle, action }) {
  return (
    <div className="panel-header">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {action && <button className="text-button">{action} <ChevronRight size={15} /></button>}
    </div>
  );
}

function GameCard({ game }) {
  return (
    <button className="game-card">
      <div className={`game-art ${game.tone}`}>
        {game.icon === "brain" ? <Brain size={25} /> : <Sparkles size={25} />}
      </div>
      <div className="game-copy">
        <strong>{game.title}</strong>
        <span>{game.description}</span>
        <small>{game.duration} • {game.level}</small>
      </div>
      <ChevronRight className="game-arrow" size={18} />
    </button>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder panel">
      <div className="placeholder-icon"><Sparkles size={28} /></div>
      <p className="eyebrow">PROTOTYPE</p>
      <h2>{title}</h2>
      <p>This section is ready for the next frontend screen. The navigation and data structure are already separated so it can be expanded without rebuilding the whole app.</p>
      <button className="primary-btn"><Home size={18} /> Back to dashboard</button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
