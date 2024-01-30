import React from "react";
import "../../styles/Home.css";
import Card from "../../components/ui/Card";

const Home = () => {
  return (
    <Card title={"Welcome"}>
      <div className="home-page-card">
        <p className="text">
          Search for a weather forecast in your city or allow geolocation on
          this website.
        </p>
      </div>
    </Card>
  );
};

export default Home;
