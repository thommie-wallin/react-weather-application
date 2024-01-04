import React from "react";
import { useState } from "react";
import { GEODB_API_URL } from "../../utils/constants";
import { geoApiOptions } from "../../api/geoDB";
import { Autocomplete } from "./Autocomplete";

export const Search = ({ getSearchData, onSearchChange, searchResult }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (e) => {
    e.preventDefault();
    // loadOption(searchTerm.target.value)
    setSearch(e.target.value);
    onSearchChange(e.target.value);
    // console.log(e.target.value);
  };

  const sendData = () => {
    // loadOption(search);
    getSearchData(search);
  };

  console.log(searchResult);

  // const handleOnChange = (e) => {
  //   // console.log(e.target.value.toLowerCase());
  //   onSearchChange(e.target.value.toLowerCase());
  //   // Filter plants with search term
  //   // const filteredPlants = plantsList.filter((plant) => {
  //   //   return plant.name.toLowerCase().includes(e.target.value.toLowerCase());
  //   // });

  //   // // Send result to parent
  //   // searchResult(filteredPlants);
  // };

  return (
    // <div>
    //   <input
    //     type="search"
    //     name="q"
    //     id="search-input"
    //     placeholder="Search for a city"
    //     size="30"
    //     pattern="[A-z]"
    //     aria-label="Search for forecast in specific city"
    //     onChange={handleOnChange}
    //     autoComplete="off"
    //   />
    //   <button onClick={sendData}>Search</button>
    // </div>

    <div className="search-component">
      <div className="searchBar">
        <input
          // className="searchBar"
          type="search"
          name="q"
          id="search-input"
          placeholder="Search for a city"
          size="30"
          pattern="[A-z]"
          aria-label="Search for forecast in specific city"
          onChange={handleOnChange}
          autoComplete="off"
        />
        {search && searchResult !== null && (
          <Autocomplete searchResult={searchResult} />
        )}
        {/* {search && <Autocomplete searchResult={searchResult} />} */}
        {/* {Autocomplete} */}
      </div>
      <button onClick={sendData}>Search</button>
    </div>
  );
};
