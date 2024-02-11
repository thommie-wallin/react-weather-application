import { useState, useEffect } from "react";
import useThrottle from "./useThrottle";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  const throttledSize = useThrottle(size);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return throttledSize;
};

export default useWindowSize;
