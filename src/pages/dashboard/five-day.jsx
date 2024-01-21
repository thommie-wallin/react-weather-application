import React from "react";
import { PageContainer } from "../../components/layouts/PageContainer/page-container";
import WeekForecast from "../../components/forecasts/WeekForecast";

const FiveDayPage = () => {
  return (
    <PageContainer path={"/fivedays"}>
      <WeekForecast />
    </PageContainer>
  );
};

export default FiveDayPage;
