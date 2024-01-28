import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Marks } from "@/types/types";

const getProjectMarks = async ({ project_id }: { project_id: number }) => {
	const supabase = createClient(cookies());

	const { data: marks } = await supabase
		.from("marks")
		.select("*")
		.eq("project_id", project_id);
	return marks as Marks[];
};

export default getProjectMarks;
