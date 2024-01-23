import { useEffect } from "react";
import { getGeolocationPosition } from "../services/geolocation";
import { useForecast } from "../services/contexts/forecast-context";

const useGetGeolocationPosition = () => {
  const { setPosition, loadingStart, loadingStop, setError } = useForecast();
  // If allowed, get user position from Geolocation API after first render.
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
      loadingStart();
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
          loadingStop();
        }
      }
    });
  }, []);
};

export default useGetGeolocationPosition;
