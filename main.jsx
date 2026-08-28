import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bell, Brain, CalendarDays, ChevronRight, CircleHelp, Clock3, Gamepad2,
  Heart, Home, Lightbulb, LogOut, MessageCircle, Music2, Plus, Search,
  Settings, Sparkles, Star, Sun, Trophy, UserRound, Users, Volume2,
  X, CheckCircle2, Smile, BookOpen, Menu
} from "lucide-react";
import "./styles.css";

/* =========================================================
   SMARAN CAREGIVER
   All prototype content lives in this file so it is easy to
   replace later with API/database data.
   ========================================================= */

const patient = {
  name: "Ananya",
  age: 72,
  city: "Guwahati",
  initials: "A",
  streak: 6,
  mood: "Cheerful",
  nextReminder: "10:30 AM",
};

const games = [
  {
    id: 1,
    title: "Memory Match",
    subtitle: "Match familiar pairs",
    icon: "🧩",
    color: "peach",
    duration: "5 min",
    progress: 78,
  },
  {
    id: 2,
    title: "Picture Recall",
    subtitle: "Remember everyday objects",
    icon: "🌼",
    color: "lavender",
    duration: "7 min",
    progress: 64,
  },
  {
    id: 3,
    title: "Word Garden",
    subtitle: "Build words & recall",
    icon: "🌱",
    color: "mint",
    duration: "6 min",
    progress: 85,
  },
  {
    id: 4,
    title: "Sound Memories",
    subtitle: "Recognise familiar sounds",
    icon: "🎵",
    color: "sky",
    duration: "5 min",
    progress: 56,
  },
];

const reminders = [
  { time: "10:30", ampm: "AM", title: "Morning medicine", note: "After breakfast", icon: "💊" },
  { time: "01:00", ampm: "PM", title: "Lunch & hydration", note: "Light meal + water", icon: "🥗" },
  { time: "04:30", ampm: "PM", title: "Memory game", note: "Picture Recall", icon: "🧠" },
  { time: "07:30", ampm: "PM", title: "Evening walk", note: "20 minutes", icon: "🌤️" },
];

const activity = [
  { icon: "🧩", title: "Memory Match completed", time: "Today · 9:15 AM", score: "+18 pts" },
  { icon: "💧", title: "Hydration reminder checked", time: "Yesterday · 1:12 PM", score: "Done" },
  { icon: "🌱", title: "Word Garden completed", time: "Yesterday · 10:05 AM", score: "+24 pts" },
];

function App() {
  const [active, setActive] = useState("Home");
  const [showAdd, setShowAdd] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const navItems = [
    { label: "Home", icon: Home },
    { label: "Memory Games", icon: Gamepad2 },
    { label: "Reminders", icon: Bell },
    { label: "Progress", icon: Trophy },
  ];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Brain size={24} strokeWidth={2.5} /></div>
          <div>
            <strong>Smaran</strong>
            <span>Caregiver</span>
          </div>
        </div>

        <div className="patient-mini">
          <div className="avatar avatar-yellow">{patient.initials}</div>
          <div className="patient-mini-info">
            <span>Caregiving for</span>
            <strong>{patient.name}</strong>
          </div>
          <ChevronRight size={17} />
        </div>

        <nav>
          <p className="nav-label">YOUR SPACE</p>
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => { setActive(label); setMenuOpen(false); }}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "Reminders" && <b className="nav-dot">3</b>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => notify("Help centre coming soon")}>
            <CircleHelp size={19} /><span>Help & support</span>
          </button>
          <button className="nav-item" onClick={() => notify("Settings coming soon")}>
            <Settings size={19} /><span>Settings</span>
          </button>
          <div className="care-note">
            <Sparkles size={18} />
            <div>
              <strong>Small steps matter.</strong>
              <span>Every little memory is a win.</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(v => !v)}><Menu size={23} /></button>
          <div className="topbar-title">
            <span className="eyebrow">Saturday, 29 August</span>
            <h1>{active === "Home" ? <>Good morning, <em>caregiver!</em> ☀️</> : active}</h1>
          </div>
          <div className="top-actions">
            <button className="icon-button" onClick={() => notify("No new notifications")}><Bell size={19} /><span className="notification-dot" /></button>
            <button className="profile" onClick={() => notify("Profile menu coming soon")}>
              <div className="avatar avatar-coral">C</div>
              <span>Caregiver</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </header>

        {active === "Home" && (
          <HomePage onPlay={() => notify("Starting Memory Match…")} onAdd={() => setShowAdd(true)} notify={notify} />
        )}
        {active === "Memory Games" && (
          <GamesPage onPlay={() => notify("Game started!")} />
        )}
        {active === "Reminders" && (
          <RemindersPage onAdd={() => setShowAdd(true)} />
        )}
        {active === "Progress" && (
          <ProgressPage />
        )}
      </main>

      {showAdd && <AddReminder onClose={() => setShowAdd(false)} onSave={() => { setShowAdd(false); notify("Reminder added successfully!"); }} />}
      {toast && <div className="toast"><CheckCircle2 size={18} />{toast}</div>}
    </div>
  );
}

