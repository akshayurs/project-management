"use client";
import { sendReq } from "@/utils/sendReq";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddComment({
	chat_id,
	user_id,
}: {
	chat_id: Number;
	user_id: Number;
}) {
	const [comment, setComment] = useState("");
	const router = useRouter();
	return (
		<div className="flex">
			<Input
				placeholder="Add Comment"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
			/>
			{comment.trim() != "" && (
				<Button
					onClick={async () => {
						await sendReq({
							url: "/api/comment",
							method: "POST",
							body: {
								chat_id,
								message: comment,
								sender_id: user_id,
							},
							loading: "Sending",
							success: "Sent",
						});
						setComment("");
						router.refresh();
					}}
				>
					Send
				</Button>
			)}
		</div>
	);
}

export default AddComment;
