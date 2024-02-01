import React from "react";
import "../../styles/Home.css";
import IndexContainer from "../../components/layouts/page-container/IndexContainer";
import Home from "../../components/forecasts/Home";

const HomePage = () => {
  return (
    <IndexContainer>
      <Home />
    </IndexContainer>
  );
};

export default HomePage;
