import React, { useState, useEffect, useRef } from "react";
import { getAutocompleteItems } from "../services/api/autocomplete-list";
import { useForecastContext } from "../services/contexts/forecast-context";
import { useSearchContext } from "../services/contexts/search-context";

const useGetAutocompleteItems = (searchData) => {
  const { setError } = useForecastContext();
  const {
    // searchResult,
    // searchTermCache,
    setSearchResult,
    autocompleteOpen,
    // autocompleteIsLoading,
    autoLoadingStart,
    autoLoadingStop,
    setAutocompleteOpen,
    setAutocompleteClose,
  } = useSearchContext();
  // const [searchResult, setSearchResult] = useState({});
  // const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [searchTermCache, setSearchTermCache] = useState(null);
  // const [autocompleteIsLoading, setAutocompleteIsLoading] = useState(false);
  // const [error, setError] = useState();
  const autocompleteAbortControllerRef = useRef();

  useEffect(() => {
    // Get search suggestions for autocomplete component (GeoDB-cities API).
    async function handleOnSearchChange() {
      if (searchData !== null) {
        // Check if searchdata existed before correcting validation invalid.
        if (searchData === searchTermCache) {
          // setAutocompleteOpen(true);
          setAutocompleteOpen();
          return;
        }

        // Cache search term in state
        setSearchTermCache(searchData);

        // Create new abortController() for new request.
        autocompleteAbortControllerRef.current = new AbortController();
        const signal = autocompleteAbortControllerRef.current.signal;

        // setAutocompleteIsLoading(true);
        autoLoadingStart();
        setAutocompleteOpen(true);
        try {
          const data = await getAutocompleteItems(searchData, signal);
          setSearchResult(data);
        } catch (error) {
          if (error.name === "AbortError") {
            console.error(error);
            return;
          }
          setError(error);
        } finally {
          // setAutocompleteIsLoading(false);
          autoLoadingStop();
        }
      }
    }

    if (searchData !== null && searchData.length !== 0) {
      handleOnSearchChange();
      console.log(searchData);
    }

    return () => {
      // Abort unfinished api request.
      if (autocompleteAbortControllerRef.current) {
        autocompleteAbortControllerRef.current.abort();
      }
    };
  }, [searchData]);

  // return { searchResult, autocompleteOpen, autocompleteIsLoading };
};

export default useGetAutocompleteItems;
