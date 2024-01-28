import { Form } from "antd";

function UpdateMarks() {
	return (
		<div>
			<Form
				name="create_update_event"
				initialValues={{ remember: true }}
				onFinish={async (values) => {}}
				layout="vertical"
				autoComplete="off"
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
		</div>
	);
}

export default UpdateMarks;
