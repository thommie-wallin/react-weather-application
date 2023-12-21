// Convert temperature units, rounded to one decimal and parsed into an integer.
export function tempUnitConverter(tempUnit, temp) {
  return tempUnit
    ? (temp - 273.15).toFixed(1)
    : ((temp - 273.15) * 1.8 + 32).toFixed(1);
}

// Filter array to retrieve every nth index
export function filterArr(arr, nth) {
  return arr.filter((e, i) => i % nth === nth - 1);
}

// Get 5 dates and weekdays including today
export function getFiveDays() {
  const date = new Date();
  const dateArr = [{}, {}, {}, {}, {}];
  const weekDayArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const datesDaysMerge = dateArr.map((d, i) => {
    if (i === 0) {
      date.setDate(date.getDate());
    } else {
      date.setDate(date.getDate() + 1);
    }
    const weekDay = weekDayArr[date.getDay()];
    return (d = { day: weekDay, date: date.getDate() });
  });
  return datesDaysMerge;
}
