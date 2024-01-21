import React from "react";
import { PageContainer } from "../../components/layouts/PageContainer/page-container";
import WeekForecast from "../../components/forecasts/WeekForecast";
import { Routes } from "../../config/routes";

const FiveDayPage = () => {
  return (
    <PageContainer path={Routes.fiveDays}>
      <WeekForecast />
    </PageContainer>
  );
};

export default FiveDayPage;
