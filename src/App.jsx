import React, { useState } from "react";

import {
  Bell,
  Brain,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  Home,
  Image,
  Menu,
  MessageCircle,
  Plus,
  Sparkles,
  Sun,
  UserRound,
  X,
  Smile,
  Pill,
  Footprints,
  BookOpen,
  Gamepad2,
  Leaf,
  Mic,
  Settings,
  Search,
  Star,
  ArrowUpRight
} from "lucide-react";

import {
  caregiverData,
  reminders,
  games,
  memories,
  weeklyMood,
  caregiverNotes
} from "./data";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [completedReminders, setCompletedReminders] = useState(
    reminders.reduce((acc, reminder) => {
      acc[reminder.id] = reminder.completed;
      return acc;
    }, {})
  );

  const [selectedGame, setSelectedGame] = useState(null);

  const toggleReminder = (id) => {
    setCompletedReminders((previous) => ({
      ...previous,
      [id]: !previous[id]
    }));
  };

  const navigation = [
    {
      id: "home",
      label: "Overview",
      icon: Home
    },
    {
      id: "memory",
      label: "Memory Care",
      icon: Brain
    },
    {
      id: "games",
      label: "Brain Games",
      icon: Gamepad2
    },
    {
      id: "memories",
      label: "Memories",
      icon: Image
    },
    {
      id: "care",
      label: "Daily Care",
      icon: Heart
    }
  ];

  const changePage = (page) => {
    setActivePage(page);
    setMobileMenu(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="app">

      {/* Mobile menu overlay */}
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>

        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-icon">
              <Brain size={25} strokeWidth={2.5} />
            </div>

            <div>
              <h1>Smaran</h1>
              <span>caregiver</span>
            </div>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="profile-mini">
          <div className="avatar avatar-small">
            {caregiverData.patient.avatar}
          </div>

          <div>
            <strong>{caregiverData.patient.name}</strong>
            <span>{caregiverData.patient.age} years old</span>
          </div>

          <span className="online-dot" />
        </div>

        <nav className="navigation">
          <p className="nav-label">CARE SPACE</p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-item ${
                  activePage === item.id ? "active" : ""
                }`}
                onClick={() => changePage(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>

                {activePage === item.id && (
                  <ChevronRight
                    size={17}
                    className="nav-arrow"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">

          <div className="support-card">
            <div className="support-icon">
              <Sparkles size={19} />
            </div>

            <div>
              <strong>Need a little help?</strong>
              <p>
                We're here whenever you need us.
              </p>
            </div>
          </div>

          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>

          <div className="region-badge">
            <span>🌿</span>
            Made for families across
            <strong>North East India</strong>
          </div>

        </div>
      </aside>

      {/* Main */}
      <main className="main">

        {/* Top navigation */}
        <header className="topbar">

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={24} />
          </button>

          <div className="breadcrumb">
            <span>Smaran</span>
            <ChevronRight size={15} />
            <strong>
              {navigation.find((n) => n.id === activePage)?.label}
            </strong>
          </div>

          <div className="top-actions">

            <button className="icon-button">
              <Search size={20} />
            </button>

            <button className="notification-button">
              <Bell size={20} />
              <span />
            </button>

            <div className="caregiver-chip">
              <div className="avatar avatar-tiny">
                A
              </div>

              <div>
                <strong>{caregiverData.caregiverName}</strong>
                <small>Caregiver</small>
              </div>
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}

        {activePage === "home" && (
          <HomePage
            changePage={changePage}
            completedReminders={completedReminders}
            toggleReminder={toggleReminder}
          />
        )}

        {activePage === "memory" && (
          <MemoryPage changePage={changePage} />
        )}

        {activePage === "games" && (
          <GamesPage
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
          />
        )}

        {activePage === "memories" && (
          <MemoriesPage />
        )}

        {activePage === "care" && (
          <CarePage
            completedReminders={completedReminders}
            toggleReminder={toggleReminder}
          />
        )}

      </main>
    </div>
  );
}


/* =====================================================
   HOME PAGE
===================================================== */

function HomePage({
  changePage,
  completedReminders,
  toggleReminder
}) {
  const completedCount = Object.values(
    completedReminders
  ).filter(Boolean).length;

  return (
    <div className="page">

      {/* Hero */}
      <section className="welcome-section">

        <div className="welcome-copy">

          <div className="greeting">
            <Sun size={18} />
            <span>Good morning, Ananya!</span>
          </div>

          <h2>
            Let's make today
            <span> a happy one.</span>
          </h2>

          <p>
            A little reminder, a little play,
            and lots of familiar memories.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={() => changePage("games")}
            >
              <Brain size={19} />
              Start a brain game
            </button>

            <button
              className="soft-button"
              onClick={() => changePage("memories")}
            >
              <Image size={18} />
              View memories
            </button>
          </div>

        </div>

        <div className="hero-illustration">

          <div className="bubble bubble-one" />
          <div className="bubble bubble-two" />
          <div className="bubble bubble-three" />

          <div className="sun-circle">
            ☀️
          </div>

          <div className="hero-person">
            👵
          </div>

          <div className="floating-note note-one">
            🧠
          </div>

          <div className="floating-note note-two">
            ❤️
          </div>

          <div className="floating-note note-three">
            🌸
          </div>

        </div>

      </section>


      {/* Stats */}
      <section className="stats-grid">

        <div className="stat-card stat-yellow">

          <div className="stat-icon">
            <Brain size={23} />
          </div>

          <div>
            <span>Brain activities</span>
            <strong>12</strong>
            <small>This month</small>
          </div>

          <ArrowUpRight size={18} className="stat-arrow" />

        </div>


        <div className="stat-card stat-pink">

          <div className="stat-icon">
            <Heart size={23} />
          </div>

          <div>
            <span>Current mood</span>
            <strong>😊 Happy</strong>
            <small>Feeling good today</small>
          </div>

        </div>


        <div className="stat-card stat-green">

          <div className="stat-icon">
            <Star size={23} />
          </div>

          <div>
            <span>Care streak</span>
            <strong>7 days</strong>
            <small>Keep it going!</small>
          </div>

        </div>

      </section>


      {/* Main dashboard grid */}
      <section className="dashboard-grid">

        {/* Reminders */}
        <div className="dashboard-card reminders-card">

          <div className="card-heading">

            <div>
              <div className="section-kicker">
                <Clock3 size={14} />
                TODAY'S ROUTINE
              </div>

              <h3>Daily reminders</h3>
            </div>

            <span className="completion-pill">
              {completedCount}/{reminders.length} done
            </span>

          </div>

          <div className="reminder-list">

            {reminders.map((reminder) => (
              <ReminderRow
                key={reminder.id}
                reminder={reminder}
                completed={completedReminders[reminder.id]}
                onToggle={() => toggleReminder(reminder.id)}
              />
            ))}

          </div>

          <button
            className="view-all-button"
            onClick={() => changePage("care")}
          >
            View full routine
            <ChevronRight size={17} />
          </button>

        </div>


        {/* Mood */}
        <div className="dashboard-card mood-card">

          <div className="card-heading">
            <div>
              <div className="section-kicker">
                <Smile size={14} />
                WELL-BEING
              </div>

              <h3>Mood this week</h3>
            </div>

            <button className="more-button">
              •••
            </button>
          </div>

          <div className="mood-main">
            <div className="big-mood">
              😊
            </div>

            <div>
              <strong>Feeling happy</strong>
              <p>
                A lovely week so far.
              </p>
            </div>
          </div>

          <div className="mood-chart">

            {weeklyMood.map((item) => (
              <div className="mood-day" key={item.day}>

                <div className="mood-bar-container">
                  <div
                    className="mood-bar"
                    style={{
                      height: `${item.score * 15}px`
                    }}
                  />
                </div>

                <span>{item.mood}</span>
                <small>{item.day}</small>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* Lower section */}
      <section className="lower-grid">

        {/* Brain games */}
        <div className="dashboard-card games-preview">

          <div className="card-heading">

            <div>
              <div className="section-kicker">
                <Gamepad2 size={14} />
                COGNITIVE CARE
              </div>

              <h3>Today's brain play</h3>
            </div>

            <button
              className="text-button"
              onClick={() => changePage("games")}
            >
              See all
              <ChevronRight size={16} />
            </button>

          </div>

          <div className="game-preview-list">

            {games.slice(0, 3).map((game) => (
              <div
                className={`game-small ${game.color}`}
                key={game.id}
              >

                <div className="game-emoji">
                  {game.icon}
                </div>

                <div className="game-info">
                  <strong>{game.title}</strong>
                  <span>{game.duration} · {game.difficulty}</span>
                </div>

                <button
                  onClick={() => changePage("games")}
                  className="play-button"
                >
                  <ChevronRight size={17} />
                </button>

              </div>
            ))}

          </div>

        </div>


        {/* Memory */}
        <div className="dashboard-card memory-preview">

          <div className="memory-decoration">
            🌼
          </div>

          <div className="section-kicker">
            <Image size={14} />
            FAMILIAR MEMORIES
          </div>

          <h3>
            A memory to
            <br />
            smile about.
          </h3>

          <p>
            Look through familiar photos
            and stories together.
          </p>

          <button
            className="memory-button"
            onClick={() => changePage("memories")}
          >
            Open memory book
            <ArrowUpRight size={17} />
          </button>

        </div>

      </section>


      {/* Notes */}
      <section className="notes-card dashboard-card">

        <div className="notes-title">

          <div className="notes-icon">
            <MessageCircle size={20} />
          </div>

          <div>
            <div className="section-kicker">
              CAREGIVER NOTES
            </div>

            <h3>Recent observations</h3>
          </div>

        </div>

        <div className="notes-list">

          {caregiverNotes.map((note) => (
            <div className="note-item" key={note.id}>

              <div className="note-dot" />

              <div>
                <span>{note.date}</span>
                <p>{note.text}</p>
              </div>

            </div>
          ))}

        </div>

        <button className="add-note-button">
          <Plus size={17} />
          Add a note
        </button>

      </section>

    </div>
  );
}


/* =====================================================
   REMINDER ROW
===================================================== */

function ReminderRow({
  reminder,
  completed,
  onToggle
}) {
  const icons = {
    medicine: Pill,
    brain: Brain,
    food: Leaf,
    walk: Footprints
  };

  const Icon = icons[reminder.type] || Clock3;

  return (
    <div
      className={`reminder-row ${
        completed ? "completed" : ""
      }`}
    >

      <button
        className={`check-button ${
          completed ? "checked" : ""
        }`}
        onClick={onToggle}
      >
        {completed && <Check size={15} />}
      </button>

      <div className={`reminder-icon ${reminder.type}`}>
        <Icon size={18} />
      </div>

      <div className="reminder-content">

        <strong>{reminder.title}</strong>

        <span>
          {reminder.description}
        </span>

      </div>

      <div className="reminder-time">
        {reminder.time}
      </div>

    </div>
  );
}


/* =====================================================
   MEMORY PAGE
===================================================== */

function MemoryPage({ changePage }) {
  return (
    <div className="page">

      <PageHeader
        eyebrow="MEMORY CARE"
        title="Small moments matter."
        description="Simple tools to help keep familiar people, places and routines close."
        icon={<Brain size={22} />}
      />

      <section className="memory-care-hero">

        <div className="memory-care-text">

          <div className="cute-label">
            🧠 Gentle cognitive support
          </div>

          <h3>
            Let's exercise the
            <span> memory, together.</span>
          </h3>

          <p>
            Short, enjoyable activities can make
            everyday care feel more engaging.
          </p>

          <button
            className="primary-button"
            onClick={() => changePage("games")}
          >
            <Gamepad2 size={18} />
            Explore brain games
          </button>

        </div>

        <div className="memory-brain-art">
          <div className="brain-circle">
            🧠
          </div>

          <span className="art-star star-a">✦</span>
          <span className="art-star star-b">✦</span>
          <span className="art-heart">♥</span>
        </div>

      </section>


      <section className="three-care-cards">

        <CareFeature
          icon={<Brain />}
          emoji="🧩"
          title="Cognitive games"
          text="Fun activities designed around recognition, matching and recall."
        />

        <CareFeature
          icon={<Image />}
          emoji="📸"
          title="Memory book"
          text="Keep familiar photographs, people and stories in one place."
        />

        <CareFeature
          icon={<CalendarDays />}
          emoji="🌱"
          title="Daily routine"
          text="Gentle reminders help make everyday activities easier to follow."
        />

      </section>

    </div>
  );
}


/* =====================================================
   GAMES PAGE
===================================================== */

function GamesPage({
  selectedGame,
  setSelectedGame
}) {
  return (
    <div className="page">

      <PageHeader
        eyebrow="BRAIN PLAY"
        title="Let's play!"
        description="Short and cheerful activities for memory, attention and recognition."
        icon={<Gamepad2 size={22} />}
      />

      <div className="games-banner">

        <div>
          <span className="banner-small">
            TODAY'S SUGGESTION ✨
          </span>

          <h3>
            Five minutes of play
            <br />
            can brighten the day.
          </h3>

          <p>
            Keep activities simple, familiar and fun.
          </p>
        </div>

        <div className="banner-character">
          🧓
        </div>

      </div>


      <div className="games-grid">

        {games.map((game) => (
          <div
            className={`game-card game-${game.color}`}
            key={game.id}
          >

            <div className="game-card-top">
              <div className="large-game-icon">
                {game.icon}
              </div>

              <span className="difficulty">
                {game.difficulty}
              </span>
            </div>

            <h3>{game.title}</h3>

            <p>{game.description}</p>

            <div className="game-card-bottom">

              <span>
                <Clock3 size={15} />
                {game.duration}
              </span>

              <button
                className="game-start"
                onClick={() => setSelectedGame(game)}
              >
                Play
                <ChevronRight size={16} />
              </button>

            </div>

          </div>
        ))}

      </div>


      {/* Game popup */}
      {selectedGame && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="game-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedGame(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-emoji">
              {selectedGame.icon}
            </div>

            <span className="cute-label">
              🎮 Prototype activity
            </span>

            <h2>{selectedGame.title}</h2>

            <p>
              This is where the actual interactive
              cognitive game will live.
            </p>

            <div className="prototype-message">
              <Sparkles size={22} />

              <span>
                Game interface coming next!
              </span>
            </div>

            <button
              className="primary-button modal-button"
              onClick={() => setSelectedGame(null)}
            >
              <Check size={18} />
              Got it
            </button>

          </div>
        </div>
      )}

    </div>
  );
}


/* =====================================================
   MEMORIES PAGE
===================================================== */

function MemoriesPage() {
  return (
    <div className="page">

      <PageHeader
        eyebrow="MEMORY BOOK"
        title="Favourite memories."
        description="Familiar photographs and stories can help make conversations easier and more meaningful."
        icon={<Image size={22} />}
      />

      <div className="memory-toolbar">

        <div>
          <strong>Anima's memory book</strong>
          <span>3 saved memories</span>
        </div>

        <button className="primary-button">
          <Plus size={18} />
          Add memory
        </button>

      </div>


      <div className="memory-grid">

        {memories.map((memory, index) => (
          <div
            className={`memory-card memory-${index + 1}`}
            key={memory.id}
          >

            <div className="memory-image">
              <span>{memory.emoji}</span>

              <div className="memory-image-dots">
                •••
              </div>
            </div>

            <div className="memory-card-content">

              <span>{memory.date}</span>

              <h3>{memory.title}</h3>

              <p>{memory.description}</p>

              <button>
                Open memory
                <ChevronRight size={16} />
              </button>

            </div>

          </div>
        ))}


        <button className="add-memory-card">

          <div className="add-memory-icon">
            <Plus size={25} />
          </div>

          <strong>Add a new memory</strong>

          <span>
            Photo, story or favourite place
          </span>

        </button>

      </div>


      <div className="memory-tip">

        <div className="tip-icon">
          💡
        </div>

        <div>
          <strong>Care tip</strong>

          <p>
            Try asking simple questions about
            familiar photographs. There's no need
            to rush — let the memory come naturally.
          </p>
        </div>

      </div>

    </div>
  );
}


/* =====================================================
   CARE PAGE
===================================================== */

function CarePage({
  completedReminders,
  toggleReminder
}) {
  return (
    <div className="page">

      <PageHeader
        eyebrow="DAILY CARE"
        title="A gentle routine."
        description="Keep important everyday activities visible, simple and easy to follow."
        icon={<Heart size={22} />}
      />

      <div className="care-summary">

        <div className="care-summary-main">

          <div className="big-check">
            <Check size={29} />
          </div>

          <div>
            <span>Today's progress</span>
            <strong>
              {Object.values(completedReminders).filter(Boolean).length}
              {" "}of {reminders.length} completed
            </strong>
          </div>

        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${
                (Object.values(completedReminders).filter(Boolean).length /
                  reminders.length) *
                100
              }%`
            }}
          />
        </div>

      </div>


      <div className="care-layout">

        <div className="care-routine dashboard-card">

          <div className="card-heading">

            <div>
              <div className="section-kicker">
                <CalendarDays size={14} />
                DAILY ROUTINE
              </div>

              <h3>Today's schedule</h3>
            </div>

            <button className="add-small">
              <Plus size={16} />
              Add
            </button>

          </div>

          <div className="full-reminder-list">

            {reminders.map((reminder) => (
              <ReminderRow
                key={reminder.id}
                reminder={reminder}
                completed={completedReminders[reminder.id]}
                onToggle={() =>
                  toggleReminder(reminder.id)
                }
              />
            ))}

          </div>

        </div>


        <div className="care-side">

          <div className="care-side-card purple">

            <div className="side-card-icon">
              💊
            </div>

            <span>Medicine</span>

            <strong>1 upcoming</strong>

            <p>
              Next at 8:00 PM
            </p>

          </div>


          <div className="care-side-card orange">

            <div className="side-card-icon">
              🚶
            </div>

            <span>Movement</span>

            <strong>15 min walk</strong>

            <p>
              Evening activity
            </p>

          </div>


          <div className="care-side-card teal">

            <div className="side-card-icon">
              🥗
            </div>

            <span>Nutrition</span>

            <strong>3 meals</strong>

            <p>
              Keep hydrated today
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   SMALL COMPONENTS
===================================================== */

function PageHeader({
  eyebrow,
  title,
  description,
  icon
}) {
  return (
    <section className="page-header">

      <div className="page-header-icon">
        {icon}
      </div>

      <div>
        <div className="section-kicker">
          {eyebrow}
        </div>

        <h2>{title}</h2>

        <p>{description}</p>
      </div>

    </section>
  );
}


function CareFeature({
  icon,
  emoji,
  title,
  text
}) {
  return (
    <div className="care-feature">

      <div className="feature-icon">
        {emoji}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button>
        Explore
        <ChevronRight size={16} />
      </button>

    </div>
  );
}

export default App;