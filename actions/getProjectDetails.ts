import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Projects } from "@/types/types";

const getProjectDetails = async (id: Number) => {
	const supabase = createClient(cookies());

	const { data: project } = await supabase
		.from("projects")
		.select(`*`)
		.eq("id", id)
		.maybeSingle();
	if (project == null) return { project: null, event: null };
	const { data: event } = await supabase
		.from("events")
		.select(`*`)
		.eq("id", project.event_id)
		.maybeSingle();
	if (event == null) return { project: null, event: null };
	return { project, event };
};

export default getProjectDetails;
