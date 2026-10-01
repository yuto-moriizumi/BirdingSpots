export const ALLOWED_DISCORD_IDS = ["267203749137743883"] as const;

export function isAllowedDiscordId(
  discordId: string | null | undefined
): boolean {
  return (
    typeof discordId === "string" &&
    ALLOWED_DISCORD_IDS.some((allowedId) => allowedId === discordId)
  );
}
