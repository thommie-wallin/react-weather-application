import React from "react";
import { data } from "../../../json_server/searchGeoDB.json";

export const Autocomplete = ({ searchResult }) => {
  // console.log(searchResult);
  // const autocomplete = searchResult.map((result, key) => {
  //   // console.log(result);
  //   return (
  //     <li className="autocomplete-list-item" key={key}>
  //       {result.name}, {result.countryCode}
  //     </li>
  //   );
  // });
  return (
    <div className="autocomplete-container">
      {/* <ul>{autocomplete}</ul> */}
      <ul className="autocomplete-list">{}</ul>
    </div>
  );
};
