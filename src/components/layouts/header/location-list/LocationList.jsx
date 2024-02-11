import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useForecastContext } from "../../../../services/contexts/forecast-context";
import LocationListItem from "./LocationListItem";
import useThrottle from "../../../../hooks/useThrottle";
import useWindowSize from "../../../../hooks/useWindowSize";

// If geolocated name is stored in localstorage, focus on that list-item from initial render.
function setInitialActiveIndex({ locationList, locationName }) {
  let initialActiveIndex = null;
  for (let i = 0; i < locationList.length; i++) {
    if (locationList[i].name === locationName) {
      return (initialActiveIndex = i);
    }
  }
  return initialActiveIndex;
}

const LocationList = () => {
  const { locationList, locationName, updateLocationList, setPosition } =
    useForecastContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(false);
  const sliderRef = useRef();
  const windowSize = useWindowSize();

  // Decrements or increments scollLeft property to scroll left or right respectively
  const handleArrowOnClick = (direction) => {
    if (direction === "left") {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - 200,
      });
    } else {
      sliderRef.current.scrollBy({
        left: sliderRef.current.scrollLeft + 200,
      });
    }
    manageShowArrowIcons();
  };

  // How to show arrow icons.
  const manageShowArrowIcons = () => {
    if (sliderRef.current.scrollLeft > 20) {
      setActiveArrowLeft(true);
    } else {
      setActiveArrowLeft(false);
    }
    let maxScrollValue =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 20;

    if (sliderRef.current.scrollLeft > maxScrollValue) {
      setActiveArrowRight(false);
    } else {
      setActiveArrowRight(true);
    }
  };

  // Set active index for UI purposes and position to fetch weather data for that position.
  const handleOnClickListItem = (index, position) => {
    setActiveIndex(index);
    setPosition({
      latitude: position.latitude,
      longitude: position.longitude,
    });
  };

  // Filter out city name from locationList and send updated list to forecast-context.
  const handleOnClickDelete = (cityName) => {
    const updatedList = locationList.filter((location) => {
      return location.name !== cityName;
    });
    updateLocationList(updatedList);
    setActiveIndex(null);
  };

  // Check if overflow of list is outside of window-size, then show icons.
  useEffect(() => {
    manageShowArrowIcons();
  }, [windowSize]);

  // Focus list-item with active class if geolocated name is saved in localstorage and it's initital render.
  useEffect(() => {
    const res = setInitialActiveIndex({ locationList, locationName });
    if (res !== null) {
      setActiveIndex(res);
    }
  }, [locationName]);

  return (
    <div className="location-list">
      {/* <h3>{locationName ? locationName : "Welcome"}</h3> */}
      <div className="location-list-slider" ref={sliderRef}>
        {locationList.map((listItem, index) => (
          <LocationListItem
            key={index}
            isActive={activeIndex === index}
            // onClick={() => setActiveIndex(index, listItem.position)}
            onClick={() => handleOnClickListItem(index, listItem.position)}
            onClickDelete={() => handleOnClickDelete(listItem.name)}
          >
            {listItem.name}
          </LocationListItem>
        ))}
      </div>

      <div
        className={`location-list-left-arrow-icon ${
          activeArrowLeft && "active"
        }`}
      >
        <svg
          onClick={() => handleArrowOnClick("left")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      </div>
      <div
        className={`location-list-right-arrow-icon ${
          activeArrowRight && "active"
        }`}
      >
        <svg
          onClick={() => handleArrowOnClick("right")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </div>
    </div>
  );
};

export default LocationList;
