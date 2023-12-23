"use client";
import { useEffect, useState } from "react";
import MapContainer from "./Map";
import { ScrollAreaDemo } from "./ScrollArea";

export default function Accident() {
  const [location, setLocation] = useState("");
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <div>
      <div className="flex">
        <div className="flex-1 mr-4">
          <ScrollAreaDemo setLocation={setLocation}></ScrollAreaDemo>
        </div>
        <div className="flex-1">
          <MapContainer location={location}></MapContainer>
        </div>
      </div>
    </div>
  );
}
