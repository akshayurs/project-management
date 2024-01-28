import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Events } from "@/types/types";

const getAllEvents = async () => {
	const supabase = createClient(cookies());

	const { data: events } = await supabase.from("events").select(`*`);

	return events as Events[];
};

export default getAllEvents;
