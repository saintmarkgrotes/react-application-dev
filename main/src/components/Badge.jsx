import "./Badge.css";

/**
 * Badge — reusable status/tag chip
 * Props:
 *  label   {string}  text to display
 *  variant {string}  "success" | "neutral" | "accent"  (default: "neutral")
 */
const Badge = ({ label, variant = "neutral" }) => {
  return (
    <span className={`badge badge--${variant}`}>
      {label}
    </span>
  );
};

export default Badge;