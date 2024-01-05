import React, { useState, useEffect } from "react";

export const Search = ({ getSearchData, onSearchChange, autocomplete }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.value.trim().length !== 0) {
      setSearch(e.target.value);
    }
  };

  const handleOnClick = () => {
    getSearchData(search);
  };

  useEffect(() => {
    // Debounce fast typing
    const timeoutID = setTimeout(() => {
      onSearchChange(search);
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [search]);

  return (
    <div className="search-component">
      <div className="searchBar">
        <input
          type="search"
          name="q"
          id="search-input"
          placeholder="Search for a city"
          size="30"
          pattern="[A-z]"
          aria-label="Search for forecast in specific city"
          onChange={handleOnChange}
          autoComplete="off"
        />
        {search && autocomplete}
      </div>
      <button onClick={handleOnClick}>Search</button>
    </div>
  );
};
