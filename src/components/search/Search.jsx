import React, { useState, useEffect, useRef, useContext } from "react";
import { ForecastContext } from "../../contexts/forecast-context";
// import { useForecast } from "../../contexts/forecast-context";

export const Search = ({
  getSearchData,
  onSearchChange,
  setAutocompleteOpen,
  autocomplete,
}) => {
  // const { user, setuser } = useContext(ForecastContext);
  // const { currentWeather } = useForecast();
  // console.log(currentWeather);

  const [search, setSearch] = useState(null);
  const inputRef = useRef();

  const handleOnChange = (e) => {
    e.preventDefault();

    // Check if search term matches input pattern and value not empty.
    if (inputRef.current.reportValidity() && e.target.value.length !== 0) {
      setSearch(e.target.value.trim());
    } else {
      // Reset search when input-elements value is empty.
      setSearch(null);
      setAutocompleteOpen(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // setuser({ search });

    // Check if search term matches input pattern.
    if (inputRef.current.checkValidity() && search !== null) {
      getSearchData(search.trim());
      inputRef.current.value = null;
      setAutocompleteOpen(false);
      setSearch(null);
    }
  };

  // Show autocomplete if search field isn't empty after click outside.
  const showAutocomplete = () => {
    if (search !== null) {
      setAutocompleteOpen(true);
    }
  };

  // Debounce fast typing to hinder quick API-calls.
  useEffect(() => {
    if (search !== null && search.length !== 0) {
      const timeoutID = setTimeout(() => {
        onSearchChange(search);
      }, 1000);
      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [search]);

  return (
    <div>
      <form className="search-component" onSubmit={handleOnSubmit}>
        <div className="searchBar">
          <input
            type="search"
            name="q"
            id="search"
            placeholder="Search city name using only letters"
            size="30"
            maxLength="30"
            // pattern="^[a-zA-Z_]+( [a-zA-Z_]+)*$"
            pattern="^[A-Za-z\s]*$"
            aria-label="Search for forecast in specific city"
            onChange={handleOnChange}
            autoComplete="off"
            onFocus={showAutocomplete}
            ref={inputRef}
            // value={search}
          />
          {search && autocomplete}
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
