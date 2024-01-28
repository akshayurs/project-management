import getAllPhase from "@/actions/getAllPhase";
import getProjectMarks from "@/actions/getProjectMarks";
import getProjectMembers from "@/actions/getProjectMembers";
import RenderTable from "@/components/MarksTable";

const EditMarks = async ({ params }: { params: { id: string } }) => {
	const marks = await getProjectMarks({ project_id: Number(params.id) });
	const members = await getProjectMembers(Number(params.id));
	const phase = await getAllPhase({ project_id: Number(params.id) });
	if (!phase) return "Phases Empty";
	if (!members) return "Members Empty";
	return (
		<div className="p-5">
			<div className="text-xl font-bold mb-4">Marks:</div>
			<RenderTable
				phase={phase}
				members={members}
				marks={marks}
				project_id={Number(params.id)}
			/>
		</div>
	);
};

export default EditMarks;
