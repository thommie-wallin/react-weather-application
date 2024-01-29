import React from "react";

const useGetTime = (timeStamp) => {
  const timeOfDay = new Date(timeStamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return timeOfDay;
};

export default useGetTime;
