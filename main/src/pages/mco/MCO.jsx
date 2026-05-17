import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MCO.css";

/* ── Data ── */
const ACTIVITIES = [
  {
    number: "01",
    tag: "Activity 1 · Landing Page",
    title: "React App Home",
    desc: "A simple landing page introducing team members and core project structure.",
    path: "/home",
  },
  {
    number: "02",
    tag: "Activity 2 · Authentication",
    title: "Login & Session",
    desc: "Stateful login form with localStorage session persistence and form validation.",
    path: "/login",
  },
  {
    number: "03",
    tag: "Activity 3 · Hooks & JSON",
    title: "Student Directory",
    desc: "Dynamic directory fetched from a public JSON file with search, filter, and expandable cards.",
    path: "/record",
  },
  {
    number: "04",
    tag: "Activity 4 · External API",
    title: "Word of the Day",
    desc: "Random Bible verse pulled live from bible-api.com with skeleton loading and fade transitions.",
    path: "/bible",
  },
];

const MEMBERS = [
  { name: "Grotes, Saint Mark D.",    role: "Developer" },
  { name: "Mediante, Arvin Clark G.", role: "Developer" },
  { name: "Ostulano, Janna M.",       role: "Developer" },
  { name: "Versaga, Jullever D.",     role: "Developer" },
];

const now    = new Date();
const dateStr = now.toLocaleDateString("en-US", {
  year: "numeric", month: "long", day: "numeric",
});

/* ── Sun icon (light mode indicator) ── */
const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3"  />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/* ── Moon icon (dark mode indicator) ── */
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

/* ══════════════════════════════════════════
   MCO COMPONENT
   ══════════════════════════════════════════ */
const MCO = () => {
  // Persist preference in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("mco-theme") || "dark";
  });

  // Apply data-theme attribute to <html> so CSS vars cascade everywhere
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("mco-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const isDark = theme === "dark";

  return (
    <main className="mco-page">

      {/* Decorative layers */}
      <div className="mco-grain" aria-hidden="true" />
      <div className="mco-glow"  aria-hidden="true" />

      {/* ── Theme toggle ── */}
      <button
        className="mco-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        <div className="mco-toggle__track">
          {isDark ? <SunIcon /> : <MoonIcon />}
        </div>
      </button>

      <div className="mco-inner">

        {/* ── Masthead ── */}
        <header className="mco-masthead">
          <div className="mco-masthead__left">
            <p className="mco-vol">Vol. I &nbsp;·&nbsp; React Activities</p>
            <h1 className="mco-brand">
              The <em>MCO</em>
            </h1>
            <p className="mco-tagline">
              A compilation of our React activities — from landing pages<br />
              to live APIs, all in one place.
            </p>
          </div>

          <div className="mco-masthead__right">
            <strong>BS Information Technology</strong>
            Year 2 · Group Project
            <br />
            4 Activities
            <br />

          </div>
        </header>

        {/* ── Table of contents ── */}
        <div className="mco-section-label">
          <span>Table of Contents</span>
        </div>

        <nav className="mco-list">
          {ACTIVITIES.map((act) => (
            <Link key={act.path} to={act.path} className="mco-item">
              <span className="mco-num">{act.number}</span>

              <div className="mco-item__body">
                <span className="mco-item__tag">{act.tag}</span>
                <span className="mco-item__title">{act.title}</span>
                <span className="mco-item__desc">{act.desc}</span>
              </div>

              <span className="mco-arrow">→</span>
            </Link>
          ))}
        </nav>

        {/* ── Members ── */}
        <section className="mco-members">
          <div className="mco-section-label">
            <span>Group Members</span>
          </div>

          <div className="mco-members__grid">
            {MEMBERS.map((m) => (
              <div key={m.init} className="mco-member">
                <span className="mco-member__init">{m.init}</span>
                <span className="mco-member__name">{m.name}</span>
                <span className="mco-member__role">{m.role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="mco-footer">
          <span>MCO · React App</span>
          <span className="mco-footer__dot" />
          <span>BS Information Technology</span>
          <span className="mco-footer__dot" />
          <span>{now.getFullYear()}</span>
        </footer>

      </div>
    </main>
  );
};

export default MCO;