import React from "react";
import GoogleMapReact from "google-map-react";
import customMarker from "../images/marker.png";
import { FaMapMarkerAlt } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MapComponent = ({ locations }) => {
  const defaultProps = {
    center: {
      // lat: locations[0]?.latitude,
      // lng: locations[0]?.longitude,
    },
    zoom: 13,
  };
  console.log(locations);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={locations[0]?.latitude}
          lng={locations[0]?.longtitude}
          text={<FaMapMarkerAlt color="red" size={"30px"} />}
        />
      </GoogleMapReact> */}
    </div>
  );
};
export default MapComponent;
