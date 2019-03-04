import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia29yZWRlMzYwIiwiYSI6ImNqZno1MGN2YjBhOTgyd2xlbWFhMGQ3dmwifQ.1AbAu_Ga4bu4iQCnOgBfog";

interface MapState {
  lng: number;
  lat: number;
  zoom: number;
}

const initialMapState = {
  lng: 5,
  lat: 34,
  zoom: 1.5
};

const mapReducer = (state: MapState, action: any) => ({ ...state, ...action });

const Map = () => {
  let mapContainer: any;
  const [state, setState] = React.useReducer(mapReducer, initialMapState);
  React.useEffect(() => {
    const { lng, lat, zoom } = state;
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/dark-v9",
      center: [lng, lat],
      zoom
    });
    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }, []);
  return (
    <div>
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={el => (mapContainer = el)}
        className="absolute top right left bottom"
      />
    </div>
  );
};

export default Map;
