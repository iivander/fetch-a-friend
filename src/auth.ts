import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { cookies } from "next/headers";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text" },
                email: { label: "Email", type: "text" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.name || !credentials?.email) {
                        throw new Error("Missing credentials");
                    }

                    const res = await fetch(
                        "https://frontend-take-home-service.fetch.com/auth/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                            body: JSON.stringify({
                                name: credentials.name,
                                email: credentials.email,
                            }),
                        }
                    );

                    if (!res.ok) {
                        throw new Error("Invalid credentials");
                    }

                    const rawCookies = res.headers.get("set-cookie");
                    if (!rawCookies) {
                        throw new Error("No authentication token received");
                    }

                    (await cookies()).set("auth_token", rawCookies, { path: "/", httpOnly: true });
                    return {
                        id: credentials.email as string,
                        email: credentials.email as string,
                        name: credentials.name as string,
                    };
                } catch (error) {
                    console.log("error", error);
                    throw new Error("Authentication failed");
                }
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = {
                ...session.user,
                id: token.id as string | undefined,
                email: token.email as string | undefined,
                name: token.name as string | undefined,
            };
            return session;
        },
    },
    events: {
        async signOut() {
            (await cookies()).delete("auth_token");
        },
    },
    secret: process.env.AUTH_SECRET,
});
