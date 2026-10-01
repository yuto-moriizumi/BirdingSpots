"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { isAllowedDiscordId } from "@/lib/auth-permissions";

export function AuthControls() {
  const t = useTranslations("Home");
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (isAllowedDiscordId(session?.user?.discordId)) {
    return (
      <Button variant="outline" onClick={() => void signOut()}>
        {t("signOut")}
      </Button>
    );
  }

  return (
    <Button variant="outline" onClick={() => void signIn("discord")}>
      {t("signIn")}
    </Button>
  );
}
