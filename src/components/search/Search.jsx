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

    // Check if search term matches input pattern and value not empty.
    if (inputRef.current.reportValidity() && e.target.value.length !== 0) {
      setSearch(e.target.value);
    } else {
      setSearch(null);
      setAutocompleteOpen(false);
    }
  };

  const handleOnClick = () => {
    // Check if search term matches input pattern.
    if (inputRef.current.checkValidity()) {
      getSearchData(search);
      inputRef.current.value = null;
      setAutocompleteOpen(false);
      setSearch(null);
    }
  };

  // Show autocomplete if search field isn't empty after outside click.
  const showAutocomplete = () => {
    if (search !== null) {
      setAutocompleteOpen(true);
    }
  };

  // Debounce fast typing to hinder quick API-calls.
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onSearchChange(search);
    }, 1000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [search]);

  return (
    <div>
      <form className="search-component">
        <div className="searchBar">
          <input
            type="search"
            name="q"
            id="search-input"
            placeholder="Search city name using only letters"
            size="30"
            maxLength="30"
            pattern="^[a-zA-Z_]+( [a-zA-Z_]+)*$"
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
      </form>
    </div>
  );
};
