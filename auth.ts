import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { api } from "@/lib/api";
import { verifyLoginResponseSchema, verifyLoginSchema } from "@/lib/zod";

declare module "next-auth" {
  interface AdapterUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
    access_token?: string | null;
  }

  interface Session {
    user: AdapterUser;
    expires: Date & string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          // logic to verify if the user exists
          const data = await verifyLoginSchema.parseAsync(credentials);

          const res = await api(verifyLoginResponseSchema, {
            url: "/auth/verify-login",
            method: "post",
            data,
          });

          if (!res.data?.access_token) {
            // No user found, so this is their first attempt to login
            throw new Error("AccessDenied");
          }

          if (!res.data?.user?.isActive) {
            // No user found, so this is their first attempt to login
            throw new Error("InactiveUser");
          }

          // return user object with their profile data
          return {
            name: res.data.user.first_name + " " + res.data.user.last_name,
            email: res.data.user.email,
            role: res.data.user.role,
            image: null,
            access_token: res.data.access_token,
          };
        } catch (e) {
          console.error(e);
          if (e instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isAuthRoute = nextUrl.pathname.includes("/auth");

      if (isAuthRoute && auth) {
        // If the path includes "/auth" and the user is authenticated
        return Response.redirect(new URL(`/`, nextUrl));
      }

      if (!isAuthRoute && !auth) {
        // If the path includes "/auth" and the user is NOT authenticated
        return Response.redirect(
          new URL(`/auth/sign-in?callbackUrl=${nextUrl.pathname}`, nextUrl)
        );
      }

      // Allow access for all other cases
      return true;
    },
    jwt(params) {
      // console.log("jwt data:", params);
      if (params.user) {
        return {
          ...params.token,
          user: params.user,
        };
      }

      if (params.trigger === "update" && params.session) {
        // console.log("jwt data:", params);

        params.token = {
          ...params.token,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          user: { ...(params.token as any), ...params.session.user },
        };
        return params.token;
      }

      return params.token;
    },
    session(params) {
      params.session.user = {
        ...params.session.user,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(params.token.user as unknown as any),
      };

      return params.session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 86400,
  },
  trustHost: true,
});
