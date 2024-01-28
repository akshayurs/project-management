import getAllProjects from "@/actions/getAllProjects";
import DeleteAll from "./DeleteAll";
import getProfile from "@/actions/getProfile";
import Table from "./table";
import FileUpload from "./fileUpload";
import getAllMentors from "@/actions/getAllMentors";

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
	return (
		<div className="p-5">
			<div className="mb-2 font-bold text-xl">
				Upload Project with .xlsx File
			</div>
			<FileUpload profile={profile} event_id={event_id} />
			<Table projects={projects} mentors={mentors} event_id={event_id} />
			<DeleteAll event_id={event_id} />
		</div>
	);
}
