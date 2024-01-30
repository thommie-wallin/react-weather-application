import { useEffect } from "react";
import { getGeolocationPosition } from "../services/geolocation";
import { useForecastContext } from "../services/contexts/forecast-context";
import { useNavigate } from "react-router-dom";

const useGetGeolocationPosition = () => {
  const { setPosition, loadingStart, loadingStop, setError } =
    useForecastContext();
  const navigate = useNavigate();

  // If permitted, get user position from Geolocation API after first render.
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(async (res) => {
      if (res.state === "granted") {
        loadingStart();
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
      } else if (res.state === "denied") {
        navigate("/");
      }
    });
  }, []);
};

export default useGetGeolocationPosition;
