"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
  CircleF,
  Circle,
} from "@react-google-maps/api";

export function MapContainer(props) {
  const [accidentLocation, setAccidentLocation] = useState({
    lat: 37.8380162,
    lng: 27.8455601,
  });
  useEffect(() => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: props.location }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            setAccidentLocation({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
            console.log(results[0].geometry.location.lat());
          }
        }
      });
    } else {
      console.error("Google Maps API henüz yüklenmedi.");
    }
  }, [props.location]);

  const mapStyles = {
    height: "400px",
    width: "600px",
  };
  /*const center = {
    lat: 37.8380162,
    lng: 27.8455601,
  };*/

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDLde0x3oSgpFStBjOpcVAbFknypHKymA4",
  });

  if (loadError) {
    return <h1>HARİTA YÜKLENİRKEN HATA MEYDANA GELDİ</h1>;
  }
  if (!isLoaded) {
    return <h1>Harita yükleniyor..</h1>;
  }

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
            setAccidentLocation({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
            console.log(results[0].geometry.location.lat());
          }
        }
      });
    } else {
      console.error("Google Maps API henüz yüklenmedi.");
    }
  };

  //handleSearch("Işıklar Mahallesi,Nazilli,Aydın");

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={accidentLocation}
    >
      <Circle
        center={accidentLocation}
        radius={150}
        options={{ fillColor: "#ff0000", fillOpacity: 0.5 }}
      ></Circle>
    </GoogleMap>
  );
}

export default MapContainer;
