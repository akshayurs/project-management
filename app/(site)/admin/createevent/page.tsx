"use client";
import React from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import { sendReq } from "@/utils/sendReq";
import { useRouter } from "next/navigation";

const onFinish = async (values: any) => {
	return await sendReq({
		url: "/api/event",
		method: "POST",
		body: values,
		loading: "Creating",
		success: "Created",
	});
};

type FieldType = {
	name: string;
	start_date: Date;
	end_date: Date;
};

const CreateEvent = () => {
	const router = useRouter();
	return (
		<Form
			name="create_update_event"
			initialValues={{ remember: true }}
			onFinish={async (values) => {
				await onFinish(values);
				router.back();
				router.refresh();
			}}
			layout="vertical"
			autoComplete="off"
			className="m-10 max-w-md mx-auto"
		>
			<Form.Item<FieldType>
				label="Event Name"
				name="name"
				rules={[
					{ required: true, message: "Please input Event Name!" },
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item<FieldType> label="Start Date" name="start_date">
				<DatePicker />
			</Form.Item>

			<Form.Item<FieldType> label="End Date" name="end_date">
				<DatePicker />
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateEvent;
