import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Chats } from "@/types/types";

interface Props {
	project_id: number;
}

const getAllChats = async ({ project_id }: Props) => {
	const supabase = createClient(cookies());

	const { data: Chats } = await supabase
		.from("chats")
		.select(`*`)
		.eq("project_id", project_id);

	return Chats as Chats[];
};

export default getAllChats;
