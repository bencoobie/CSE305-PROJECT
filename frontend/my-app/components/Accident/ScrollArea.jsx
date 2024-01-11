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
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ScrollAreaDemo(props) {
  const handleClick = (location, reason) => {
    props.setLocation(location);
    props.setReason(reason);
  };
  const [filtered, setFiltered] = React.useState("");
  const [accidents, setAccidents] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/accident")
      .then((res) => res.json())
      .then((data) => {
        const sortedAccidents = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAccidents(sortedAccidents);
      });
  }, []);

  const filteredarr = accidents.filter((a) => {
    if (a.detail_location) {
      return a.detail_location.toLowerCase().includes(filtered.toLowerCase());
    }
  });
  const nonfilteredarr = accidents.filter((a) => !a.detail_location);

  return (
    <ScrollArea className=" w-[700px] rounded-md border ml-5 mt-5">
      <div className="p-4">
        <h4 className="mb-4 text-center font-medium leading-none text-2xl">
          ACCIDENTS
        </h4>

        <Input
          className="ml-2 mb-3 w-[650px]"
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
                        <Label htmlFor="name">Title:{accident.title}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">
                          Reason:{accident.description}
                        </Label>
                        <Separator className="my-2" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">
                          Plates:{accident.license_plate}
                        </Label>
                        <Separator className="my-2" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">
                          Location:{accident.detail_location}
                        </Label>
                        <Separator className="my-2" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework" suppressHydrationWarning>
                          Date:{new Date(accident.date).toLocaleDateString()}
                        </Label>
                        <Separator className="my-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="ml-[220px] bg-gradient-to-r rounded-xl shadow-lg py-6 px-8"
                      onClick={() =>
                        handleClick(
                          accident.detail_location,
                          accident.description
                        )
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
        {nonfilteredarr.length > 0 ? (
          nonfilteredarr.map((accident, index) => (
            <>
              <div key={index} className="text-sm">
                <Card className="ml-2 w-[650px]">
                  <CardHeader>
                    <CardTitle className="text-center">
                      Düzensiz veri {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Title:{accident.title}</Label>
                        <Separator className="my-2" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
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
