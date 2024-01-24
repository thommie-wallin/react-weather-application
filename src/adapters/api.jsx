import { useForecast } from "../services/contexts/forecast-context";

export async function makeAPICall(endpoint, signal) {
  const res = await fetch(endpoint, signal);
  const data = await res.json();
  return data;
  // try {
  //   const res = await fetch(endpoint, signal);
  //   if (!res.ok) {
  //     throw Error("could not fetch the data from that resource");
  //   }
  //   const data = await res.json();
  //   return data;
  // } catch (error) {
  //   if (error.name === "AbortError") {
  //     console.error(error);
  //     return;
  //   }
  //   console.log(error.message);
  //   return error.message;
  // }
}

// const api = (endpoint, signal) => {
//   get: (endpoint) => fetch(endpoint, signal);
// };

export async function makeMultipleAPICalls(endpoints, signal) {
  const promises = endpoints.map((endpoint) => makeAPICall(endpoint, signal));
  const responses = await Promise.all(promises);
  return responses;
}

// const makeMultipleAPICalls = (endpoints, signal) => {
//   endpoints
//     .map((endpoint) => api.get(endpoint, signal))
//     .then((promises) => Promise.all(promises))
//     .then((responses) => responses);
//   // const responses = Promise.all(promises);
//   // return responses;
// };

// export { api, makeMultipleAPICalls };
