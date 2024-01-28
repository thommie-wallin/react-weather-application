import React from "react";
import TodayPage from "../pages/dashboard/today";
import HourlyPage from "../pages/dashboard/hourly";
import FiveDayPage from "../pages/dashboard/five-day";
import { useRoutes } from "react-router-dom";

export const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  // },
  {
    path: "/today",
    // path: "/",
    name: "Today",
    element: <TodayPage />,
  },
  {
    path: "/hourly",
    name: "Hourly",
    element: <HourlyPage />,
  },
  {
    path: "/fivedays",
    name: "5 day",
    element: <FiveDayPage />,
  },
];

// export const routes = {
//   home: "/",
//   today: "/today",
//   hourly: "/hourly",
//   fiveDays: "/fivedays",
// };
