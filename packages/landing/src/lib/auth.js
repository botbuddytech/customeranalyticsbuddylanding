import { supabase } from "./supabase";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Supabase",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("MISSING_CREDENTIALS");
        }

        if (!supabase) {
          // This is a configuration problem on the server, not user error.
          console.error(
            "Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY) to your .env file."
          );
          throw new Error("SERVER_CONFIG_ERROR");
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
          // Normalize error message for the client/UI layer.
          if (
            error?.message?.toLowerCase().includes("invalid login credentials")
          ) {
            throw new Error("INVALID_CREDENTIALS");
          }

          throw new Error("LOGIN_FAILED");
        }

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  // NOTE: In production, prefer process.env.NEXTAUTH_SECRET
  secret:
    process.env.NEXTAUTH_SECRET ||
    "botbuddy-decryption-stable-secret-32-chars-long!",
};
