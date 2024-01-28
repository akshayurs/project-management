"use client";
import useSession from "@/hooks/use-session";
import { Button } from "antd";
import Link from "next/link";

export default function Index() {
	const { data: session } = useSession();
	return (
		<div className="mt-12">
			<div className="flex-1 w-full flex flex-col gap-20 items-center">
				{session ? (
					<Link href={"/dashboard"}>
						<Button type="primary">View Dashboard</Button>
					</Link>
				) : (
					<Link href={"/login"}>
						<Button type="primary">Get Started</Button>
					</Link>
				)}
			</div>
			<div className="max-w-7xl text-lg font-mono font-thin mx-auto mt-5 text-justify">
				Welcome to our cutting-edge project management website, where
				seamless collaboration meets efficient organization! Elevate
				your project management experience with our user-friendly
				platform designed to empower teams, streamline workflows, and
				ensure project success. From intuitive task assignment and
				real-time progress tracking to robust communication tools and
				customizable project timelines, our feature-rich interface
				caters to the diverse needs of every project, whether big or
				small. Dive into a world of enhanced productivity with
				collaborative document sharing, milestone tracking, and
				insightful analytics that provide a comprehensive overview of
				your project's performance. Harness the power of our dynamic
				project management tools to facilitate communication, boost
				accountability, and foster a culture of innovation within your
				team. Join us on a journey towards unparalleled project
				efficiency – where deadlines are met with ease, milestones are
				celebrated, and success becomes a shared achievement. Your
				projects, our priority – experience the future of project
				management with our all-encompassing platform!
			</div>
		</div>
	);
}
