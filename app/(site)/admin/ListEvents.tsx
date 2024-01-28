"use client";
import { Events } from "@/types/types";
import { sendReq } from "@/utils/sendReq";
import {
	DeleteOutlined,
	EditOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from "@ant-design/icons";
import { Button, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ListAllEvents({ events }: { events: Events[] }) {
	const router = useRouter();
	const columns: ColumnsType<Events> = [
		{
			key: "name",
			title: "Event Name",
			dataIndex: "name",
		},
		{
			key: "end_date",
			title: "End Date",
			dataIndex: "end_date",
		},
		{
			key: "start_date",
			title: "Start Date",
			dataIndex: "start_date",
		},
		{
			key: "created_at",
			title: "Created",
			dataIndex: "created_at",
			render: (val) => new Date(val).toDateString(),
		},
		{
			key: "projects",
			title: "Projects",
			dataIndex: "id",
			render: (id) => (
				<Link href={"/admin/listprojects/" + id}>
					<Button className="flex justify-center items-center  ">
						<EditOutlined />
					</Button>
				</Link>
			),
		},
		{
			key: "announcement",
			title: "Announcement",
			dataIndex: "id",
			render: (id) => (
				<Link href={"/admin/announcement/" + id}>
					<Button className="flex justify-center items-center">
						<EditOutlined />
					</Button>
				</Link>
			),
		},
		{
			key: "editphase",
			title: "Phase/Eval",
			dataIndex: "id",
			render: (id) => (
				<Link href={"/admin/editphase/" + id}>
					<Button className="flex justify-center items-center">
						<EditOutlined />
					</Button>
				</Link>
			),
		},
		{
			key: "final",
			title: "Marks",
			dataIndex: "id",
			render: (id) => (
				<Link href={"/marks/final/" + id}>
					<Button className="flex justify-center items-center">
						<EyeOutlined />
					</Button>
				</Link>
			),
		},
		{
			key: "edit",
			title: "Edit",
			dataIndex: "id",
			render: (id) => (
				<Link href={"/admin/createevent/" + id}>
					<Button className="flex justify-center items-center">
						<EditOutlined />
					</Button>
				</Link>
			),
		},
		{
			key: "delete",
			title: "Delete",
			dataIndex: "id",
			render: (id) => (
				<Button
					className="flex justify-center items-center text-red-700"
					onClick={async () => {
						const res = await sendReq({
							url: "/api/event?id=" + id,
							method: "DELETE",
							loading: "Deleting",
							success: "Deleted",
						});
						router.refresh();
					}}
				>
					<DeleteOutlined color="red" />
				</Button>
			),
		},
	];
	return (
		<>
			<Table dataSource={events} columns={columns} />
		</>
	);
}
