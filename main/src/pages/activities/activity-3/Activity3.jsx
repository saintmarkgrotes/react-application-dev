import { useState, useEffect } from "react";
import StudentCard from "../../../components/StudentCard";
import SearchBar from "../../../components/SearchBar";
import Badge from "../../../components/Badge";
import "./Activity3.css";

/**
 * Activity4 — Student Directory
 * Demonstrates:
 *  - Fetching data from a public JSON file via useEffect
 *  - useState for data, loading, error, search, filter, and selected card
 *  - Reusable components: StudentCard, SearchBar, Badge, Avatar
 *  - Props drilling
 */
const Activity3 = () => {
  const [students, setStudents]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [filterYear, setFilterYear] = useState("All");
  const [selectedId, setSelectedId] = useState(null);

  // Fetch JSON from /public on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/students.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Derived: unique year levels for filter buttons
  const years = ["All", ...new Set(students.map((s) => `Year ${s.year}`).sort())];

  // Derived: filtered list based on search + year filter
  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nickname.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase());

    const matchYear =
      filterYear === "All" || `Year ${s.year}` === filterYear;

    return matchSearch && matchYear;
  });

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Stats derived from data
  const deanListers = students.filter((s) => s.status === "Dean's Lister").length;
  const avgGwa = students.length
    ? (students.reduce((sum, s) => sum + s.gwa, 0) / students.length).toFixed(2)
    : "—";

  return (
    <main className="a4-page">
      {/* Page header */}
      <header className="a4-header">
        <p className="a4-eyebrow">Activity 4 · React Hooks &amp; JSON</p>
        <h1 className="a4-title">Student Directory</h1>
        <p className="a4-subtitle">
          Data loaded from <code>/public/students.json</code> using{" "}
          <code>useEffect</code> &amp; <code>useState</code>
        </p>
      </header>

      {/* Stats bar (only when data is loaded) */}
      {!loading && !error && (
        <div className="a4-stats">
          <div className="a4-stat">
            <span className="a4-stat__number">{students.length}</span>
            <span className="a4-stat__label">Students</span>
          </div>
          <div className="a4-stat-divider" />
          <div className="a4-stat">
            <span className="a4-stat__number">{deanListers}</span>
            <span className="a4-stat__label">Dean's Listers</span>
          </div>
          <div className="a4-stat-divider" />
          <div className="a4-stat">
            <span className="a4-stat__number">{avgGwa}</span>
            <span className="a4-stat__label">Avg GWA</span>
          </div>
        </div>
      )}

      {/* Controls */}
      {!loading && !error && (
        <div className="a4-controls">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, nickname, or course…"
          />

          <div className="a4-filters">
            {years.map((yr) => (
              <button
                key={yr}
                className={`a4-filter-btn ${filterYear === yr ? "a4-filter-btn--active" : ""}`}
                onClick={() => setFilterYear(yr)}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content area */}
      <section className="a4-content">
        {loading && (
          <div className="a4-skeleton-list">
            {[1, 2, 3].map((n) => (
              <div key={n} className="a4-skeleton-card">
                <div className="a4-skeleton a4-skeleton--circle" />
                <div className="a4-skeleton-lines">
                  <div className="a4-skeleton" style={{ width: "55%" }} />
                  <div className="a4-skeleton" style={{ width: "40%", height: "0.7em" }} />
                  <div className="a4-skeleton" style={{ width: "70%", height: "0.7em" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="a4-error">
            <p className="a4-error__title">Failed to load data</p>
            <p className="a4-error__msg">{error}</p>
            <p className="a4-error__hint">
              Make sure <code>students.json</code> is placed in the{" "}
              <code>/public</code> folder.
            </p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="a4-empty">
            <p>No students match your search.</p>
            <button className="a4-clear-btn" onClick={() => { setSearch(""); setFilterYear("All"); }}>
              Clear filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="a4-grid">
            {filtered.map((student, idx) => (
              <StudentCard
                key={student.id}
                student={student}
                colorIndex={student.id - 1}
                isSelected={selectedId === student.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer note */}
      <footer className="a4-footer">
        <Badge label="useState" variant="accent" />
        <Badge label="useEffect" variant="accent" />
        <Badge label="Props" variant="neutral" />
        <Badge label="JSON Fetch" variant="success" />
        <Badge label="Reusable Components" variant="success" />
      </footer>
    </main>
  );
};

export default Activity3;