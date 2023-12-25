import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

async function getUser(email: string) {
  try {
    const data = {
      user: {
        name: "John",
        id: "ewewe",
        email: "john@gmail.com",
        role: "ADMIN",
      },
      tokens: {
        access: "sdsdsdsd",
        refresh: "llklkklklllkll refresh",
      },
    };
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      // @ts-ignore
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          return user;
        }
        return null;
      },
    }),
  ],
  session: {
    // maxAge: 5,
  },
} as const;
