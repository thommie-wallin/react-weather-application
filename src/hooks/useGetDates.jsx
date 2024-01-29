import React from "react";

const useGetDatesAndDays = (dateArr) => {
  const dates = dateArr.map((d) => {
    return new Date(d.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    });
  });

  return dates;
};

export default useGetDatesAndDays;
