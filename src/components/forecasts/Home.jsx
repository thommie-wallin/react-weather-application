import React from "react";
import Card from "../../components/ui/Card";
import HomeDisplay from "../layouts/page-container/pages/HomeDisplay";

const Home = () => {
  return (
    <Card title={"Welcome"}>
      <HomeDisplay />
    </Card>
  );
};

export default Home;
