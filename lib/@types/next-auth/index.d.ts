import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import type { RedirectableProviderType } from "next-auth/providers";
import type { OAuthProviderType } from "next-auth/src/providers/oauth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    idToken?: string; // google
    accessToken: string;
    refreshToken?: string;
    provider: Provider;
    providerAccountId: string;
    username?: string;
  }

  interface User {
    id: string;
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  export interface JWT extends Record<string, unknown>, DefaultJWT {
    idToken?: string; // google
    accessToken: string;
    refreshToken?: string;
    provider: Provider;
    providerAccountId: string;
    username?: string;
  }
}

// TODO: doesn't work for some reason
declare module "next-auth/providers" {
  export declare type BuiltInProviderType =
    | OAuthProviderType
    | RedirectableProviderType
    | "siwe";
}
