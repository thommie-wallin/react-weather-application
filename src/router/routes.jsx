import React from "react";
import TodayPage from "../pages/dashboard/today";
import HourlyPage from "../pages/dashboard/hourly";
import FiveDayPage from "../pages/dashboard/five-day";

export const routes = [
  {
    path: "/today",
    title: "Today",
    element: <TodayPage />,
  },
  {
    path: "/hourly",
    title: "Hourly",
    element: <HourlyPage />,
  },
  {
    path: "/fivedays",
    title: "5 day",
    element: <FiveDayPage />,
  },
];
