import { useState } from "react";

const Searchbar = ({ handleFormSubmit }) => {
  const [inputQuery, setInputQuery] = useState("");

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit(inputQuery);
      }}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
      </form>
    </header>
  );
};
export default Searchbar;