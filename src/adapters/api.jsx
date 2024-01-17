export async function makeAPICall(endpoint, signal) {
  try {
    const res = await fetch(endpoint, signal);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function makeMultipleAPICalls(endpoints, signal) {
  const promises = endpoints.map((endpoint) => makeAPICall(endpoint, signal));
  const responses = await Promise.all(promises);
  return responses;
}
