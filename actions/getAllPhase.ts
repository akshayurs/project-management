import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Phases } from "@/types/types";

const getAllPhase = async ({
	event_id,
	project_id,
}: {
	event_id?: number;
	project_id?: number;
}) => {
	const supabase = createClient(cookies());

	if (project_id) {
		const { data } = await supabase
			.from("projects")
			.select("event_id")
			.eq("id", project_id)
			.maybeSingle();
		event_id = data?.event_id;
	}
	if (!event_id) return null;
	const { data: phase } = await supabase
		.from("phase")
		.select(`*`)
		.eq("event_id", event_id);

	return phase as Phases[];
};

export default getAllPhase;
