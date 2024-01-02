"use client";
import { useEffect, useState } from "react";
import MapContainer from "./Map";
import { ScrollAreaDemo } from "./ScrollArea";
import { examples } from "@/../../backend/dummyNews";
import { DrawerDemo } from "./Drawer";

export default function Accident() {
  const [location, setLocation] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div>
      <div className="flex">
        <div className="flex-1">
          <DrawerDemo className="" examples={examples}></DrawerDemo>
          <ScrollAreaDemo
            setLocation={setLocation}
            setReason={setReason}
          ></ScrollAreaDemo>
        </div>
        <div className="flex-1 position fixed ml-[750px] ">
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
