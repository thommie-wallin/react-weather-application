import React from "react";
import { data } from "../../../json_server/searchGeoDB.json";

export const Autocomplete = ({ searchResult, getSearchData }) => {
  // console.log(searchResult);

  // const sendData = () => {
  //   // loadOption(search);
  //   getSearchData({
  //     latitude: result.lat,
  //     longitude: result.lon,
  //   });
  // };

  const autocomplete = searchResult.map((result, key) => {
    // console.log(result);
    return (
      <li
        className="autocomplete-list-item"
        key={key}
        onClick={(e) => {
          e.preventDefault();
          getSearchData({
            latitude: result.latitude,
            longitude: result.longitude,
          });
        }}
      >
        {result.name}, {result.countryCode}
      </li>
    );
  });
  return (
    <div className="autocomplete-container">
      <ul className="autocomplete-list">{autocomplete}</ul>
    </div>
  );
};
