"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerF,
  CircleF,
  Circle,
  InfoBox,
  InfoWindow,
} from "@react-google-maps/api";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

export function MapContainer(props) {
  const [accidentLocation, setAccidentLocation] = useState({
    lat: 37.8380162,
    lng: 27.8455601,
  });
  const [clicked, isClicked] = useState(false);
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
    height: "500px",
    width: "47vw",
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
  function handleCirclelick() {
    console.log("calisti");
    return <h1>Clicked</h1>;
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
   <div className="ml-[10px] mt-5 rounded-lg">
     <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={accidentLocation}
    >
      <Circle
        center={accidentLocation}
        radius={150}
        options={{ fillColor: "#ff0000", fillOpacity: 0.5 }}
        onClick={() => isClicked(true)}
      ></Circle>
      {clicked && (
        <InfoWindow
          position={accidentLocation}
          onCloseClick={() => isClicked(false)}
        >
          <Label className="text-black">{props.reason}</Label>
        </InfoWindow>
      )}
    </GoogleMap>
   </div>
  );
}

export default MapContainer;
