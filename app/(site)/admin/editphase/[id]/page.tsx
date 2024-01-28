import getAllPhase from "@/actions/getAllPhase";
import EditPhase from "@/components/EditPhase";

const EditPhasePage = async ({ params }: { params: { id: string } }) => {
	const phase = await getAllPhase({ event_id: Number(params.id) });
	return <EditPhase phase={phase} event_id={Number(params.id)} />;
};

export default EditPhasePage;
