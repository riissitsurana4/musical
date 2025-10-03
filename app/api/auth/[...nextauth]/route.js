import NextAuth from "next-auth";
import SlackProvider from "next-auth/providers/slack";
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

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
    debug: true,

    callbacks: {
        async signIn({ profile }) {
            if (!profile?.sub) return false;
            
            try {
                const result = await pool.query(`
                    INSERT INTO users (slack_id, name, email, avatar)
                    VALUES ($1, $2, $3, $4)
                    ON CONFLICT (slack_id) 
                    DO UPDATE SET 
                        name = EXCLUDED.name, 
                        email = EXCLUDED.email, 
                        avatar = EXCLUDED.avatar,
                        updated_at = CURRENT_TIMESTAMP
                    RETURNING id;
                `, [profile.sub, profile.name, profile.email, profile.picture]);
                
                console.log("User saved successfully:", result.rows[0]);
                return true;
            } catch (error) {
                console.error("Error saving user:", error);
                return true;
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
