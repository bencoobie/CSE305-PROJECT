"use client";
import { useEffect, useState } from "react";
import MapContainer from "./Map";
import { ScrollAreaDemo } from "./ScrollArea";
import { examples } from "@/../../backend/dummyNews";

export default function Accident() {
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");
  useEffect(() => {
    console.log(location);
    console.log(reason);
  }, [location]);
  return (
    <div>
      <div className="flex">
        <div className="flex-1 mr-4">
          <ScrollAreaDemo
            setLocation={setLocation}
            setReason={setReason}
          ></ScrollAreaDemo>
        </div>
        <div className="flex-1">
          <MapContainer
            location={location}
            examples={examples}
            reason={reason}
          ></MapContainer>
        </div>
      </div>
    </div>
  );
}
