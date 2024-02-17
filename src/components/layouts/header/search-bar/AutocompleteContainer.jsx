import React, { useEffect, useRef } from "react";
import { useSearchContext } from "../../../../services/contexts/search-context";

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
        <ul className="autocomplete-loading-container">
          {/* <li className="list-item-not-found">Loading...</li> */}
          <li className="autocomplete-loading-item">
            <svg
              className="autocomplete-loading-spinner"
              width="155"
              height="155"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 155 155"
            >
              <circle
                className="autocomplete-loading-spinner-circle"
                cx="77.5"
                cy="77.5"
                r="60"
                stroke="currentColor"
                strokeWidth="35"
              />
              <path
                d="M90.207 18.861A59.997 59.997 0 0 1 137.5 77.5"
                stroke="currentColor"
                strokeWidth="35"
              />
            </svg>
            <span className="autocomplete-loading-text">Loading</span>
          </li>
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
