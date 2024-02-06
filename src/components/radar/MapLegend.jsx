import { useEffect } from "react";
import { useForecastContext } from "../../services/contexts/forecast-context";
import L from "leaflet";
import { useMap } from "react-leaflet/hooks";
import legendData from "../../data/radar-map-legend";

export default function Legend({ layerName }) {
  const { isTempUnitC } = useForecastContext();
  const map = useMap();

  let title = "";
  let scaleTemp = [];
  let scaleUnit = "";
  let className = "";
  let tempUnit = isTempUnitC ? "℃" : "℉";
  legendData.filter((d, i) => {
    if (d.name === layerName) {
      title = d.title;
      scaleTemp =
        layerName !== "temperature"
          ? d.scale
          : isTempUnitC
            ? d.scaleC
            : d.scaleF;
      scaleUnit = d.scaleUnit;
      className = d.className;
    }
  });

  const scale = scaleTemp.map((d, i) => `<p key=${i}>${d}</p>`).join("");

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      div.style.margin = "5px";
      div.innerHTML = `
        <p class="legend-title">${title} ${
          layerName === "temperature" ? tempUnit : scaleUnit
        }</p>
        <div>
          <div class="scale-dividers">
            ${scale}
          </div>
          <div class="horizontal-gradient-scale ${className}"></div>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [layerName, isTempUnitC]);
  return null;
}
