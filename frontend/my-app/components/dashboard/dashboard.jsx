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
        <div>
          <Label>
            Her gece 00:00'da dün meydana gelen trafik kazaları otomatik olarak
            çekilmektedir.Aşğıda isteğe göre filtreleme yapıp o filtrelere göre
            veri çekilebilir.Her şey boş bırakılırsa dün meydana gelen trafik
            kazaları şimdi çekilecektir.
          </Label>

          <Input
            onChange={(event) => {
              setSite(event.target.value);
            }}
            id="site"
            type="text"
            placeholder="Arama yapmak istediğiniz haber sitesi urlini giriniz."
          />
          <Input
            onChange={(event) => {
              setIlce(event.target.value);
            }}
            id="ilce"
            type="text"
            placeholder="Arama yapmak istediğiniz ilceyi giriniz."
          />
          <Button onClick={() => handleClick()}>Work Agent</Button>
        </div>
      ) : (
        <>
          <Label>Agent başarıyla çalıştı.</Label>
        </>
      )}
    </>
  );
}
