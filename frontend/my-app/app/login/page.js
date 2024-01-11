"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://uqjoqkxijcozhuravpcq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxam9xa3hpamNvemh1cmF2cGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MjI5ODgsImV4cCI6MjAyMDQ5ODk4OH0.K_aExSWi3Nz4M5-IV2Bg13E1qH80GJFNMj-8dXknm5g"
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
  }
  return (
    <div>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              id="password"
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={async () => {
              await login();
            }}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
