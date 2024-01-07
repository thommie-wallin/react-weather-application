import React from "react";
import data from "../../../json_server/searchGeoDB.json";

export const Autocomplete = ({
  searchResult,
  setSearchResult,
  setPosition,
  toggle,
}) => {
  function closeAutocomplete() {
    // const autocomplete = document.querySelector(".autocomplete-container");
    // autocomplete.classList.toggle("open");
  }
  // if (data) {
  //   const autocompleteElem = document.querySelector(".autocomplete-container");
  //   autocompleteElem.addEventListener("click", function (event) {
  //     console.log(event);
  //     console.log(event.target);
  //     console.log(event.currentTarget);
  //   });
  // }

  // const autocomplete = searchResult.map((result, key) => {
  //   return (
  //     <li
  //       className="autocomplete-list-item"
  //       key={key}
  //       onClick={(e) => {
  //         e.preventDefault();
  //         setPosition({
  //           latitude: result.latitude,
  //           longitude: result.longitude,
  //         });
  //         // setSearchResult({});
  //         toggle();
  //         document.getElementById("search-input").value = null;
  //       }}
  //     >
  //       {result.name}, {result.countryCode}
  //     </li>
  //   );
  // });

  return (
    <div className="autocomplete-container">
      {/* <ul className="autocomplete-list">{autocomplete}</ul> */}
      <p>autocomplete</p>
    </div>
  );
};
