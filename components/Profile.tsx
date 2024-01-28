"use client";
import useSession from "@/hooks/use-session";
import { Profile } from "@/types/types";
import { createClient } from "@/utils/supabase/client";
import { Button, Form, Input, Radio, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login({ profile }: { profile: Profile | null }) {
	const supabase = createClient();
	const router = useRouter();
	const { data: session } = useSession();
	const [form] = Form.useForm();

	type FieldType = {
		name: string;
		usn?: string;
		email: string;
		branch: string;
		type: "student" | "mentor";
	};

	useEffect(() => {
		form.setFieldValue("email", session?.user.email);
	}, [session]);
	const onSubmit = async (values: FieldType) => {
		console.log(form.getFieldValue("type"));
		let error = null;
		if (session === undefined || session === null) return;

		if (profile?.id) {
			const { error: updateError } = await supabase
				.from("profile")
				.update(values)
				.eq("user_id", session?.user.id!);
			error = updateError;
		} else {
			const { error: insertError } = await supabase
				.from("profile")
				.insert({ ...values, user_id: session.user.id });
			error = insertError;
		}

		if (error) {
			console.log(error);
			message.error("Something went wrong");
		}

		router.refresh();
		router.replace("/dashboard");
		message.success("Updated your profile.");
	};
	return (
		<div className="mt-10 w-1/2 mx-auto">
			<Form
				name="profile"
				form={form}
				layout="vertical"
				onFinish={onSubmit}
				initialValues={profile || {}}
			>
				<Form.Item<FieldType>
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input your Name!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item<FieldType> label="Email" name="email">
					<Input disabled />
				</Form.Item>
				<Form.Item label="Type" name="type">
					<Radio.Group>
						<Radio value="student"> Student </Radio>
						<Radio value="mentor"> Mentor </Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item<FieldType>
					label="USN"
					name="usn"
					extra="For Students only"
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="branch"
					rules={[{ required: true, message: "Branch is required" }]}
				>
					<Select placeholder="Select Branch">
						<Select.Option value="CSE">
							Computer Science And Engineering
						</Select.Option>
						<Select.Option value="ISE">
							Information Science And Engineering
						</Select.Option>
						<Select.Option value="EC">
							Electronics and communication
						</Select.Option>
						<Select.Option value="AIML">
							Artificial intelligence and Machine Learning
						</Select.Option>
						<Select.Option value="EEE">
							Electrical and Electronics Engineering
						</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit">Submit</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
