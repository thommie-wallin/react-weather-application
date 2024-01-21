import React from "react";
import { PageContainer } from "../../components/layouts/PageContainer/page-container";
import Today from "../../components/forecasts/Today";
import WeekOverview from "../../components/forecasts/WeekOverview";
import { Routes } from "../../config/routes";

const TodayPage = () => {
  return (
    <PageContainer path={Routes.today}>
      <Today />
      <WeekOverview />
    </PageContainer>
  );
};

export default TodayPage;
