import React, { useState, useEffect, useRef } from "react";
import { getAutocompleteItems } from "../services/autocomplete-list";

const useGetAutocompleteItems = (searchData) => {
  const [searchResult, setSearchResult] = useState({});
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [autocompleteIsLoading, setAutocompleteIsLoading] = useState(false);
  const [error, setError] = useState();
  const autocompleteAbortControllerRef = useRef();

  useEffect(() => {
    // Get search suggestions for autocomplete component (GeoDB-cities API).
    async function handleOnSearchChange() {
      if (searchData !== null) {
        // Check if searchdata existed before correcting validation invalid.
        if (searchData === searchTerm) {
          setAutocompleteOpen(true);
          return;
        }

        // Cache search term in state
        setSearchTerm(searchData);

        // Create new abortController() for new request.
        autocompleteAbortControllerRef.current = new AbortController();
        const signal = autocompleteAbortControllerRef.current.signal;

        setAutocompleteIsLoading(true);
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
          setAutocompleteIsLoading(false);
        }
      }
    }
    handleOnSearchChange();

    return () => {
      // Abort unfinished api request.
      if (autocompleteAbortControllerRef.current) {
        autocompleteAbortControllerRef.current.abort();
      }
    };
  }, []);

  return { searchResult, autocompleteOpen, autocompleteIsLoading, error };
};

export default useGetAutocompleteItems;
