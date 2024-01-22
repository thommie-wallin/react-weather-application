export const initialState = {
  // user: null,
  // setuser: null,
  // locationName: "",
  currentWeather: {},
  forecast: {},
  isTempUnitC: true,
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
        // locationName: action.payload[0].name,
        currentWeather: payload.currentWeather,
        forecast: payload.forecast,
        // isLoading: false,
        // position: null,
      };
    case "SET_TEMPUNIT":
      console.log("SET_TEMPUNIT", !state.isTempUnitC);
      return {
        ...state,
        isTempUnitC: !state.isTempUnitC,
        // locationName: action.payload[0].name,
        // currentWeather: payload.currentWeather,
        // forecast: payload.forecast,
        // isLoading: false,
        // position: null,
      };
    // case "SET_POSITION":
    //   console.log("SET_POSITION", payload);
    //   return {
    //     ...state,
    //     position: payload,
    //   };
    // case "LOADING":
    //   console.log("LOADING", payload);
    //   return {
    //     ...state,
    //     isLoading: true,
    //   };
    // case "ERROR":
    //   console.log("ERROR", payload);
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: action.error,
    //   };
    // case "SUCCESS":
    //   console.log("SUCCESS", payload);
    //   return {
    //     ...state,
    //     isLoading: false,
    //   };
    default:
      throw new Error(`No case for type ${type} found in forecastReducer.`);
  }
};
