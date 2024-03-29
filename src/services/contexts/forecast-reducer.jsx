export const initialState = {
  locationName: null,
  currentWeather: {},
  forecast: {},
  position: null,
  locationList: [],
  isTempUnitC: true,
  isLoading: false,
  error: null,
};

export const forecastReducer = (state, action) => {
  const { type, payload } = action;
  let findDublicate;

  switch (type) {
    case "SET_FORECAST":
      console.log("SET_FORECAST", payload);
      findDublicate = state.locationList.find(
        (location) => location.name === payload.currentWeather.name,
      );

      if (findDublicate === undefined) {
        return {
          ...state,
          locationName: payload.currentWeather.name,
          locationList: [
            ...state.locationList,
            {
              name: payload.currentWeather.name,
              position: {
                latitude: payload.currentWeather.coord.lat,
                longitude: payload.currentWeather.coord.lon,
              },
            },
          ],
          currentWeather: payload.currentWeather,
          forecast: payload.forecast,
          error: null,
        };
      } else {
        return {
          ...state,
          locationName: payload.currentWeather.name,
          currentWeather: payload.currentWeather,
          forecast: payload.forecast,
          error: null,
        };
      }

    case "UPDATE_LOCATION_LIST":
      console.log("UPDATE_LOCATION_LIST", payload);
      return {
        ...state,
        locationList: payload,
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
        error: payload,
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
