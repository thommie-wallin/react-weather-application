import React, { forwardRef, useEffect, useRef } from "react";
import { useSearchContext } from "../../../services/contexts/search-context";

const AutocompleteContainer = ({ children }) => {
  const {
    searchResult,
    autocompleteOpen,
    setAutocompleteClose,
    autocompleteIsLoading,
  } = useSearchContext();
  let autocompleteRef = useRef();

  // Close autocomplete when click outside of search-input.
  useEffect(() => {
    let clickOutsideHandler = (e) => {
      if (
        !autocompleteRef.current?.contains(e.target) &&
        e.target.id !== "search"
      ) {
        setAutocompleteClose();
      }
    };
    document.addEventListener("click", clickOutsideHandler);
    return () => {
      document.removeEventListener("click", clickOutsideHandler);
    };
  }, []);

  return (
    <div
      className={`autocomplete-container ${
        autocompleteOpen ? "open" : "closed"
      }`}
      ref={autocompleteRef}
    >
      {autocompleteIsLoading ? (
        <ul className="autocomplete-list">
          <li className="list-item-not-found">Loading...</li>
        </ul>
      ) : (
        <ul className="autocomplete-list">
          {searchResult.data?.length > 0 ? (
            children
          ) : (
            <li className="list-item-not-found">No result found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteContainer;
