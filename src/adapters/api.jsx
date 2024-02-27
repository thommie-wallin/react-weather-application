export async function makeAPICall(endpoint, signal) {
  const res = await fetch(endpoint, signal);
  const data = await res.json();
  return data;
}

export async function makeMultipleAPICalls(endpoints, signal) {
  const promises = endpoints.map((endpoint) => makeAPICall(endpoint, signal));
  const responses = await Promise.all(promises);
  return responses;
}
