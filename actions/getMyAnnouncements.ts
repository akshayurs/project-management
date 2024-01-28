import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Announcements } from "@/types/types";

interface Props {
	event_ids: number[];
}

const getMyAnnouncements = async ({ event_ids }: Props) => {
	const supabase = createClient(cookies());

	const { data: announcements } = await supabase
		.from("announcements")
		.select(`*`)
		.in("event_id", event_ids)
		.order("created_at", { ascending: false });
	return announcements as Announcements[];
};

export default getMyAnnouncements;
