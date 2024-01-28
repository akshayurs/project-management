import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Marks, Phases, Profile } from "@/types/types";

const getFinalMarks = async ({ event_id }: { event_id: number }) => {
	const supabase = createClient(cookies());
	if (!event_id)
		return {
			phase: [],
			members: [],
			marks: [],
		};
	const { data: phase } = await supabase
		.from("phase")
		.select(`*`)
		.eq("event_id", event_id);

	const { data: projects } = await supabase
		.from("projects")
		.select("*")
		.eq("event_id", event_id);
	const { data: members } = await supabase
		.from("profile")
		.select(`*`)
		.in(
			"email",
			projects
				?.map((i) => i.members)
				.filter((i) => i)
				.flat() as Array<string>
		);
	if (members == null || phase == null || projects == null)
		return {
			phase: [],
			members: [],
			marks: [],
		};
	const { data: marks } = await supabase
		.from("marks")
		.select("*")
		.in(
			"project_id",
			projects.map((i) => i.id)
		);

	return {
		phase: phase as Phases[],
		members: members as unknown as Profile[],
		marks: marks as Marks[],
	};
};

export default getFinalMarks;
