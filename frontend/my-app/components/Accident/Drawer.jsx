"use client";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function DrawerDemo(props) {
  const parsedData = props.examples.map((item) => ({
    ...item,
    date_time: item.date_time === "N/A" ? null : new Date(item.date_time),
  }));

  // Count Accidents by Date
  const accidentCountByDate = parsedData.reduce((acc, item) => {
    const dateKey = item.date_time?.toLocaleDateString() || "Unknown";

    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  // Prepare Data for Recharts
  const chartData = Object.keys(accidentCountByDate).map((date) => ({
    date,
    count: accidentCountByDate[date],
  }));

  const xTicks = chartData.map((data) => data.date);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Kaza Grafiğini Gör</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4 pb-0">
            <div className="mt-3 h-[120px] w-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey={"date"} tick={xTicks}></XAxis>
                  <YAxis dataKey={"count"}></YAxis>
                  <Bar
                    dataKey="count"
                    style={{
                      fill: "hsl(var(--foreground))",
                      opacity: 0.9,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