function HomePage({ onPlay, onAdd, notify }) {
  return (
    <div className="content">
      <section className="welcome-card">
        <div className="welcome-copy">
          <div className="sun-badge"><Sun size={18} /> Ananya's day</div>
          <h2>Let's make today<br /><span>a little brighter.</span> 🌈</h2>
          <p>A gentle mix of memory games, reminders and cheerful moments — all in one place.</p>
          <button className="primary-btn" onClick={onPlay}>Play a memory game <ChevronRight size={18} /></button>
        </div>
        <div className="welcome-art">
          <div className="blob blob-one" />
          <div className="blob blob-two" />
          <div className="cloud cloud-one">☁️</div>
          <div className="cloud cloud-two">☁️</div>
          <div className="flower">🌸</div>
          <div className="sun-art">☀️</div>
          <div className="home-character">🧓🏽</div>
          <div className="spark s1">✦</div><div className="spark s2">✦</div><div className="spark s3">•</div>
        </div>
      </section>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon peach-bg"><FlameIcon /></div>
          <div><span>Current streak</span><strong>{patient.streak} days</strong><small>Keep it going! 🔥</small></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon mint-bg"><Smile size={21} /></div>
          <div><span>Today's mood</span><strong>{patient.mood}</strong><small>Feeling positive</small></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon lavender-bg"><Clock3 size={21} /></div>
          <div><span>Next reminder</span><strong>{patient.nextReminder}</strong><small>Morning medicine</small></div>
        </div>
      </div>

      <div className="section-head">
        <div><span className="eyebrow">A LITTLE BRAIN TIME</span><h3>Today's memory games</h3></div>
        <button className="text-btn" onClick={() => notify("Games library opened")}>See all <ChevronRight size={16} /></button>
      </div>

      <div className="game-grid">
        {games.slice(0, 3).map((game) => <GameCard key={game.id} game={game} onPlay={onPlay} />)}
      </div>

      <div className="lower-grid">
        <section className="panel reminder-panel">
          <div className="panel-head"><div><span className="eyebrow">UP NEXT</span><h3>Today's reminders</h3></div><button className="round-add" onClick={onAdd}><Plus size={18} /></button></div>
          <div className="reminder-list">
            {reminders.slice(0, 3).map((r) => <ReminderRow key={r.time + r.ampm} reminder={r} />)}
          </div>
          <button className="soft-btn" onClick={() => notify("All reminders opened")}>View all reminders <ChevronRight size={16} /></button>
        </section>

        <section className="panel progress-panel">
          <div className="panel-head"><div><span className="eyebrow">THIS WEEK</span><h3>Little wins</h3></div><Trophy size={22} /></div>
          <div className="progress-ring-wrap">
            <div className="progress-ring"><strong>72%</strong><span>weekly goal</span></div>
            <div className="progress-copy"><strong>You're doing great!</strong><p>4 of 5 planned sessions are complete.</p><div className="mini-bars"><i/><i/><i/><i/><i/></div></div>
          </div>
          <div className="encourage"><Star size={16} fill="currentColor" /> Consistency is more important than perfection.</div>
        </section>
      </div>

      <section className="panel activity-panel">
        <div className="panel-head"><div><span className="eyebrow">RECENTLY</span><h3>Activity</h3></div><button className="text-btn" onClick={() => notify("Full activity history opened")}>View history <ChevronRight size={16} /></button></div>
        {activity.map((a) => <div className="activity-row" key={a.title}><span className="activity-emoji">{a.icon}</span><div><strong>{a.title}</strong><span>{a.time}</span></div><b>{a.score}</b></div>)}
      </section>
    </div>
  );
}

