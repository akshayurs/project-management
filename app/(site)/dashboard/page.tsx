import getAllEvents from "@/actions/getAllEvents";
import getAllAnnouncements from "@/actions/getAnnouncements";
import getMyAnnouncements from "@/actions/getMyAnnouncements";
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
	const announcements = await getMyAnnouncements({
		event_ids: projects?.map((project) => project.event_id) ?? [],
	});
	return (
		<Dashboard
			profile={profile}
			projects={projects ?? []}
			events={events ?? []}
			announcements={announcements ?? []}
		/>
	);
}
