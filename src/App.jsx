import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/create-router.jsx";

function App() {
  // const [cities, setCities] = useState([]);
  // const addCity = (name, temperature) => {
  //   const newCity = { name, temperature };
  //   setCities((prevCities) => [...prevCities, { name, temperature }]);
  // };

  return <RouterProvider router={router} />;
}

export default App;
