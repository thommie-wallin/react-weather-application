import React from "react";
import { PageContainer } from "../../components/layouts/page-container/PageContainer";
import WeekForecast from "../../components/forecasts/WeekForecast";
// import { Routes } from "../../config/routes";

const FiveDayPage = () => {
  return (
    <PageContainer>
      <WeekForecast />
    </PageContainer>
  );
};

export default FiveDayPage;
