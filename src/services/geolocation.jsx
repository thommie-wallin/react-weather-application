export function getGeolocationPosition() {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    console.error("Geolocation is not supported for this Browser/OS.");
  }
}

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   const crd = pos.coords;

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);

//   return crd;
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// function getCurrentGeolocation() {
//   navigator.geolocation.getCurrentPosition(success, error, options);
// }

// function report(state) {
//   console.log("Permission: " + state);
// }

// export function handlePermission() {
//   navigator.permissions
//     .query({ name: "geolocation" })
//     .then(async function (result) {
//       if (result.state == "granted") {
//         report(result.state);
//       } else if (result.state == "prompt") {
//         report(result.state);
//         navigator.geolocation.getCurrentPosition(success, error, options);
//         return success;
//       } else if (result.state == "denied") {
//         report(result.state);
//       }
//       result.onchange = function () {
//         report(result.state);
//       };
//     });
// }
