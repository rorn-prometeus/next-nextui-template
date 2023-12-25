"use server";

import NextAuth from "next-auth";
import { authConfig } from "./config/auth.config";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { JWT } from "@auth/core/jwt";

async function onRefreshToken(refresh: string): Promise<JWT> {
  // call to refresh here

  return {
    tokens: {
      access: "new token",
      refresh: "new refresh token",
      expiresIn: 2323,
    },
  };
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token?.tokens?.refresh) {
        const accessToken = token.tokens.access;
        const refreshToken = token.tokens.refresh;

        const randomNumber = Math.floor(Math.random() * 6);

        // const decoded: { exp: number } = jwtDecode(accessToken);
        // const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;
        if (randomNumber < 3) {
          const response = await onRefreshToken(refreshToken);
          if (response) {
            return {
              ...token,
              ...user,
              ...response,
            };
          }
        }
      }

      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      return { ...session, ...token };
    },
  },
});
