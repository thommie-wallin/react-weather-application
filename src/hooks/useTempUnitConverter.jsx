import { tempUnitConverter } from "../utils/numberUtils";

const useTempUnitConverter = (dateArr, tempUnit) => {
  const temps = dateArr.map((d) => {
    const temp = tempUnitConverter(tempUnit, d.main.temp);
    return temp;
  });

  return temps;
};

export default useTempUnitConverter;