function GamesPage({ onPlay }) {
  return (
    <div className="content">
      <section className="page-intro">
        <div><span className="eyebrow">PLAY • REMEMBER • SMILE</span><h2>Choose a game for {patient.name}</h2><p>Short, friendly activities designed to keep the mind active without feeling like a test.</p></div>
        <div className="intro-illustration">🧠✨</div>
      </section>
      <div className="game-grid game-grid-large">
        {games.map((game) => <GameCard key={game.id} game={game} onPlay={onPlay} />)}
      </div>
      <section className="tip-card"><Lightbulb size={24}/><div><strong>Caregiver tip</strong><p>Celebrate effort rather than scores. A warm “well done!” can make cognitive practice feel like play.</p></div></section>
    </div>
  );
}

function RemindersPage({ onAdd }) {
  return (
    <div className="content">
      <section className="page-intro">
        <div><span className="eyebrow">GENTLE NUDGES</span><h2>Today's rhythm</h2><p>Keep important routines simple, visible and reassuring.</p></div>
        <button className="primary-btn" onClick={onAdd}><Plus size={18}/> Add reminder</button>
      </section>
      <div className="timeline">
        {reminders.map((r, i) => (
          <div className="timeline-item" key={r.time + r.ampm}>
            <div className="timeline-time"><strong>{r.time}</strong><span>{r.ampm}</span></div>
            <div className={`timeline-dot ${i % 2 ? "mint" : ""}`}>{r.icon}</div>
            <div className="timeline-card"><div><strong>{r.title}</strong><span>{r.note}</span></div><button className="small-pill">Edit</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressPage() {
  return (
    <div className="content">
      <section className="page-intro">
        <div><span className="eyebrow">CELEBRATE THE JOURNEY</span><h2>{patient.name}'s progress</h2><p>Simple trends to help caregivers notice patterns and celebrate consistency.</p></div>
        <div className="big-score"><Trophy size={20}/><strong>72</strong><span>weekly score</span></div>
      </section>
      <div className="progress-cards">
        <div className="panel chart-panel"><div className="panel-head"><div><span className="eyebrow">LAST 7 DAYS</span><h3>Game activity</h3></div><Gamepad2 size={22}/></div><div className="chart"><div className="gridline g1"/><div className="gridline g2"/><div className="gridline g3"/>{[42,58,50,73,64,82,92].map((v,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:`${v}%`}}/><span>{["M","T","W","T","F","S","S"][i]}</span></div>)}</div></div>
        <div className="panel insight-panel"><div className="panel-head"><div><span className="eyebrow">A HAPPY THOUGHT</span><h3>What stands out</h3></div><Heart size={22}/></div><div className="insight-bubble">🌼 <strong>Word Garden</strong> is currently the favourite. Ananya has completed it 3 times this week.</div><div className="metric"><span>Game completion</span><strong>81%</strong></div><div className="metric"><span>Sessions this week</span><strong>4 / 5</strong></div><div className="metric"><span>Best streak</span><strong>6 days 🔥</strong></div></div>
      </div>
    </div>
  );
}

function GameCard({ game, onPlay }) {
  return (
    <article className={`game-card ${game.color}`}>
      <div className="game-top"><span className="game-icon">{game.icon}</span><span className="duration"><Clock3 size={13}/> {game.duration}</span></div>
      <h4>{game.title}</h4><p>{game.subtitle}</p>
      <div className="game-progress"><span style={{width:`${game.progress}%`}}/></div>
      <div className="game-bottom"><small>{game.progress}% familiar</small><button onClick={onPlay}>Play <ChevronRight size={15}/></button></div>
    </article>
  );
}

function ReminderRow({ reminder }) {
  return <div className="reminder-row"><span className="reminder-icon">{reminder.icon}</span><div><strong>{reminder.title}</strong><span>{reminder.note}</span></div><time>{reminder.time} <small>{reminder.ampm}</small></time></div>;
}

function AddReminder({ onClose, onSave }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={19}/></button>
        <div className="modal-icon">🔔</div>
        <span className="eyebrow">NEW REMINDER</span>
        <h3>Add a gentle reminder</h3>
        <label>What should we remember?</label>
        <input placeholder="e.g. Take morning medicine" />
        <div className="two-inputs"><div><label>Time</label><input type="time" defaultValue="10:30"/></div><div><label>Repeat</label><select><option>Every day</option><option>Weekdays</option><option>Once</option></select></div></div>
        <button className="primary-btn full" onClick={onSave}>Save reminder <CheckCircle2 size={18}/></button>
      </div>
    </div>
  );
}

function FlameIcon() {
  return <span style={{fontSize: "20px"}}>🔥</span>;
}

createRoot(document.getElementById("root")).render(<App />);
