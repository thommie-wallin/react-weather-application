import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
      });
    } else {
      setError('Geolocation is not supported');
      return;
    }
  }, [])

  return {...location, error}
}