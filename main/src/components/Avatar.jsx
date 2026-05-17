import "./Avatar.css";

/**
 * Avatar — reusable initials avatar
 * Props:
 *  initials  {string}  2-letter initials (e.g. "SM")
 *  colorIndex {number} 0-5 to pick a palette color
 */
const COLORS = [
  { bg: "#e8f4f8", text: "#2a7fa8" },
  { bg: "#f4e8f8", text: "#8a2aa8" },
  { bg: "#f8f0e8", text: "#a86a2a" },
  { bg: "#e8f8ee", text: "#2aa85a" },
  { bg: "#f8e8e8", text: "#a82a2a" },
  { bg: "#eef0f8", text: "#2a3aa8" },
];

const Avatar = ({ initials, colorIndex = 0 }) => {
  const color = COLORS[colorIndex % COLORS.length];
  return (
    <div
      className="avatar"
      style={{ backgroundColor: color.bg, color: color.text }}
    >
      {initials}
    </div>
  );
};

export default Avatar;