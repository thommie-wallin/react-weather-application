import React from "react";
import { PageContainer } from "../../components/layouts/PageContainer/page-container";
import Hourly from "../../components/forecasts/Hourly";

const HourlyPage = () => {
  return (
    <PageContainer path={"/hourly"}>
      <Hourly />
    </PageContainer>
  );
};

export default HourlyPage;
