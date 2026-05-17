import { useState, useRef, useEffect } from "react";
import "./Activity3.css";

// All 66 book IDs from bible-api.com parameterized API
const BOOK_IDS = [
  "GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT",
  "1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH",
  "EST","JOB","PSA","PRO","ECC","SNG","ISA","JER",
  "LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON",
  "MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT",
  "MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL",
  "EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT",
  "PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN",
  "JUD","REV",
];

const getDateString = () => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const Activity3 = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);

  const cardRef = useRef(null);

  async function fetchVerse() {
    setLoading(true);
    setError(false);
    setVisible(false);

    try {
      // Step 1: pick a random book, fetch its chapter list
      const bookId = BOOK_IDS[Math.floor(Math.random() * BOOK_IDS.length)];
      const bookRes = await fetch(`https://bible-api.com/data/web/${bookId}`);
      if (!bookRes.ok) throw new Error(`Book fetch failed: ${bookRes.status}`);
      const bookData = await bookRes.json();

      // Step 2: pick a random chapter from that book
      const chapters = bookData.chapters;
      const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];

      // Step 3: fetch that chapter's verses
      const chapterRes = await fetch(
        `https://bible-api.com/data/web/${bookId}/${randomChapter.chapter}`
      );
      if (!chapterRes.ok) throw new Error(`Chapter fetch failed: ${chapterRes.status}`);
      const chapterData = await chapterRes.json();

      // Step 4: pick a random verse from that chapter
      const verses = chapterData.verses;
      const v = verses[Math.floor(Math.random() * verses.length)];

      setVerse({
        text: v.text.trim(),
        reference: `${v.book} ${v.chapter}:${v.verse}`,
      });
    } catch (err) {
      console.error("fetchVerse error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => setVisible(true), 50);
    }
  }

  useEffect(() => {
    fetchVerse();
  }, []);

  const handleNewVerse = () => {
    fetchVerse();
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className="a3-page">
      <p className="a3-eyebrow">Word of the Day</p>
      <p className="a3-date">{getDateString()}</p>

      <div
        ref={cardRef}
        className={`a3-card ${visible ? "a3-fade-in" : "a3-fade-out"}`}
      >
        {loading && (
          <div className="a3-skeleton-wrap">
            <div className="a3-skeleton" style={{ width: "90%" }} />
            <div className="a3-skeleton" style={{ width: "75%" }} />
            <div className="a3-skeleton" style={{ width: "85%" }} />
            <div className="a3-skeleton" style={{ width: "60%" }} />
            <div className="a3-divider" />
            <div className="a3-skeleton" style={{ width: "38%", height: "0.85em" }} />
          </div>
        )}

        {!loading && error && (
          <p className="a3-error">
            Could not load the verse.<br />
            Please check your connection and try again.
          </p>
        )}

        {!loading && !error && verse && (
          <>
            <p className="a3-verse-text">"{verse.text}"</p>
            <div className="a3-divider" />
            <p className="a3-reference">{verse.reference}</p>
          </>
        )}
      </div>

      <button
        className="a3-btn"
        onClick={handleNewVerse}
        disabled={loading}
      >
        {loading ? "Loading…" : "New Verse"}
      </button>
    </main>
  );
};

export default Activity3;