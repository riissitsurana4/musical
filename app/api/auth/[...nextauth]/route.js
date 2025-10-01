import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import { sql } from "@vercel/postgres";

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

    callbacks: {
        async signIn({ profile }) {
            if (!profile?.sub) return false;
            try {
                await sql`
          INSERT INTO users (slack_id, name, email, avatar)
          VALUES (${profile.sub}, ${profile.name}, ${profile.email}, ${profile.picture})
          ON CONFLICT (slack_id) 
          DO UPDATE SET 
            name = EXCLUDED.name, 
            email = EXCLUDED.email, 
            avatar = EXCLUDED.avatar,
            updated_at = CURRENT_TIMESTAMP;
        `;
                return true;
            } catch (error) {
                console.error("Error saving user:", error);
                return false;
            }
        },
        // Add the slack_id to the JWT
        async jwt({ token, profile }) {
            if (profile) {
                token.slack_id = profile.sub;
            }
            return token;
        },
        // Add the slack_id to the session
        async session({ session, token }) {
            if (session?.user) {
                session.user.slack_id = token.slack_id;
            }
            return session;
        },
    },
}; const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
