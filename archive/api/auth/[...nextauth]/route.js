import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import { prisma } from '@/lib/prisma';


export const authOptions = {
    providers: [
        SlackProvider({
            clientId: process.env.SLACK_CLIENT_ID,
            clientSecret: process.env.SLACK_CLIENT_SECRET,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ profile }) {
            if (!profile?.sub) return false;
            
            try {
                const user = await prisma.user.upsert({
                    where: {
                        slackId: profile.sub
                    },
                    update: {
                        name: profile.name,
                        email: profile.email,
                        avatar: profile.picture,
                    },
                    create: {
                        slackId: profile.sub,
                        name: profile.name,
                        email: profile.email,
                        avatar: profile.picture,
                    },
                });
                
                console.log("User saved successfully:", user.id);
                return true;
            } catch (error) {
                console.error("Error saving user:", error);
                return false;
            }
        },
        async jwt({ token, profile }) {
            if (profile) {
                token.slack_id = profile.sub;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.slack_id = token.slack_id;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.includes('/api/auth/callback')) {
                return `${baseUrl}/dashboard`;
            }
            
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            
            if (new URL(url).origin === baseUrl) {
                return url;
            }
            
            return `${baseUrl}/dashboard`;
        }
    },

    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
