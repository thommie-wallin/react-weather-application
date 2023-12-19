export function getGeolocationPos() {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    console.error("Geolocation is not supported");
  }

  // const [location, setLocation] = useState({});
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     }, setError(error));
  //   } else {
  //     setError("Geolocation is not supported");
  //     return;
  //   }
  // }, []);

  // return { ...location, error };
}
