import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Projects } from "@/types/types";

interface Props {
	event_id: number;
}

const getAllProjects = async ({ event_id }: Props) => {
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

	const { data: project, error: err } = await supabase
		.from("projects")
		.select(`*`)
		.eq("event_id", event_id);
	return project as Projects[];
};

export default getAllProjects;
