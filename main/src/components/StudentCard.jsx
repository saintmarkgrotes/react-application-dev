import { useState } from "react";
import Avatar from "./Avatar";
import Badge from "./Badge";
import "./StudentCard.css";

/**
 * StudentCard — reusable card displaying one student's info
 * Props:
 *  student     {object}  student data object from JSON
 *  colorIndex  {number}  palette index passed to Avatar
 *  isSelected  {boolean} whether this card is expanded
 *  onSelect    {func}    callback when card is clicked
 */
const StudentCard = ({ student, colorIndex, isSelected, onSelect }) => {
  const gwaDisplay = student.gwa.toFixed(2);
  const statusVariant = student.status === "Dean's Lister" ? "success" : "neutral";

  return (
    <article
      className={`student-card ${isSelected ? "student-card--expanded" : ""}`}
      onClick={() => onSelect(student.id)}
    >
      <div className="student-card__header">
        <Avatar initials={student.avatar} colorIndex={colorIndex} />

        <div className="student-card__meta">
          <h2 className="student-card__name">{student.nickname}</h2>
          <p className="student-card__course">
            {student.course} · Y{student.year}
          </p>
          <div className="student-card__badges">
            <Badge label={student.status} variant={statusVariant} />
            <Badge label={`GWA ${gwaDisplay}`} variant="accent" />
          </div>
        </div>

        <div className="student-card__toggle">
          <span className={`toggle-icon ${isSelected ? "toggle-icon--open" : ""}`}>▾</span>
        </div>
      </div>

      {isSelected && (
        <div className="student-card__body">
          <p className="student-card__fullname">{student.name}</p>
          <p className="student-card__bio">{student.bio}</p>

          <div className="student-card__subjects">
            <p className="student-card__subjects-label">Current Subjects</p>
            <ul className="student-card__subject-list">
              {student.subjects.map((subj) => (
                <li key={subj} className="student-card__subject-item">
                  {subj}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
};

export default StudentCard;