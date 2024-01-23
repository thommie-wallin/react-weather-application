import React from "react";
import { PageContainer } from "../../components/layouts/page-container/PageContainer";
import Hourly from "../../components/forecasts/Hourly";
// import { Routes } from "../../config/routes";

const HourlyPage = () => {
  return (
    <PageContainer>
      <Hourly />
    </PageContainer>
  );
};

export default HourlyPage;
