"use server";

import { cookies } from "next/headers";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function setUserLocale(locale: string) {
  (await cookies()).set(COOKIE_NAME, locale);
}
