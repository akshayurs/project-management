"use client";
import { Announcements, Events, Profile, Projects } from "@/types/types";
import getColor from "@/utils/getColor";
import { EyeOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Table } from "antd";
import Link from "next/link";

export default function Dashboard({
	profile,
	projects,
	events,
	announcements,
}: {
	profile: Profile | null;
	projects: Projects[];
	events: Events[];
	announcements: Announcements[];
}) {
	const columns = [
		{
			title: "Message",
			dataIndex: "message",
			key: "message",
		},
		{
			title: "Event",
			dataIndex: "event_id",
			key: "event",
			render: (_: any, val: any) => {
				return (
					<div>
						{events.find((event) => event.id == val.event_id)?.name}
					</div>
				);
			},
		},
		{
			title: "Created At",
			dataIndex: "created_at",
			key: "created_at",
			render: (text: Date) => (
				<div>
					{new Date(text).toTimeString().slice(0, 8)}{" "}
					{new Date(text).toDateString()}
				</div>
			),
		},
	];
	return (
		<div className="">
			<div className="mx-auto w-96 text-center rounded-xl px-7 py-3 m-4 shadow-md bg-white">
				<div className="flex items-center gap-3 justify-center">
					<div>
						<Avatar
							style={{
								background: getColor(
									profile?.name.toUpperCase()[0] || "A"
								),
							}}
							size={50}
						>
							{profile?.name.toUpperCase()[0]}
						</Avatar>
					</div>
					<div className="text-left">
						<div className="text-xl">{profile?.name}</div>
						<div>{profile?.email}</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<Link href={"/profile"}>
					<Button type="primary" className="px-5 py-1">
						Edit Profile
					</Button>
				</Link>
			</div>
			<div className="p-10">
				<div className="text-3xl font-bold mb-5">
					Announcements ({announcements.length})
				</div>
				<Table
					dataSource={announcements}
					columns={columns}
					size="large"
					bordered
					pagination={{ pageSize: 10 }}
				/>
				<div className="mt-4 text-3xl font-bold mb-5">
					Projects ({projects.length})
				</div>

				<div className="grid  gap-3 md:grid-cols-4 sm:grid-cols-1">
					{projects.map((project) => (
						<Link
							href={"/student/" + project.id}
							key={"project-id" + project.id}
						>
							<div className=" shadow-md w-60 min-h-12 bg-white rounded-md p-6 hover:scale-105 hover:shadow-xl">
								<div className="text-xl mb-2">
									{
										events.find(
											(event) =>
												event.id == project.event_id
										)?.name
									}
								</div>
								<div>{project.name}</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
