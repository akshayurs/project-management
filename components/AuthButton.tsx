import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "antd";

export default async function AuthButton() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		"use server";

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		await supabase.auth.signOut();
		return redirect("/login");
	};

	return user ? (
		<div className="flex items-center gap-4">
			<Link href={"/dashboard"}>
				<Button type="default">Dashboard</Button>
			</Link>
			<form action={signOut}>
				<Button type="default" htmlType="submit">
					Logout
				</Button>
			</form>
		</div>
	) : (
		<Link
			href="/login"
			className="py-2 px-4 rounded-md no-underline text-white text-lg border-none "
		>
			Login
		</Link>
	);
}
