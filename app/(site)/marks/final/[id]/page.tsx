import RenderTable from "@/components/MarksTable";
import getFinalMarks from "@/actions/getFinalMarks";

const FinalMarks = async ({ params }: { params: { id: string } }) => {
	const { marks, members, phase } = await getFinalMarks({
		event_id: Number(params.id),
	});
	if (!phase) return "Phases Empty";
	if (!members) return "Members Empty";
	console.log({ marks, members, phase });
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

export default FinalMarks;
