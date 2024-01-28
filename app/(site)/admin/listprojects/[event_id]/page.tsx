import getAllProjects from "@/actions/getAllProjects";
import DeleteAll from "./DeleteAll";
import getProfile from "@/actions/getProfile";
import Table from "./table";
import FileUpload from "./fileUpload";
import getAllMentors from "@/actions/getAllMentors";
import NewProject from "./NewProject";

export default async function ListAll({
	params,
}: {
	params: { event_id: string };
}) {
	const event_id = Number(params.event_id);
	if (event_id === null) return <div>No Event ID Provided</div>;
	const projects = await getAllProjects({ event_id });
	const profile = await getProfile();
	const mentors = await getAllMentors();
	console.log({ projects });
	return (
		<div className="p-5">
			<FileUpload profile={profile} event_id={event_id} />
			<NewProject event_id={event_id} profile={profile} />
			<Table projects={projects} mentors={mentors} event_id={event_id} />
			<DeleteAll event_id={event_id} />
		</div>
	);
}
