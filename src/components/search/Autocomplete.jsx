import React from "react";
import { data } from "../../../json_server/searchGeoDB.json";

export const Autocomplete = ({
  searchResult,
  setSearchResult,
  setPosition,
}) => {
  const autocomplete = searchResult.data.map((result, key) => {
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
          document.getElementById("search-input").value = null;
        }}
      >
        {result.name}, {result.countryCode}
      </li>
    );
  });
  return (
    <div className="autocomplete-container">
      <ul className="autocomplete-list">{autocomplete}</ul>
    </div>
  );
};
