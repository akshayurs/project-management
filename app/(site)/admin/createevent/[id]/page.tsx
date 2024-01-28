"use client";
import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import { sendReq } from "@/utils/sendReq";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
type FieldType = {
	name: string;
	start_date: Date;
	end_date: Date;
};

const UpdateEvent = ({ params }: { params: { id: string } }) => {
	const onFinish = async (values: any) => {
		return await sendReq({
			url: "/api/event?id=" + params.id,
			method: "PUT",
			body: values,
			loading: "Updating",
			success: "Updated",
		});
	};
	const router = useRouter();
	const [form] = Form.useForm();
	useEffect(() => {
		(async () => {
			const data = await sendReq({
				url: "/api/event?id=" + params.id,
				method: "GET",
			});
			const val = data.data;
			form.setFieldsValue({
				...val,
				start_date:
					val.start_date == null ? null : moment(val.start_date),
				end_date: val.end_date == null ? null : moment(val.end_date),
			});
		})();
	}, []);
	return (
		<Form
			form={form}
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
				<Button htmlType="submit">Submit</Button>
			</Form.Item>
		</Form>
	);
};

export default UpdateEvent;
