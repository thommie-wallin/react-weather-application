// If geolocated name is stored in localstorage, focus on that list-item from initial render.
const useSetInitialActiveIndex = ({ locationList, locationName }) => {
  let initialActiveIndex = null;
  for (let i = 0; i < locationList.length; i++) {
    if (locationList[i].name === locationName) {
      return (initialActiveIndex = i);
    }
  }
  return initialActiveIndex;
};

export default useSetInitialActiveIndex;
