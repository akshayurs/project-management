"use client";
import { Profile, Projects } from "@/types/types";
import { sendReq } from "@/utils/sendReq";
import { DeleteOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Form, Input, Select } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

function RenderTable({
	projects,
	mentors,
	event_id,
}: {
	projects: Projects[] | null;
	mentors: Profile[] | null;
	event_id: Number;
}) {
	useEffect(() => {
		if (projects) setProjectsUpdated(projects);
	}, []);
	const [projectsUpdated, setProjectsUpdated] = useState<Projects[]>([]);
	const columns: ColumnsType<Projects> = [
		{
			key: "id",
			title: "No.",
			dataIndex: "index",
		},
		{
			key: "name",
			title: "Project",
			dataIndex: "name",
			render: (val, record) => (
				<Input
					placeholder="Project Name"
					value={val}
					onChange={(newVal) => {
						setProjectsUpdated((prev) => {
							return prev.map((pro) => {
								if (pro.id === record.id) {
									pro.name = newVal.target.value;
								}
								return pro;
							});
						});
					}}
				/>
			),
		},
		{
			key: "members",
			title: "Emails (,)",
			dataIndex: "members",
			render: (val, record) => (
				<Input.TextArea
					placeholder="Project Name"
					value={val.join(", ")}
					onChange={(newVal) => {
						setProjectsUpdated((prev) => {
							return prev.map((pro) => {
								if (pro.id === record.id) {
									pro.members = newVal.target.value
										.replace(
											/(?<=[a-zA-Z])\s(?=[a-zA-Z])/g,
											","
										)
										.replace(/,(?!\s|$)/g, ", ")
										.split(", ")
										.map((item) => item.trim());
								}
								return pro;
							});
						});
					}}
				/>
			),
		},
		{
			key: "mentor_id",
			title: "Mentor",
			dataIndex: "mentor_id",
			render: (mentor_id, record) => {
				const mentorName = mentor_id
					? mentors?.find((mentor) => mentor.id === mentor_id)?.name
					: "";

				return (
					<Select
						showSearch
						style={{ width: 200 }}
						placeholder="Select Mentor"
						defaultValue={mentorName}
						onChange={(value) => {
							const selected = mentors?.find(
								(mentor) => mentor.name === value
							)?.id;
							// Handle the mentor selection logic here
							setProjectsUpdated((prev) => {
								return prev.map((pro) => {
									if (pro.id === record.id) {
										pro.mentor_id = selected ?? null;
									}
									return pro;
								});
							});
						}}
					>
						{mentors?.map((mentor) => (
							<Select.Option
								key={"mentor-id" + mentor.id}
								value={mentor.name}
							>
								{mentor.name}
							</Select.Option>
						))}
					</Select>
				);
			},
		},
		{
			key: "created_at",
			title: "Created at",
			dataIndex: "created_at",
			render: (date) => new Date(date).toLocaleString(),
		},
		{
			key: "delete",
			title: "Delete",
			dataIndex: "id",
			render: (id) => (
				<Button
					className="flex justify-center items-center text-red-700"
					onClick={async () => {
						setProjectsUpdated((prev) =>
							[...prev].filter((item) => item.id != id)
						);
					}}
				>
					<DeleteOutlined color="red" />
				</Button>
			),
		},
	];
	return (
		<>
			<div className="mb-3 font-bold text-xl">
				Projects ({projectsUpdated.length}):
			</div>
			<div className="mb-2">
				Set Default Mentor :{" "}
				<Select
					showSearch
					style={{ width: 200 }}
					placeholder="Select Mentor"
					onChange={(value) => {
						const selected = mentors?.find(
							(mentor) => mentor.name === value
						)?.id;
						// Handle the mentor selection logic here
						setProjectsUpdated((prev) => {
							return prev.map((pro) => {
								pro.mentor_id = selected ?? null;
								return pro;
							});
						});
					}}
				>
					{mentors?.map((mentor) => (
						<Select.Option
							key={"mentor-id" + mentor.id}
							value={mentor.name}
						>
							{mentor.name}
						</Select.Option>
					))}
				</Select>
			</div>
			<Table
				dataSource={
					projectsUpdated?.map((val, index) => ({
						...val,
						index: index + 1,
					})) ?? []
				}
				columns={columns}
			/>
			<div className="flex justify-end m-1">
				<Button
					type="primary"
					onClick={async () => {
						sendReq({
							url: "/api/project/admin?event_id=" + event_id,
							method: "PUT",
							body: projectsUpdated,
							loading: "Updating",
							success: "Updated",
							error: "Error",
						});
					}}
				>
					Save Changes
				</Button>
			</div>
		</>
	);
}

export default RenderTable;
