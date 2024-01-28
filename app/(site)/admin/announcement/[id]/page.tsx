import getAllAnnouncements from "@/actions/getAnnouncements";
import Announcement from "@/components/Announcement";

async function AnnouncementPage({ params }: { params: { id: string } }) {
	const announcements = await getAllAnnouncements({
		event_id: Number(params.id),
	});

	return (
		<div>
			<Announcement
				announcements={announcements}
				event_id={Number(params.id)}
			/>
		</div>
	);
}

export default AnnouncementPage;
