"use client";
import { Phases } from "@/types/types";
import { sendReq } from "@/utils/sendReq";
import { Button, Form, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

function EditPhase({
	phase,
	event_id,
}: {
	phase: Phases[] | null;
	event_id: Number;
}) {
	const router = useRouter();
	const [form] = Form.useForm();
	const columns: ColumnsType<Phases> = [
		{
			key: "name",
			title: "Name",
			dataIndex: "name",
		},
		{
			key: "min",
			title: "Min Marks",
			dataIndex: "min_marks",
		},
		{
			key: "max",
			title: "Max Marks",
			dataIndex: "max_marks",
		},
	];
	type FieldType = {
		name: string;
		min_marks?: number;
		max_marks?: number;
	};
	const onSubmit = async (body: FieldType) => {
		await sendReq({
			url: "/api/phase",
			method: "POST",
			body: { ...body, event_id },
			loading: "Adding",
			success: "Added",
		});
		form.resetFields();
		router.refresh();
	};
	return (
		<div className="p-10">
			<Table
				className="mx-auto max-w-3xl"
				columns={columns}
				dataSource={phase ?? []}
			/>
			<Form
				className="max-w-xl mt-3 mx-auto"
				name="phase"
				form={form}
				layout="vertical"
				onFinish={onSubmit}
			>
				<Form.Item<FieldType>
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input Phase Name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType> label="Min Marks" name="min_marks">
					<Input />
				</Form.Item>
				<Form.Item<FieldType> label="Max Marks" name="max_marks">
					<Input />
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit">Add New</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default EditPhase;
