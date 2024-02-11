import React, { useState, useRef, useEffect } from "react";
import useWindowSize from "../../../../hooks/useWindowSize";

const LocationListDisplay = ({ children }) => {
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(false);
  const sliderRef = useRef();
  const windowSize = useWindowSize();

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

  // Check if overflow of list is outside of window-size, then show icons.
  useEffect(() => {
    manageShowArrowIcons();
  }, [windowSize]);

  return (
    <div className="location-list">
      {/* <h3>{locationName ? locationName : "Welcome"}</h3> */}
      <div className="location-list-slider" ref={sliderRef}>
        {children}
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

export default LocationListDisplay;
