import NextAuth, { type DefaultSession } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    tokens: {
      access: string;
      refresh: string;
      expiresIn: number;
    };
    user: {
      role: string;
    } & DefaultSession["user"]; // To keep the default types
  }
}

// declare module "@auth/core" {
//   // interface User {}
//   // interface Account {}

//   interface Session {
//     token: {
//       access: string;
//       refresh: string;
//       expiresIn: number;
//     };
//     user: {
//       role: string;
//     } & DefaultSession["user"]; // To keep the default types
//   }
// }

// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    tokens: {
      access: string;
      refresh: string;
      expiresIn: number;
    };
  }
}
