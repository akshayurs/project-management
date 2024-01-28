"use client";

import { ReloadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RefreshChat() {
	useEffect(() => {
		const interval = setInterval(async () => {
			router.refresh();
			console.log("Refreshing chats");
		}, (60 * 1000) / 2);
		return () => clearInterval(interval);
	}, []);
	const router = useRouter();
	return (
		<div className="flex justify-center">
			<Button
				onClick={() => {
					router.refresh();
					message.success("Up to Date");
				}}
				icon={<ReloadOutlined />}
			>
				Refresh
			</Button>
		</div>
	);
}

export default RefreshChat;
