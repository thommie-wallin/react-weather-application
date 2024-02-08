import React, { useRef } from "react";
import { getGeolocationPosition } from "../../../../services/geolocation";
import { useForecastContext } from "../../../../services/contexts/forecast-context";

const SearchNearMeButton = () => {
  const { setPosition, loadingStart, loadingStop, setError } =
    useForecastContext();

  //! Use localstorage solution to save user persmission instead.
  // Disable button when user doesn't allow geolocation
  const buttonRef = useRef();

  async function handleOnclick() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(async function (result) {
        if (result.state == "granted") {
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
        }
        //? else if (result.state == "prompt") {
        //? Prompt user to allow geolocation on location-button above.
        //? }
        else if (result.state == "denied") {
          buttonRef.current.disabled = true;
        }
        result.onchange = function () {};
      });
  }

  return (
    <button
      type="search"
      className="near-me-button"
      onClick={handleOnclick}
      ref={buttonRef}
    >
      <svg
        className="search-near-me-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M516-120 402-402 120-516v-56l720-268-268 720h-56Zm26-148 162-436-436 162 196 78 78 196Zm-78-196Z" />
      </svg>
    </button>
  );
};

export default SearchNearMeButton;
