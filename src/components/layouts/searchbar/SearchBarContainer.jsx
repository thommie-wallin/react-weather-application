import React from "react";
import { Search } from "../../search/Search";
import { SearchProvider } from "../../../services/contexts/search-context";

const SearchBarContainer = () => {
  return (
    <SearchProvider>
      <Search />
    </SearchProvider>
  );
};

export default SearchBarContainer;
