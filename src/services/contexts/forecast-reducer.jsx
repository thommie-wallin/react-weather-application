export const initialState = {
  locationName: "",
  currentWeather: {},
  forecast: {},
  position: null,
  isTempUnitC: true,
  isLoading: false,
  error: null,
};

export const forecastReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_FORECAST":
      console.log("SET_FORECAST", payload);
      return {
        ...state,
        locationName: payload.currentWeather.name,
        currentWeather: payload.currentWeather,
        forecast: payload.forecast,
      };
    case "SET_TEMPUNIT_C":
      console.log("SET_TEMPUNIT_C", !state.isTempUnitC);
      return {
        ...state,
        isTempUnitC: !state.isTempUnitC,
      };
    case "SET_POSITION":
      console.log("SET_POSITION", payload);
      return {
        ...state,
        position: payload,
      };
    case "LOADING_START":
      console.log("LOADING_START");
      return {
        ...state,
        isLoading: true,
      };
    case "ERROR":
      console.log("ERROR", payload);
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case "LOADING_STOP":
      console.log("LOADING_STOP");
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`No case for type ${type} found in forecastReducer.`);
  }
};
