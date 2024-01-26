import { useState, useEffect, useRef } from "react";
import { getAutocompleteItems } from "../services/api/autocomplete-list";
import { useForecastContext } from "../services/contexts/forecast-context";
import { useSearchContext } from "../services/contexts/search-context";

const useGetAutocompleteItems = (searchData) => {
  const { setError } = useForecastContext();
  const {
    setSearchResult,
    autoLoadingStart,
    autoLoadingStop,
    setAutocompleteOpen,
  } = useSearchContext();
  const [searchTermCache, setSearchTermCache] = useState(null);
  const autocompleteAbortControllerRef = useRef();

  useEffect(() => {
    // Get search suggestions for autocomplete component (GeoDB-cities API).
    async function handleOnSearchChange() {
      if (searchData !== null) {
        // Check if searchdata existed before correcting validation invalid.
        if (searchData === searchTermCache) {
          setAutocompleteOpen();
          return;
        }

        // Cache search term in state
        setSearchTermCache(searchData);

        // Create new abortController() for new request.
        autocompleteAbortControllerRef.current = new AbortController();
        const signal = autocompleteAbortControllerRef.current.signal;

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
          autoLoadingStop();
        }
      }
    }

    if (searchData !== null && searchData.length !== 0) {
      handleOnSearchChange();
    }

    return () => {
      // Abort unfinished api request.
      if (autocompleteAbortControllerRef.current) {
        autocompleteAbortControllerRef.current.abort();
      }
    };
  }, [searchData]);
};

export default useGetAutocompleteItems;
