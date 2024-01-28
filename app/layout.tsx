import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import NavBar from "@/components/NavBar";
import NextTopLoader from "nextjs-toploader";
import { Background } from "@/components/Background";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Next.js and Supabase Starter Kit",
	description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground">
				<QueryProvider>
					<Background />
					<NextTopLoader />
					<NavBar />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
