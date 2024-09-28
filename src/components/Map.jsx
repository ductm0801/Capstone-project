import React from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const CustomMarker = () => <FaMapMarkerAlt color="red" size={"30px"} />;

const MapComponent = ({ locations }) => {
  const defaultProps = {
    center: {
      lat: 10.811746,
      lng: 106.627408,
    },
    zoom: 13,
  };

  return (
    <div style={{ height: "100%", width: "100%" }} className="relative">
      <div className="absolute top-2 left-2 z-10 bg-white rounded-md text-base p-2">
        Address: <br />
        {locations.courtGroupName} <br />
        {locations.address} <br />
        <div className="flex gap-2 items-center">
          <FaPhoneAlt /> {locations.phoneNumber}
        </div>
        <div className="flex gap-2 items-center">
          <IoIosMail /> {locations.emailContact}
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        draggable={false}
      >
        <CustomMarker lat={locations.latitude} lng={locations.longitude} />
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
