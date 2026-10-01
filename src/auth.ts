import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { isAllowedDiscordId } from "@/lib/auth-permissions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ profile }) {
      return isAllowedDiscordId(
        typeof profile?.id === "string" ? profile.id : undefined
      );
    },
    async jwt({ token, profile }) {
      if (typeof profile?.id === "string") {
        token.discordId = profile.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.discordId === "string") {
        session.user.discordId = token.discordId;
      }
      return session;
    },
  },
});
