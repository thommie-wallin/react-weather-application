import React, { useState, useEffect, useRef } from "react";
import { useForecastContext } from "../../../../services/contexts/forecast-context";

const LocationList = ({ locationName }) => {
  const { locationList } = useForecastContext();
  const [isActive, setIsActive] = useState();
  const [toggle, setToggle] = useState({});
  let linkRef = useRef(null);
  // console.log(linkRef);

  // Close autocomplete when click outside of search-input.
  // useEffect(() => {
  //   let clickOutsideHandler = (e) => {
  //     // if (
  //     //   !autocompleteRef.current?.contains(e.target) &&
  //     //   e.target.id !== "search"
  //     // ) {
  //     //   setAutocompleteClose();
  //     // }
  //     console.log(e);
  //   };
  //   // linkRef.addEventListener("click", clickOutsideHandler);
  //   // return () => {
  //   //   linkRef.removeEventListener("click", clickOutsideHandler);
  //   // };
  // }, []);

  function handleOnClick(e) {
    // linkRef.current.classList.add("active");
    e.target.classList.toggle("active");
    console.log(e.target);
  }

  function toggleFunction(id) {
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    });
    console.log(toggle);
  }

  // const handleClick = () => setIsActive(!isActive);

  //! Every button should have it's own state for when clicked in its own component.

  return (
    <div className="location-list">
      {/* <h3>{locationName ? locationName : "Welcome"}</h3> */}
      {locationList.map((d, i) => (
        <div
          key={i}
          // className={`location-list-item ${isActive ? "active" : null}`}
          className="location-list-item"
          ref={linkRef}
        >
          <a href="#" onClick={handleOnClick} className="location-list-link">
            {/* <span className="location-list-item-text"> */}
            {d.name}
            {/* </span> */}
          </a>
          <div className="location-list-button-container">
            <button className="location-list-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      <div className="location-list-left-arrow-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      </div>
      <div className="location-list-right-arrow-icon active">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      </div>
    </div>
  );
};

export default LocationList;
