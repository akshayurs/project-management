"use client";
import { useRouter } from "next/navigation";
import { sendReq } from "@/utils/sendReq";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteAll({ event_id }: { event_id: Number }) {
	const router = useRouter();
	return (
		<div className="flex justify-end m-1">
			<Button
				className="bg-red-400 text-white"
				onClick={async () => {
					await sendReq({
						url: "/api/project/admin?event_id=" + event_id,
						method: "DELETE",
						loading: "Deleting",
						success: "Deleted",
					});
					router.refresh();
				}}
				icon={<DeleteOutlined color="red" />}
			>
				Delete All
			</Button>
		</div>
	);
}

export default DeleteAll;
