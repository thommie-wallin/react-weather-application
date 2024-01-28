import React from "react";
import { PageContainer } from "../../components/layouts/page-container/PageContainer";
import Today from "../../components/forecasts/Today";
import WeekOverview from "../../components/forecasts/WeekOverview";

const TodayPage = () => {
  return (
    <PageContainer>
      <Today />
      <WeekOverview />
    </PageContainer>
  );
};

export default TodayPage;
