import Accident from "@/components/Accident/Accident";
import MapContainer from "@/components/Accident/Map";
import { ScrollAreaDemo } from "@/components/Accident/ScrollArea";
import { NavigationMenuDemo } from "@/components/Navbar";

import { Button } from "@/components/ui/button";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <NavigationMenuDemo></NavigationMenuDemo>
      <Accident></Accident>;
    </div>
  );
}
