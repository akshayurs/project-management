"use client";

import { Profile } from "@/types/types";
import { sendReq } from "@/utils/sendReq";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

function NewProject({
	profile,
	event_id,
}: {
	profile: Profile | null;
	event_id: number;
}) {
	type FieldType = {
		name: string;
	};
	const router = useRouter();
	const [form] = Form.useForm();
	return (
		<div>
			<div className="text-xl font-bold my-3">Add New Project</div>
			<Form
				name="new project"
				form={form}
				onFinish={async (values) => {
					await sendReq({
						url: "/api/project/admin",
						method: "POST",
						body: {
							...values,
							event_id,
							created_by_id: profile?.id,
						},
						loading: "Adding",
						success: "Added",
					});
					form.resetFields();
					router.refresh();
					location.reload();
				}}
				className="flex gap-3"
			>
				<Form.Item<FieldType>
					label="Project Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input Project Name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default NewProject;
