import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GoogleSignin from "@/components/GoogleSignin";
import { Button } from "antd";

export default function Login({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	const signIn = async (formData: FormData) => {
		"use server";

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}

		return redirect("/");
	};

	const signUp = async (formData: FormData) => {
		"use server";

		const origin = headers().get("origin");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}

		return redirect(
			"/login?message=Check email to continue sign in process"
		);
	};

	return (
		<div className="mx-auto mt-8 bg-slate-50 p-11 rounded-lg shadow-lg flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2">
			<form
				className="animate-in flex-1 flex flex-col w-full justify-center gap-5 text-foreground"
				action={signIn}
			>
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					className="rounded-md px-4 py-3 bg-inherit border mb-6"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<label className="text-md" htmlFor="password">
					Password
				</label>
				<input
					className="rounded-md px-4 py-3 bg-inherit border mb-6"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<button className="py-3 border-none rounded-md shadow-md bg-blue-500 text-white">
					Sign In
				</button>
				<button
					className="py-3 border-none rounded-md shadow-md"
					formAction={signUp}
				>
					Sign Up
				</button>
				{searchParams?.message && (
					<p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
						{searchParams.message}
					</p>
				)}
				<GoogleSignin />
			</form>
		</div>
	);
}
