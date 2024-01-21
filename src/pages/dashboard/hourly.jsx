import React from "react";
import { PageContainer } from "../../components/layouts/PageContainer/page-container";
import Hourly from "../../components/forecasts/Hourly";
import { Routes } from "../../config/routes";

const HourlyPage = () => {
  return (
    <PageContainer path={Routes.hourly}>
      <Hourly />
    </PageContainer>
  );
};

export default HourlyPage;
