import React, { lazy } from "react";

const TodayPage = lazy(() => import("../pages/dashboard/today"));
const HourlyPage = lazy(() => import("../pages/dashboard/hourly"));
const FiveDayPage = lazy(() => import("../pages/dashboard/five-day"));
const RadarPage = lazy(() => import("../pages/dashboard/radar"));

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
  {
    path: "/radar",
    title: "Radar",
    element: <RadarPage />,
  },
];
