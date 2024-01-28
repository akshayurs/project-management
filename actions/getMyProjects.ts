import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Projects } from "@/types/types";

const getMyProjects = async () => {
	const supabase = createClient(cookies());

	const { data: sessionData, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) {
		console.log("Error retreiving session", sessionError.message);
		return null;
	}

	const { data, error } = await supabase
		.from("profile")
		.select("email,type,id")
		.eq("user_id", sessionData.session?.user.id!)
		.maybeSingle();
	if (error) {
		console.log(error);
	}
	if (!data) return null;
	if (data.type == "mentor") {
		const { data: project } = await supabase
			.from("projects")
			.select(`*`)
			.eq("mentor_id", data.id);
		return project as Projects[];
	}
	const { data: project } = await supabase
		.from("projects")
		.select(`*`)
		.contains("members", [data.email]);
	return project as Projects[];
};

export default getMyProjects;
