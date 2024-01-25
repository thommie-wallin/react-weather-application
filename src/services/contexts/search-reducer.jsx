export const initialState = {
  searchResult: {},
  searchTermCache: null,
  autocompleteOpen: false,
  autocompleteIsLoading: false,
};

export const searchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_SEARCH_RESULT":
      console.log("SET_SEARCH_RESULT", payload);
      return {
        ...state,
        searchResult: payload.searchData,
        searchTermCache: payload,
      };
    case "SET_AUTOCOMPLETE_OPEN":
      console.log("SET_AUTOCOMPLETE_OPEN", !state.autocompleteOpen);
      return {
        ...state,
        autocompleteOpen: true,
      };
    case "SET_AUTOCOMPLETE_CLOSE":
      console.log("SET_AUTOCOMPLETE_CLOSE", !state.autocompleteOpen);
      return {
        ...state,
        autocompleteOpen: false,
      };
    case "AUTO_LOADING_START":
      console.log("LOADING_START");
      return {
        ...state,
        autocompleteIsLoading: true,
      };
    case "AUTO_LOADING_STOP":
      console.log("LOADING_STOP");
      return {
        ...state,
        autocompleteIsLoading: false,
      };
    default:
      throw new Error(`No case for type ${type} found in searcgReducer.`);
  }
};
