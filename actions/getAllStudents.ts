import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Profile } from "@/types/types";

const getAllStudents = async () => {
	const supabase = createClient(cookies());

	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) {
		console.log("Error retreiving session", sessionError.message);
		return null;
	}

	const { data, error } = await supabase
		.from("profile")
		.select("type")
		.eq("user_id", sessionData.session?.user.id!)
		.maybeSingle();
	if (error) {
		console.log(error);
	}
	if (data?.type !== "admin") {
		return null;
	}

	const { data: students } = await supabase
		.from("profile")
		.select(`*`)
		.eq("type", "student");

	return students as Profile[];
};

export default getAllStudents;
