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
import { useLayoutEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { supabase } from "@/supabase";
import { redirect } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);
    if (data) {
      setIsAuth(true);
    }
  }
  useLayoutEffect(() => {
    if (isAuth) {
      redirect("/dashboard");
    }
  });

  return (
    <div className="text-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-4xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input className="w-[700px] ml-[395px]"
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
            <Input className="w-[700px] ml-[395px]"
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
            className="w-[200px] ml-[650px]"
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
