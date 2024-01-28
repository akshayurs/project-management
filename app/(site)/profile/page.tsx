import getProfile from "@/actions/getProfile";
import Profile from "@/components/Profile";

export default async function Page() {
	const profile = await getProfile();
	return <Profile profile={profile} />;
}
