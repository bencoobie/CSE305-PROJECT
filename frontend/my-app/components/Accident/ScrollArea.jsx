import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { examples } from "../../../../backend/dummyNews";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export function ScrollAreaDemo(props) {
  const handleClick = (location, reason) => {
    props.setLocation(location);
    props.setReason(reason);
  };
  const [filtered, setFiltered] = React.useState("");
  const filteredarr = examples.filter((a) => {
    return a.location.toLowerCase().includes(filtered.toLowerCase());
  });

  return (
    <ScrollArea className=" w-[700px] rounded-md border ml-5 mt-5">
      <div className="p-4">
        <h4 className="mb-4 text-center font-medium leading-none text-2xl">ACCIDENTS</h4>

        <Input className="ml-2 mb-3 w-[650px]"
          placeholder="Filtrelemek İstediğiniz konumu girin"
          onChange={(event) => {
            setFiltered(event.target.value);
          }}
        ></Input>

        {filteredarr.length > 0 ? (
          filteredarr.map((accident, index) => (
            <>
              <div key={index} className="text-sm">
                <Card className="ml-2 w-[650px]">
                  <CardHeader>
                    <CardTitle className="text-center">{index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Reason:{accident.reason}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">
                          Location:{accident.location}
                        </Label>
                        <Separator className="my-2" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">
                          Date:{accident.date_time}
                        </Label>
                        <Separator className="my-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-[220px] bg-gradient-to-r rounded-xl shadow-lg py-6 px-8"
                      onClick={() =>
                        handleClick(accident.location, accident.reason)
                      }
                    >
                      Konuma git
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <Separator className="my-2" />
            </>
          ))
        ) : (
          <>
            <Label>Aradığınız konuma ait kaza bulunamadı.</Label>
          </>
        )}
      </div>
    </ScrollArea>
  );
}
