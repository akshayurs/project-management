import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Profile } from "@/types/types";

const getProfile = async () => {
	const supabase = createClient(cookies());

	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) {
		console.log("Error retreiving session", sessionError.message);
		return null;
	}

	const { data, error } = await supabase
		.from("profile")
		.select("*")
		.eq("user_id", sessionData.session?.user.id!)
		.maybeSingle();
	if (error) {
		console.log(error);
	}

	return data as Profile | null;
};

export default getProfile;
