import React, { lazy, Suspense } from "react";

const TodayPage = lazy(() => import("../pages/dashboard/today"));
const HourlyPage = lazy(() => import("../pages/dashboard/hourly"));
const FiveDayPage = lazy(() => import("../pages/dashboard/five-day"));
const RadarPage = lazy(() => import("../pages/dashboard/radar"));

// import TodayPage from "../pages/dashboard/today";
// import HourlyPage from "../pages/dashboard/hourly";
// import FiveDayPage from "../pages/dashboard/five-day";
// import RadarPage from "../pages/dashboard/radar";

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
