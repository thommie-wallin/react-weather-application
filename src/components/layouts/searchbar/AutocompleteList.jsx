import React from "react";
import { useSearchContext } from "../../../services/contexts/search-context";
import { useForecastContext } from "../../../services/contexts/forecast-context";

const AutocompleteList = ({ setSearch }) => {
  const { setPosition } = useForecastContext();
  const { searchResult, setSearchResult } = useSearchContext();

  return searchResult.data?.map((result, key) => {
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
          setSearchResult({});
          setSearch(null);
          document.getElementById("search").value = null;
        }}
      >
        {result.name}, {result.countryCode}
      </li>
    );
  });
};

export default AutocompleteList;
