import React, { forwardRef } from "react";

const Autocomplete = forwardRef(function Autocomplete(
  { searchResult, setSearchResult, setPosition, autocompleteOpen },
  ref,
) {
  // console.log(searchResult);
  const autocomplete = searchResult.data?.map((result, key) => {
    // console.log(result);
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
      <ul className="autocomplete-list">
        {searchResult.data?.length === 0 && (
          <li className="list-item-not-found">Not found</li>
        )}
        {autocomplete}
      </ul>
    </div>
  );
});

export default Autocomplete;
