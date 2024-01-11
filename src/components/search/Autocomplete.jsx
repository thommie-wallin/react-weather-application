import React, { forwardRef } from "react";

const Autocomplete = forwardRef(function Autocomplete(
  {
    searchResult,
    setSearchResult,
    setPosition,
    autocompleteOpen,
    autocompleteIsLoading,
  },
  ref,
) {
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
          setSearchResult({});
          document.getElementById("search-input").value = null;
        }}
      >
        {result.name}, {result.countryCode}
      </li>
    );
  });

  //! Ska jag använda "Object.keys(searchResult).length > 0 &&" för att hantera om "user canccelled request" hindrar searchResult från att skickas ned tom vid abortcontroller().signal abort.

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
