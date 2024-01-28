import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function NavBar() {
	const cookieStore = cookies();

	const canInitSupabaseClient = () => {
		try {
			createClient(cookieStore);
			return true;
		} catch (e) {
			return false;
		}
	};

	const isSupabaseConnected = canInitSupabaseClient();

	return (
		<nav className="shadow-md animate-in mx-auto mt-5 max-w-6xl rounded-3xl flex justify-between h-16 text-white bg-slate-700">
			<div className="w-full flex justify-between items-center p-5 text-sm">
				<span className="text-xl font-mono font-extralight">
					<Link href="/">Project Management</Link>
				</span>
				{isSupabaseConnected && <AuthButton />}
			</div>
		</nav>
	);
}
