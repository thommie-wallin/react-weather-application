// Convert temperature units
export function tempUnitConverter(tempUnit, temp) {
  return tempUnit
    ? (temp - 273.15).toFixed(1)
    : ((temp - 273.15) * 1.8 + 32).toFixed(1);
}

// Filter array every nth index
export function filterTemps(arr, nth) {
  return arr.filter((e, i) => i % nth === nth - 1);
}
