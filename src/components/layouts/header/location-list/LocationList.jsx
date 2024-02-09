import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useForecastContext } from "../../../../services/contexts/forecast-context";
import LocationListItem from "./LocationListItem";

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

//! Implement throttling when checking windows-size.
// Check window size
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const LocationList = () => {
  const { locationList, locationName } = useForecastContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(false);
  const sliderRef = useRef();
  const windowSize = useWindowSize();
  // console.log(windowSize);

  // Handle scroll with mouse wheel
  // const handleScroll = (event) => {
  //   const container = event.target;
  //   const scrollAmount = event.deltaY;
  //   container.scrollTo({
  //     top: 0,
  //     left: container.scrollLeft + scrollAmount,
  //     behavior: "smooth",
  //   });
  // };

  // OnClick left slider
  const slideLeft = (e) => {
    e.preventDefault();
    sliderRef.current.scrollTo({
      left: sliderRef.current.scrollLeft - 200,
      // behavior: "smooth",
    });
    manageShowArrowIcons();
  };

  // OnClick right slider
  const slideRight = (e) => {
    e.preventDefault();
    sliderRef.current.scrollBy({
      left: sliderRef.current.scrollLeft + 200,
      // behavior: "smooth",
    });
    manageShowArrowIcons();
  };

  /** Decrements or increments scollLeft property to scroll left or right respectively */
  // const handleSlider = (direction) => {
  //   if (direction === "left") {
  //     sliderRef ? (sliderRef.current.scrollLeft -= 200) : null;
  //   } else {
  //     sliderRef ? (sliderRef.current.scrollLeft += 200) : null;
  //   }
  //   manageShowArrowIcons();
  //   console.log(sliderRef.current.scrollLeft);
  // };

  // How to show arrow icons
  const manageShowArrowIcons = () => {
    if (sliderRef.current.scrollLeft > 20) {
      setActiveArrowLeft(true);
    } else {
      setActiveArrowLeft(false);
    }
    let maxScrollValue =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth - 20;

    // console.log("scroll width: ", sliderRef.current.scrollWidth);
    // console.log("client width: ", sliderRef.current.clientWidth);
    // console.log("maxScrollValue: ", maxScrollValue);

    if (sliderRef.current.scrollLeft > maxScrollValue) {
      setActiveArrowRight(false);
    } else {
      setActiveArrowRight(true);
    }
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
    // manageShowArrowIcons();
  }, [locationName]);

  return (
    <div className="location-list">
      {/* <h3>{locationName ? locationName : "Welcome"}</h3> */}
      <div
        className="location-list-slider"
        // onWheel={handleScroll}
        ref={sliderRef}
      >
        {locationList.map((listItem, i) => (
          <LocationListItem
            key={i}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(i)}
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
          onClick={slideLeft}
          // onClick={() => handleSlider("left")}
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
          onClick={slideRight}
          // onClick={() => handleSlider("right")}
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
