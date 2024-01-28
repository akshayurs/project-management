"use client";
import { Marks, Phases, Profile } from "@/types/types";
import { sendReq } from "@/utils/sendReq";
import { Button, InputNumber } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";

function RenderTable({
	phase,
	members,
	marks,
	project_id,
}: {
	phase: Phases[];
	members: Profile[];
	marks: Marks[];
	project_id: number;
}) {
	console.log({ phase, members, marks });
	const [changedMarks, setChangedMarks] = useState<Partial<Marks>[]>(marks);
	console.log(changedMarks);
	const columns: ColumnsType<any> = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
		},
		...phase.map((i) => ({
			key: i.name,
			title: i.name,
			dataIndex: i.id,
			render: (_: any, data: any) => (
				<div>
					<InputNumber
						onChange={(e) => {
							setChangedMarks((old) => {
								const s = old.find(
									(o) =>
										o.phase_id == i.id &&
										o.profile_id == data.profile_id
								);
								console.log({ s });
								if (s) {
									return [
										...old.filter((o) => o != s),
										{ ...s, marks: parseFloat(String(e)) },
									];
								}
								return [
									...old,
									{
										marks: e,
										phase_id: i.id,
										profile_id: data.profile_id,
										project_id,
									},
								];
							});
						}}
						min={i.min_marks}
						max={i.max_marks}
						value={data[i.id]}
					></InputNumber>
				</div>
			),
		})),
	];
	const dataSource = members
		?.map((member) => {
			if (member.type == "mentor") return;
			const data: Record<string, any> = {
				name: member.name,
				profile_id: member.id,
			};
			changedMarks
				.filter((i) => i.profile_id == member.id)
				.map((m) => {
					if (m.phase_id) data[m.phase_id] = m.marks;
				});
			return data;
		})
		.filter((i) => i);
	return (
		<div>
			<Table
				dataSource={dataSource.map((e, ind) => ({ ...e, key: ind }))}
				columns={columns}
			/>
			<div className="flex justify-end">
				<Button
					type="primary"
					onClick={async () => {
						await sendReq({
							url: "/api/marks",
							method: "PUT",
							body: changedMarks,
							success: "Updated",
							loading: "Updating",
						});
					}}
				>
					Save Changes
				</Button>
			</div>
		</div>
	);
}

export default RenderTable;
