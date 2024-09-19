import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import customMarker from "../images/marker.png";

// Set the container styles for the Google Map
const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ lat, lng, apiKey }) => {
  const center = {
    lat: lat, // Your latitude
    lng: lng, // Your longitude
  };
  const customIcon = {
    url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBojXVm4IkBJ93o_kf4kOGfcLbGIjI1YdY&callback=initMap&v=weekly&libraries=marker",
  };
  return (
    <LoadScript googleMapsApiKey={"AIzaSyBojXVm4IkBJ93o_kf4kOGfcLbGIjI1YdY"}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center} // Set the map's initial center to your lat and lng
        zoom={14} // Adjust the zoom level as needed
      >
        {/* Marker placed at the given lat and lng */}
        <Marker
          position={center}
          options={{
            icon: customMarker,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
