export function getGeolocationPosition() {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    console.error(
      "Your browser does not support location tracking, or permission is denied.",
    );
  }
}
