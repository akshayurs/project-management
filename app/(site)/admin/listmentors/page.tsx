import getAllMentors from "@/actions/getAllMentors";
import { Profile } from "@/types/types";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export default async function ListAll() {
	const mentors = await getAllMentors();
	const columns: ColumnsType<Profile> = [
		{
			key: "usn",
			title: "usn",
			dataIndex: "usn",
		},
		{
			key: "name",
			title: "name",
			dataIndex: "name",
		},
		{
			key: "branch",
			title: "branch",
			dataIndex: "branch",
		},
		{
			key: "email",
			title: "email",
			dataIndex: "email",
		},
		{
			key: "created_at",
			title: "created_at",
			dataIndex: "created_at",
		},
	];
	if (mentors == null) return "Empty";

	return (
		<div className="p-5">
			<div className="text-xl font-bold mb-3">
				Mentors ({mentors?.length})
			</div>
			<Table
				dataSource={
					mentors?.map((mentor) => ({
						...mentor,
						key: `mentor-row-${mentor.id}`,
					})) ?? []
				}
				columns={columns}
			/>
		</div>
	);
}
