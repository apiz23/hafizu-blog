import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				token.id = account.providerAccountId;
				token.username = profile.login;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.id && token.username) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
