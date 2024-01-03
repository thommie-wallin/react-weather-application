import { useState } from "react";
import { GEODB_API_URL } from "../../utils/constants";
import { geoApiOptions } from "../../api/geoDB";

export const Search = ({ getSearchData, onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOption = async (inputValue) => {
    try {
      const response = await fetch(`${GEODB_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  const handleOnChange = (searchTerm) => {
    // loadOption(searchTerm.target.value)
    setSearch(searchTerm.target.value);
    onSearchChange(searchTerm.target.value);
    // console.log(searchTerm.target.value);
  };

  const sendData = () => {
    loadOption(search)
    // getSearchData(search);
  };

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
    <div>
      <input
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
      <button onClick={sendData}>Search</button>
    </div>
  );
};
