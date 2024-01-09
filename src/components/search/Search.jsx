import React, { useState, useEffect, useRef } from "react";

export const Search = ({
  getSearchData,
  onSearchChange,
  setAutocompleteOpen,
  autocomplete,
}) => {
  const [search, setSearch] = useState(null);
  const inputRef = useRef();

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.target.value.trim().length !== 0) {
      setSearch(e.target.value);
    } else {
      setSearch(null);
      setAutocompleteOpen(false);
    }
  };

  const handleOnClick = () => {
    getSearchData(search);
    inputRef.current.value = null;
    setAutocompleteOpen(false);
    setSearch(null);
  };

  const showAutocomplete = () => {
    if (search !== null) {
      setAutocompleteOpen(true);
    }
  };

  // Debounce fast typing to hinder API-calls.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      // console.log(search);
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
          maxLength="30"
          pattern="[A-z]"
          aria-label="Search for forecast in specific city"
          onChange={handleOnChange}
          autoComplete="off"
          onFocus={showAutocomplete}
          // onBlur={(e) => {
          //   // console.log(search);
          // }}
          ref={inputRef}
        />
        {search && autocomplete}
      </div>
      <button onClick={handleOnClick}>Search</button>
    </div>
  );
};
