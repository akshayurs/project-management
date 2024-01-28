"use client";
import { Chats, Comments, Profile } from "@/types/types";
import AddComment from "./AddComment";
import {
	DeleteOutlined,
	DownloadOutlined,
	EyeOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, message } from "antd";
import { sendReq } from "@/utils/sendReq";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import getColor from "@/utils/getColor";

function Chats({
	chat,
	sender,
	members,
	profile,
	comments,
}: {
	chat: Chats;
	sender: Profile;
	profile: Profile;
	members: Profile[];
	comments: Comments[];
}) {
	const router = useRouter();
	const supabase = createClient();
	let publicUrl = null;
	if (chat.attachment !== null) {
		const { data } = supabase.storage
			.from("chats")
			.getPublicUrl(chat.attachment as string);
		publicUrl = data.publicUrl;
	}

	return (
		<div className="p-5 m-5 mt-2 bg-black bg-opacity-5 backdrop-blur-[2px] shadow-md rounded-md">
			<div className="flex items-center gap-3">
				<Avatar
					style={{
						background: getColor(sender.name.toUpperCase()),
					}}
				>
					{sender.name[0].toUpperCase()}
				</Avatar>
				<div className="flex-1">
					<div>
						{sender.name}
						{sender.id == profile.id && " (You) "}
						{sender.type == "mentor" && "⭐"}
					</div>
					<div className="text-sm">
						{new Date(chat.created_at).toTimeString().slice(0, 8)}{" "}
						{new Date(chat.created_at).toDateString()}
					</div>
				</div>
				{chat.sender_id == profile.id && (
					<div>
						<DeleteOutlined
							style={{
								color: "red",
							}}
							onClick={async () => {
								await sendReq({
									url: "/api/chat?id=" + chat.id,
									method: "DELETE",
									loading: "Deleting",
									success: "Deleted",
								});
								router.refresh();
							}}
						/>
					</div>
				)}
			</div>
			<div className="my-2 mx-1">{chat.message}</div>
			{chat.attachment !== null && (
				<div className="space-x-2">
					<Button
						icon={<DownloadOutlined />}
						onClick={async () => {
							router.push(
								`/api/chat?name=${chat.attachment}&alias=${chat.attachment_name}`
							);
							message.loading("Download Started");
						}}
					>
						{chat.attachment_name}
					</Button>
					{publicUrl && (
						<Link href={publicUrl}>
							<Button icon={<EyeOutlined />}>View Online</Button>
						</Link>
					)}
				</div>
			)}
			{!!comments.length && (
				<div className="p-2 m-1 rounded-lg bg-black bg-opacity-5">
					{!!comments.length && (
						<div className="text-lg mb-2">Comments:</div>
					)}
					{comments.map((comment, index) => (
						<div key={"comments-id" + comment.id}>
							<div className="flex items-center gap-2">
								<Avatar
									style={{
										background: getColor(
											members
												.find(
													(member) =>
														member.id ==
														comment.sender_id
												)
												?.name[0].toUpperCase() || "A"
										),
									}}
								>
									{members
										.find(
											(member) =>
												member.id == comment.sender_id
										)
										?.name[0].toUpperCase()}
								</Avatar>
								<div>
									<div>
										{
											members.find(
												(member) =>
													member.id ==
													comment.sender_id
											)?.name
										}
										{comment.sender_id == profile.id &&
											" (You) "}
										{members.find(
											(member) =>
												member.id == comment.sender_id
										)?.type == "mentor" && "⭐"}
									</div>
									<div className="text-sm">
										{new Date(comment.created_at)
											.toTimeString()
											.slice(0, 8)}{" "}
										{new Date(
											comment.created_at
										).toDateString()}
									</div>
								</div>
							</div>
							<div className="ml-3 mt-2">{comment.message}</div>
							{comments.length - 1 !== index && (
								<Divider className="my-3" />
							)}
						</div>
					))}
				</div>
			)}
			<AddComment chat_id={chat.id} user_id={profile.id} />
		</div>
	);
}

export default Chats;
