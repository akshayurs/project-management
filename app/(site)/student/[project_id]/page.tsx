import getAllChats from "@/actions/getAllChats";
import getComments from "@/actions/getComments";
import getProfile from "@/actions/getProfile";
import getProjectDetails from "@/actions/getProjectDetails";
import getProjectMembers from "@/actions/getProjectMembers";
import Chats from "@/components/Chats";
import RefreshChat from "@/components/RefreshChat";
import SendChat from "@/components/SendChat";
import { Profile } from "@/types/types";
import { Button, Divider } from "antd";
import Link from "next/link";

export default async function Project({
	params,
}: {
	params: { project_id: string };
}) {
	const profile = await getProfile();
	const members = await getProjectMembers(Number(params.project_id));
	const { project, event } = await getProjectDetails(
		Number(params.project_id)
	);
	const chats = await getAllChats({ project_id: Number(params.project_id) });
	const comments = (
		await Promise.all(
			chats.map(async (chat) => await getComments({ chat_id: chat.id }))
		)
	).reverse();

	if (!members) return;
	if (!profile) return;

	return (
		<>
			<div className="flex justify-evenly m-2 p-5 items-center">
				<div className="bg-black shadow-md backdrop-blur-[1px] p-7 bg-opacity-5 text-center rounded-lg">
					<div>
						<span className="font-bold text-lg">Subject: </span>
						<span className="text-lg">{event?.name}</span>
					</div>
					<div>
						<span className="font-bold text-lg">
							Project Name:{" "}
						</span>
						<span className="text-lg">{project?.name}</span>
					</div>
				</div>
				<div className="bg-black shadow-md p-7 backdrop-blur-[1px] bg-opacity-5 text-center rounded-lg">
					<div>
						<div className="text-lg font-bold">Mentor:</div>
						<div>
							{members?.map((member) => {
								if (member.id != project?.mentor_id) return;
								return (
									<div key={"mentor-member-id" + member.id}>
										<span className="mr-2">
											{member.name} -{" "}
										</span>
										<span>{member.email}</span>
									</div>
								);
							})}
						</div>
					</div>
					<hr></hr>
					<div>
						<div className="text-lg font-bold">Students:</div>
						<div>
							{members?.map((member) => {
								if (member.id == project?.mentor_id) return;
								return (
									<div
										className="mt-1"
										key={"student-member-id" + member.id}
									>
										<span className="mr-2">
											{member.name} -
										</span>
										<span>{member.email}</span>
									</div>
								);
							})}
							{!!project?.members &&
								project.members.map((member) => {
									if (
										!members.find(
											(person) => person.email == member
										)
									) {
										return (
											<div className="mt-1">
												{member + " (Not Registered)"}
											</div>
										);
									}
								})}
						</div>
					</div>
				</div>
			</div>
			{profile.type == "mentor" && (
				<div className="flex justify-center">
					<Link href={`/marks/${project?.id}`}>
						<Button type="primary">Update Marks</Button>
					</Link>
				</div>
			)}
			<SendChat
				project_id={Number(params.project_id)}
				user_id={profile.id}
			/>
			<RefreshChat />
			<div>
				{chats.reverse().map((chat, index) => {
					return (
						<Chats
							comments={comments[index]}
							chat={chat}
							key={"chat-id" + chat.id}
							members={members}
							sender={
								members.find(
									(member) => member.id === chat.sender_id
								) as Profile
							}
							profile={profile}
						/>
					);
				})}
			</div>
		</>
	);
}
