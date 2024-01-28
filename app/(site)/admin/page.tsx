import { Button } from "antd";
import Link from "next/link";
import ListAllEvents from "./ListEvents";
import getAllEvents from "@/actions/getAllEvents";

async function Admin() {
	const events = await getAllEvents();
	return (
		<div className="p-5">
			<div className="flex gap-4">
				<Link href={"/profile"}>
					<Button>Edit Profile</Button>
				</Link>
				<Link href="/admin/createevent">
					<Button>Create Event</Button>
				</Link>
				<Link href="/admin/listmentors">
					<Button>List All Mentors</Button>
				</Link>
				<Link href={"/admin/liststudents"}>
					<Button>List All Students</Button>
				</Link>
			</div>
			<div className="text-xl mt-4 mb-2 font-bold">
				All Events/Subjects ({events.length}):
			</div>
			<ListAllEvents events={events} />
		</div>
	);
}

export default Admin;
