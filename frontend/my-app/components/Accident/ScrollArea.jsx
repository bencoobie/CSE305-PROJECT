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

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export function ScrollAreaDemo(props) {
  const handleClick = (location) => {
    props.setLocation(location);
  };
  return (
    <ScrollArea className="h-max w-96 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Accidents</h4>
        {examples.map((accident, index) => (
          <>
            <div key={index} className="text-sm">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>{index + 1}</CardTitle>
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
                  <Button onClick={() => handleClick(accident.location)}>
                    Konuma git
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
