import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapContainer = () => {
  const mapStyles = {
    height: "400px",
    width: "600px",
  };

  const [location, setLocation] = useState({
    lat: 37.8380162,
    lng: 27.8455601,
  });

  const handleMapClick = (event) => {
    const geocoder = new window.google.maps.Geocoder();
    const { latLng } = event;

    geocoder.geocode(
      { location: { lat: latLng.lat(), lng: latLng.lng() } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            setLocation({
              lat: latLng.lat(),
              lng: latLng.lng(),
            });
          }
        }
      }
    );
  };

  const handleSearch = (address) => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            setLocation({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          }
        }
      });
    } else {
      console.error("Google Maps API henüz yüklenmedi.");
    }
  };

  useEffect(() => {
    handleSearch("Çaltı Mahallesi aydın çine");
  }, []);

  useEffect(() => {
    console.log("Konumla harita render ediliyor:", location);
  }, [location]);

  const handleMapLoad = (map) => {
    console.log("Harita yüklendi:", map);
  };

  const handleMarkerLoad = (marker) => {
    console.log("İşaretleyici yüklendi:", marker);
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={location}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
      >
        {console.log("Son konum bilgisi burada" + location.lat)}
        {console.log("Son konum bilgisi burada" + location.lng)}

        <Marker position={location} onLoad={handleMarkerLoad} />
        <Marker position={location} onLoad={handleMarkerLoad} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
