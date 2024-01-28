"use client";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useQuery } from "react-query";

const useSession = () => {
	const { data, isLoading, error } = useQuery<Session | null>({
		queryKey: ["session"],
		queryFn: async () => {
			const supabase = createClient();
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error) throw error;
			return session;
		},
	});

	return { data, isLoading, error };
};

export default useSession;
