import React from "react";
import { useSearchContext } from "../../../services/contexts/search-context";

const SearchDisplay = ({
  children,
  handleOnSubmit,
  handleOnChange,
  inputRef,
  search,
}) => {
  const { setAutocompleteOpen } = useSearchContext();
  // Show autocomplete if the search input value isn't null after click outside.
  const showAutocomplete = () => {
    if (search !== null) {
      setAutocompleteOpen();
    }
  };

  return (
    <div className="search">
      <form className="search-component" onSubmit={handleOnSubmit}>
        <div className="searchBar">
          <input
            type="search"
            name="q"
            id="search"
            placeholder="Search city name using only letters"
            size="30"
            maxLength="30"
            pattern="^[A-Za-z\s]*$"
            aria-label="Search for forecast in specific city"
            onChange={handleOnChange}
            autoComplete="off"
            onFocus={showAutocomplete}
            ref={inputRef}
          />
          {search && children}
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchDisplay;
