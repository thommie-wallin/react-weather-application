import React, { useState, useEffect, useRef } from "react";
import useGetPosition from "../../hooks/useGetPosition";
import useDebounce from "../../hooks/useDebounce";
import useGetAutocompleteItems from "../../hooks/useGetAutocompleteItems";
import Autocomplete from "./Autocomplete";
import { useSearchContext } from "../../services/contexts/search-context";

export const Search = ({
  getSearchData,
  onSearchChange,
  // setAutocompleteOpen,
  autocomplete,
}) => {
  const [search, setSearch] = useState(null);
  const [submitSearch, setSubmitSearch] = useState(null);
  const debouncedSearch = useDebounce(search, 1000);
  const inputRef = useRef(submitSearch);

  const {
    searchResult,
    autocompleteOpen,
    setAutocompleteOpen,
    setAutocompleteClose,
  } = useSearchContext();
  // const [searchResult, setSearchResult] = useState({});
  // const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  // const [autocompleteIsLoading, setAutocompleteIsLoading] = useState(false);
  // const [searchTerm, setSearchTerm] = useState(null);
  let autocompleteRef = useRef();

  useGetPosition(submitSearch);

  useGetAutocompleteItems(debouncedSearch);

  const handleOnChange = (e) => {
    e.preventDefault();

    // Check if search term matches input pattern and value not empty.
    if (inputRef.current.reportValidity() && e.target.value.length !== 0) {
      setSearch(e.target.value.trim());
    } else {
      // Reset search when input-elements value is empty.
      setSearch(null);
      // setAutocompleteOpen(false);
      setAutocompleteClose();
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Check if search term matches input pattern.
    if (inputRef.current.checkValidity() && search !== null) {
      // getSearchData(search.trim());
      // useGetPosition(search.trim());
      setSubmitSearch(search.trim());
      inputRef.current.value = null;
      // setAutocompleteOpen(false);
      setAutocompleteClose();
      setSearch(null);
    }
  };

  // Show autocomplete if search field isn't empty after click outside.
  const showAutocomplete = () => {
    if (search !== null) {
      // setAutocompleteOpen(true);
      setAutocompleteOpen();
    }
  };

  // Debounce fast typing to hinder quick API-calls.
  // useEffect(() => {
  //   if (search !== null && search.length !== 0) {
  //     const timeoutID = setTimeout(() => {
  //       onSearchChange(search);
  //     }, 1000);
  //     return () => {
  //       clearTimeout(timeoutID);
  //     };
  //   }
  // }, [search]);

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
          {search && (
            <Autocomplete
              // searchResult={searchResult}
              // setSearchResult={setSearchResult}
              // setPosition={setPosition}
              // autocompleteOpen={autocompleteOpen}
              ref={autocompleteRef}
              // autocompleteIsLoading={autocompleteIsLoading}
            />
          )}
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
