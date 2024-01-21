export const initialState = {
  user: null,
  setuser: null,
  // locationName: "",
  // currentWeather: {},
  // forecast: {},
  // position: null,
  // isLoading: false,
  // error: null,
  // setForecast: null,
  // setCurrentWeather: null,
};

export const forecastReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_FORECAST":
      console.log("SET_FORECAST", payload);
      return {
        ...state,
        locationName: action.payload[0].name,
        currentWeather: action.payload[0],
        forecast: action.payload[1],
        isLoading: false,
        position: null,
      };
    case "SET_POSITION":
      console.log("SET_POSITION", payload);
      return {
        ...state,
        position: payload,
      };
    case "IS_LOADING":
      console.log("IS_LOADING", payload);
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
    case "IS_LOADING_FALSE":
      console.log("IS_LOADING_FALSE", payload);
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`No case for type ${type} found in forecastReducer.`);
  }
};
