import { useState } from "react";

export const Search = ({ getSearchData }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchTerm) => {
    setSearch(searchTerm.target.value);
    // onSearchChange(searchData.target.value);
    // console.log(searchData);
  };

  const sendData = () => {
    getSearchData(search);
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
