import React, { useState, useEffect } from "react";
import { getGeolocationPosition } from "../services/geolocation";
// import { useForecast } from "../contexts/forecast-context";
import { useGetForecast } from "./useGetForecast";

const useGetGeolocationPosition = (setPosition, setIsLoading, setError) => {
  // const [position, setPosition] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // If allowed, get user position from Geolocation API after first render.
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

  // console.log(position);

  // return { position, isLoading, error };
  // return { position };
  // return { isLoading, error };
};

export default useGetGeolocationPosition;
