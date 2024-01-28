import React, { useState, useRef } from "react";
import useGetPosition from "../../hooks/useGetPosition";
import useDebounce from "../../hooks/useDebounce";
import useGetAutocompleteItems from "../../hooks/useGetAutocompleteItems";
import AutocompleteContainer from "../layouts/header/searchbar/AutocompleteContainer";
import { useSearchContext } from "../../services/contexts/search-context";
import SearchDisplay from "../layouts/header/searchbar/SearchDisplay";
import AutocompleteList from "../layouts/header/searchbar/AutocompleteList";

export const Search = () => {
  const [search, setSearch] = useState(null);
  const [submitSearch, setSubmitSearch] = useState(null);
  const inputRef = useRef(submitSearch);
  const { setAutocompleteClose } = useSearchContext();

  // Debounce fast typing to throttle API-calls.
  const debouncedSearch = useDebounce(search, 1000);

  // Get position for searched location (Geocoded API OpenWeatherMap).
  useGetPosition(submitSearch);

  // Get search suggestions for autocomplete-list component (GeoDB-cities API).
  useGetAutocompleteItems(debouncedSearch);

  const handleOnChange = (e) => {
    e.preventDefault();
    // Check if search term matches input pattern and value not empty.
    if (inputRef.current.reportValidity() && e.target.value.length !== 0) {
      setSearch(e.target.value.trim());
    } else {
      // Reset search when input-elements value is empty.
      setSearch(null);
      setAutocompleteClose();
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Check if search term matches input pattern.
    if (inputRef.current.checkValidity() && search !== null) {
      setSubmitSearch(search.trim());
      inputRef.current.value = null;
      setAutocompleteClose();
      setSearch(null);
    }
  };

  return (
    <SearchDisplay
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleOnChange}
      inputRef={inputRef}
      search={search}
    >
      <AutocompleteContainer>
        <AutocompleteList setSearch={setSearch} />
      </AutocompleteContainer>
    </SearchDisplay>
  );
};
