"use client";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
  integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./modetoggle";
import { supabase } from "@/supabase";
const components = [
  {
    title: "How to use",
    href: "/about",
    description: "Soon...",
  },
];

const login = [
  {
    title: "Login",
    href: "/login",
    description: "",
  },
];
const logout = [
  {
    title: "Logout",
    href: "/",
    description: "",
  },
];
const dashboard = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "",
  },
];

export function NavigationMenuDemo() {
  const [user, setUser] = React.useState();
  supabase.auth
    .getUser()
    .then((u) => {
      setUser(u.data.user);
    })
    .catch((err) => {});

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-gradient-to-r  rounded-xl shadow-lg py-6 px-8">
              Home
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="ml-auto grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="col-span-full">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Icons.car className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        CSE305
                      </div>
                      <p className="ml-[text-sm leading-tight text-muted-foreground">
                        Autonomous Agent-Based Traffic Accident Database
                        Creation and Accident Prediction
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-gradient-to-r rounded-xl shadow-lg py-6 px-8">
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <Link href={component.href}>
                    <ListItem key={component.title} title={component.title}>
                      {component.description}
                    </ListItem>
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {!user && (
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-gradient-to-r rounded-xl shadow-lg py-6 px-8"
                suppressHydrationWarning
              >
                Login
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                  {login.map((component) => (
                    <Link href={component.href}>
                      <ListItem
                        key={component.title}
                        title={component.title}
                        suppressHydrationWarning
                      >
                        {component.description}
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          {user && (
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-gradient-to-r rounded-xl shadow-lg py-6 px-8"
                suppressHydrationWarning
              >
                Dashboard
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                  {dashboard.map((component) => (
                    <Link href={component.href}>
                      <ListItem
                        key={component.title}
                        title={component.title}
                        suppressHydrationWarning
                      >
                        {component.description}
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          {user && (
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="bg-gradient-to-r rounded-xl shadow-lg py-6 px-8"
                suppressHydrationWarning
              >
                Logout
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px] ">
                  {logout.map((component) => (
                    <Link href={component.href}>
                      <ListItem
                        key={component.title}
                        title={component.title}
                        suppressHydrationWarning
                        onClick={() => supabase.auth.signOut()}
                      >
                        {component.description}
                      </ListItem>
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          <NavigationMenuItem>
            <ModeToggle></ModeToggle>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
