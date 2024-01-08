import React, { forwardRef } from "react";

const Autocomplete = forwardRef(function Autocomplete(
  { searchResult, setSearchResult, setPosition, autocompleteOpen },
  ref,
) {
  const autocomplete = searchResult.map((result, key) => {
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
    <div
      className={`autocomplete-container ${
        autocompleteOpen ? "open" : "closed"
      }`}
      ref={ref}
    >
      <ul className="autocomplete-list">{autocomplete}</ul>
      {/* <p>autocomplete</p> */}
    </div>
  );
});

export default Autocomplete;
