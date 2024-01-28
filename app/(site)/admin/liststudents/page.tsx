import getAllStudents from "@/actions/getAllStudents";
import { Profile } from "@/types/types";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

export default async function ListAll() {
	const students = await getAllStudents();
	console.log({ students });
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
	if (students == null) return "Empty";
	return (
		<div className="p-5">
			<div className="text-xl font-bold mb-3">
				Students ({students?.length})
			</div>
			<Table
				dataSource={
					students.map((student) => ({
						...student,
						key: `student-row-${student.id}`,
					})) ?? []
				}
				columns={columns}
			/>
		</div>
	);
}
