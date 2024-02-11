import React, { useState, useEffect } from "react";
import { useForecastContext } from "../../services/contexts/forecast-context";
import LocationListItem from "../layouts/header/location-list/LocationListItem";
import LocationListDisplay from "../layouts/header/location-list/LocationListDisplay";
import useSetInitialActiveIndex from "../../hooks/useSetInitialActiveIndex";

const LocationList = () => {
  const { locationList, locationName, updateLocationList, setPosition } =
    useForecastContext();
  const [activeIndex, setActiveIndex] = useState(null);

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
    const updatedList = locationList.filter((location, index) => {
      if (location.name === cityName && index === activeIndex) {
        setActiveIndex(null);
      } else if (location.name === cityName && index < activeIndex) {
        setActiveIndex(activeIndex - 1);
      }
      return location.name !== cityName;
    });
    updateLocationList(updatedList);
  };

  // Focus list-item with active class if geolocated name is saved in localstorage and it's initital render.
  useEffect(() => {
    const geolocatedIndex = useSetInitialActiveIndex({
      locationList,
      locationName,
    });
    if (geolocatedIndex !== null) {
      setActiveIndex(geolocatedIndex);
    }
  }, [locationName]);

  return (
    <LocationListDisplay>
      {locationList.map((listItem, index) => (
        <LocationListItem
          key={index}
          isActive={activeIndex === index}
          onClick={() => handleOnClickListItem(index, listItem.position)}
          onClickDelete={() => handleOnClickDelete(listItem.name)}
        >
          {listItem.name}
        </LocationListItem>
      ))}
    </LocationListDisplay>
  );
};

export default LocationList;
