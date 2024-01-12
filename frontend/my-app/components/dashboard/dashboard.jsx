"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";

export default function Dashboard() {
  const [site, setSite] = useState("");
  const [ilce, setIlce] = useState("");
  const [success, setSuccess] = useState(false);

  function handleClick() {
    console.log("girdi");
    const data = {
      site: site,
      ilce: ilce,
    };
    axios.post("http://localhost:3000/", data).then((res) => {
      setSuccess(true);
    });
  }
  return (
    <>
      {!success ? (
        <div className="text-center place-items-center place-content-center">
          <Label>
            Her gece 00:00'da dün meydana gelen trafik kazaları otomatik olarak
            çekilmektedir.Aşağıda isteğe göre filtreleme yapıp o filtrelere göre
            veri çekilebilir.Her şey boş bırakılırsa dün meydana gelen trafik
            kazaları şimdi çekilecektir.
          </Label>

          <Input className="mt-[40px] text-center w-[800px] ml-[360px]"
            onChange={(event) => {
              setSite(event.target.value);
            }}
            id="site"
            type="text"
            placeholder="Arama yapmak istediğiniz haber sitesi urlini giriniz."
          />
          <Input className="w-[800px] mx-[360px] mt-[15px] text-center"
            onChange={(event) => {
              setIlce(event.target.value);
            }}
            id="ilce"
            type="text"
            placeholder="Arama yapmak istediğiniz ilceyi giriniz."
          />
          <Button className=" mt-[30px]" onClick={() => handleClick()}>Work Agent</Button>
        </div>
      ) : (
        <>
          <Label>Agent başarıyla çalıştı.</Label>
        </>
      )}
    </>
  );
}
