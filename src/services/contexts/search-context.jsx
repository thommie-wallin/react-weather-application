import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { initialState, searchReducer } from "./search-reducer";

const SearchContext = createContext(undefined);

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within SearchContext");
  } else {
    return context;
  }
}

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const setSearchResult = useCallback((searchData) => {
    console.log(searchData);
    dispatch({
      type: "SET_SEARCH_RESULT",
      payload: {
        searchData,
      },
    });
  }, []);

  const autoLoadingStart = useCallback(() => {
    dispatch({
      type: "AUTO_LOADING_START",
    });
  }, []);

  const autoLoadingStop = useCallback(() => {
    dispatch({
      type: "AUTO_LOADING_STOP",
    });
  }, []);

  const setAutocompleteOpen = useCallback(() => {
    dispatch({
      type: "SET_AUTOCOMPLETE_OPEN",
    });
  }, []);

  const setAutocompleteClose = useCallback(() => {
    dispatch({
      type: "SET_AUTOCOMPLETE_CLOSE",
    });
  }, []);

  const value = {
    searchResult: state.searchResult,
    searchTermCache: state.searchTermCache,
    autocompleteOpen: state.autocompleteOpen,
    autocompleteIsLoading: state.autocompleteIsLoading,
    setSearchResult,
    autoLoadingStart,
    autoLoadingStop,
    setAutocompleteOpen,
    setAutocompleteClose,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
