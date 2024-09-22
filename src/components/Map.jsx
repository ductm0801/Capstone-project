import React from "react";
import GoogleMapReact from "google-map-react";

import customMarker from "../images/marker.png";
import { FaMapMarkerAlt } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapComponent = ({ lat, lng, locations }) => {
  const defaultProps = {
    center: {
      lat: 10.8117367,
      lng: 106.6248365,
    },
    zoom: 13,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations.map((l) => (
          <AnyReactComponent
            lat={l.lat}
            lng={l.lng}
            text={<FaMapMarkerAlt color="red" size={"30px"} />}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
