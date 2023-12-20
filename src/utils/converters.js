export function tempUnitConverter(tempUnit, temp) {
  return tempUnit
    ? (temp - 273.15).toFixed(1)
    : ((temp - 273.15) * 1.8 + 32).toFixed(1);
}
