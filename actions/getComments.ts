import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Comments } from "@/types/types";

interface Props {
	chat_id: number;
}

const getComments = async ({ chat_id }: Props) => {
	const supabase = createClient(cookies());

	const { data: comments } = await supabase
		.from("comments")
		.select(`*`)
		.eq("chat_id", chat_id);

	return comments as Comments[];
};

export default getComments;
