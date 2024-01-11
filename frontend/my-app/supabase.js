import { createClient } from "@supabase/supabase-js";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const supabase = createClient(
  "https://uqjoqkxijcozhuravpcq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxam9xa3hpamNvemh1cmF2cGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MjI5ODgsImV4cCI6MjAyMDQ5ODk4OH0.K_aExSWi3Nz4M5-IV2Bg13E1qH80GJFNMj-8dXknm5g",
  {
    auth: {
      storageKey: "token",
      storage: {
        getItem(key) {
          return getCookie(key) || null;
        },
        setItem(key, value) {
          return setCookie(key, value, {
            httpOnly: false,
            sameSite: "none",
            maxAge: Date.now() + 1000 * 60 * 60 * 24 * 365,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
            secure:
              typeof document !== "undefined" &&
              (document.location?.protocol === "https" ||
                document.location?.hostname === "localhost"),
          });
        },
        removeItem(key) {
          return deleteCookie(key, { sameSite: "none", secure: true });
        },
      },
    },
  }
);
