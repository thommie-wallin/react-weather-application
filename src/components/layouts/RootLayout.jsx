import React, { useEffect } from "react";
import { Header } from "./header/Header";
import { Outlet, useOutlet } from "react-router-dom";
import HomePage from "../../pages/dashboard/home";
import { useForecastContext } from "../../services/contexts/forecast-context";
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const { position } = useForecastContext();
  const outlet = useOutlet();
  const navigate = useNavigate();

  // If position updates and  user haven't clicked a router-link, navigate to TodayPage.
  useEffect(() => {
    if (position && !outlet) {
      navigate("/today");
    }
  }, [position]);

  return (
    <div className="content">
      <Header />
      <main className="router-content">
        {/* <Outlet /> */}
        {/* {outlet || <HomePage />} */}
        {/* {outlet && !position && <HomePage />} */}
        {!position ? <HomePage /> : outlet}
      </main>
    </div>
  );
}
