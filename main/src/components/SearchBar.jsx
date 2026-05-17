import "./SearchBar.css";

/**
 * SearchBar — reusable controlled search input
 * Props:
 *  value       {string}  current search string
 *  onChange    {func}    callback(newValue)
 *  placeholder {string}  input placeholder text
 */
const SearchBar = ({ value, onChange, placeholder = "Search…" }) => {
  return (
    <div className="search-bar">
      <span className="search-bar__icon">⌕</span>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;