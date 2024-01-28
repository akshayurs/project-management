import getAllEvents from "@/actions/getAllEvents";
import getMyProjects from "@/actions/getMyProjects";
import getProfile from "@/actions/getProfile";
import Dashboard from "@/components/Dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const profile = await getProfile();
	if (profile === null) redirect("/profile");
	if (profile.type == "admin") redirect("/admin");
	const projects = await getMyProjects();
	const events = await getAllEvents();
	return (
		<Dashboard
			profile={profile}
			projects={projects ?? []}
			events={events ?? []}
		/>
	);
}
