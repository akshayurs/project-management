"use client";
import { Announcements } from "@/types/types";
import { sendReq } from "@/utils/sendReq";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, List } from "antd";
import { useRouter } from "next/navigation";
function Announcement({
	announcements,
	event_id,
}: {
	announcements: Announcements[];
	event_id: number;
}) {
	const router = useRouter();
	type FieldType = {
		message: string;
	};
	const [form] = Form.useForm();
	return (
		<div className="p-5">
			<List
				size="large"
				className="bg-white"
				header={<div className="text-xl font-bold">Announcements</div>}
				bordered
				dataSource={announcements.map((announcement) => announcement)}
				renderItem={(item) => (
					<List.Item>
						<div className="w-full">{item.message}</div>
						<div className="px-5">
							{new Date(item.created_at)
								.toTimeString()
								.slice(0, 8)}{" "}
							{new Date(item.created_at).toDateString()}
						</div>
						<div>
							<Button
								className="text-red-700"
								icon={<DeleteOutlined />}
								onClick={async () => {
									await sendReq({
										url: "/api/announcement?id=" + item.id,
										method: "DELETE",
										loading: "Deleting",
										success: "Deleted",
									});
									router.refresh();
								}}
							/>
						</div>
					</List.Item>
				)}
			/>
			<Form
				name="create_update_event"
				form={form}
				onFinish={async (values) => {
					await sendReq({
						url: "/api/announcement",
						method: "POST",
						body: {
							...values,
							event_id,
						},
						loading: "Posting",
						success: "Posted",
					});
					router.refresh();
					form.resetFields();
				}}
				layout="vertical"
				autoComplete="off"
				className="m-10 max-w-md mx-auto"
			>
				<Form.Item<FieldType>
					label="New Announcement"
					name="message"
					rules={[
						{ required: true, message: "Please input Event Name!" },
					]}
				>
					<Input placeholder="Message..." />
				</Form.Item>

				<Form.Item className="flex justify-center">
					<Button type="primary" htmlType="submit">
						Post
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Announcement;
