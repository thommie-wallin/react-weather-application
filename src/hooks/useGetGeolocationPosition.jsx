import React, { useState, useEffect } from "react";
import { getGeolocationPosition } from "../services/geolocation";

const useGetGeolocationPosition = () => {
  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // If allowed, get user position from Geolocation API before first render.
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
      setIsLoading(true);
      if (res.state === "granted") {
        try {
          const posObj = await getGeolocationPosition();
          setPosition({
            latitude: posObj.coords.latitude,
            longitude: posObj.coords.longitude,
          });
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  }, []);

  return { position, isLoading, error };
};

export default useGetGeolocationPosition;
