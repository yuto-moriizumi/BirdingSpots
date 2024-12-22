"use server";

import { cookies, headers } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookie = await cookies();
  return (
    cookie.get(COOKIE_NAME)?.value ||
    (await headers()).get("Accept-Language") ||
    "ja"
  );
}

export async function setUserLocale(locale: "ja" | "en") {
  (await cookies()).set(COOKIE_NAME, locale);
}
