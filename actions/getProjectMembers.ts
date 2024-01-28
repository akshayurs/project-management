import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Profile } from "@/types/types";

async function getProjectMembers(project_id: Number) {
	const supabase = createClient(cookies());

	const { data: project } = await supabase
		.from("projects")
		.select("*")
		.eq("id", project_id)
		.maybeSingle();

	let profiles: Profile[] = [];
	if (!project) return null;
	project?.members?.map(async (member) => {
		const { data } = await supabase
			.from("profile")
			.select("*")
			.eq("email", member)
			.maybeSingle();
		if (data) profiles.push(data);
	});
	if (project.mentor_id) {
		const { data } = await supabase
			.from("profile")
			.select("*")
			.eq("id", project.mentor_id)
			.maybeSingle();
		if (data) profiles.push(data);
	}
	return profiles as Profile[] | null;
}

export default getProjectMembers;
