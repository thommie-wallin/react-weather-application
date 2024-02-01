import React, { useState, useRef } from "react";
import { getGeolocationPosition } from "../../../services/geolocation";
import { useForecastContext } from "../../../services/contexts/forecast-context";

const LocationButton = () => {
  const { setPosition, loadingStart, loadingStop, setError } =
    useForecastContext();

  //! Use localstorage solution to save user persmission instead.
  // Disable button when user doesn't allow geolocation
  const buttonRef = useRef();

  function report(state) {
    console.log("Permission: " + state);
  }

  function handleOnClick() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(async function (result) {
        if (result.state == "granted") {
          report(result.state);
          buttonRef.current.disabled = true;
        } else if (result.state == "prompt") {
          report(result.state);
          loadingStart();
          try {
            const posObj = await getGeolocationPosition();
            setPosition({
              latitude: posObj.coords.latitude,
              longitude: posObj.coords.longitude,
            });
            buttonRef.current.disabled = true;
          } catch (error) {
            setError(error);
          } finally {
            loadingStop();
          }
        } else if (result.state == "denied") {
          report(result.state);
        }
        result.onchange = function () {
          report("onchange", result.state);
        };
      });
  }

  return (
    <button
      className="position-button"
      onClick={handleOnClick}
      // disabled={geolocationAllowed}
      ref={buttonRef}
    >
      <svg
        className="location-on-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
      </svg>
      {/* <img src="../../../../public\location_on.svg" /> */}
      {/* {geolocationAllowed ? (
        <img src="../../../../public\location_off.svg" />
      ) : (
        <img src="../../../../public\location_on.svg" />
      )} */}
    </button>
  );
};

export default LocationButton;
