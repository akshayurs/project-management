"use client";
import { sendReq } from "@/utils/sendReq";
import { createClient } from "@/utils/supabase/client";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import uniqid from "uniqid";

function SendChat({
	project_id,
	user_id,
}: {
	project_id: Number;
	user_id: Number;
}) {
	const [message, setMessage] = useState("");
	const router = useRouter();
	const supabase = createClient();
	const [file, setFile] = useState<any>();
	const beforeUpload = async (file: any) => {
		if (file) {
			setFile(file);
		}
		return false;
	};
	return (
		<div className="flex items-center p-2 bg-slate-900 bg-opacity-10 m-2 rounded-md shadow-md gap-2">
			<Input.TextArea
				placeholder="New Message..."
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<Upload
				beforeUpload={beforeUpload}
				maxCount={1}
				multiple={false}
				showUploadList={false}
			>
				<Button icon={<UploadOutlined />}>
					{file ? file.name : "Select File"}
				</Button>
			</Upload>
			<Button
				onClick={async () => {
					let body;
					if (file) {
						console.log(file);
						const { data: imageData } = await supabase.storage
							.from("chats")
							.upload(uniqid(), file);
						body = {
							message,
							project_id,
							sender_id: user_id,
							attachment: imageData?.path,
							attachment_name: file.name,
						};
					} else {
						body = {
							message,
							project_id,
							sender_id: user_id,
						};
					}
					await sendReq({
						url: "/api/chat",
						method: "POST",
						body,
						loading: "Sending",
						success: "Sent",
					});
					setFile(null);
					setMessage("");
					router.refresh();
				}}
			>
				Send
			</Button>
		</div>
	);
}

export default SendChat;
