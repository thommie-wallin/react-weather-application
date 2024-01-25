import React, { forwardRef, useState } from "react";
import { useForecastContext } from "../../services/contexts/forecast-context";
import { useSearchContext } from "../../services/contexts/search-context";

const Autocomplete = forwardRef(function Autocomplete(
  {
    props,
    // searchResult,
    // setSearchResult,
    // setPosition,
    // autocompleteOpen,
    // autocompleteIsLoading,
  },
  ref,
) {
  const { setPosition } = useForecastContext();
  const {
    searchResult,
    setSearchResult,
    autocompleteOpen,
    autocompleteIsLoading,
    setAutocompleteOpen,
    setAutocompleteClose,
  } = useSearchContext();
  // const [searchResult, setSearchResult] = useState({});
  // const [autocompleteOpen, setAutocompleteOpen] = useState(false);

  const autocomplete = searchResult.data?.map((result, key) => {
    return (
      <li
        className="autocomplete-list-item"
        key={key}
        onClick={(e) => {
          e.preventDefault();
          setPosition({
            latitude: result.latitude,
            longitude: result.longitude,
          });
          //! Doesn't seem to clear searchresult-state as it should.
          setSearchResult({});
          document.getElementById("search").value = null;
        }}
      >
        {result.name}, {result.countryCode}
      </li>
    );
  });

  return (
    <div
      className={`autocomplete-container ${
        autocompleteOpen ? "open" : "closed"
      }`}
      ref={ref}
    >
      {autocompleteIsLoading ? (
        <ul className="autocomplete-list">
          <li className="list-item-not-found">Loading...</li>
        </ul>
      ) : (
        <ul className="autocomplete-list">
          {searchResult.data?.length > 0 ? (
            autocomplete
          ) : (
            <li className="list-item-not-found">No result found</li>
          )}
        </ul>
      )}
    </div>
  );
});

export default Autocomplete;
