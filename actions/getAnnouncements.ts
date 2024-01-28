import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Announcements } from "@/types/types";

interface Props {
	event_id: number;
}

const getAllAnnouncements = async ({ event_id }: Props) => {
	const supabase = createClient(cookies());

	const { data: announcements } = await supabase
		.from("announcements")
		.select(`*`)
		.eq("event_id", event_id);

	return announcements as Announcements[];
};

export default getAllAnnouncements;
