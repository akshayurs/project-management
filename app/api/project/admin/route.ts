import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const supabase = createClient(cookies());
	const { data, error } = await supabase.from("projects").insert(body);
	return NextResponse.json({ success: error == null, data, error });
}
export async function PUT(request: NextRequest) {
	if (!request.nextUrl.searchParams.has("event_id")) {
		return NextResponse.json({
			success: false,
			message: "Id is required",
		});
	}
	const body = await request.json();
	const supabase = createClient(cookies());

	const data = await supabase
		.from("projects")
		.upsert(body, { onConflict: "id" });

	return NextResponse.json({ success: data.error == null, data });
}
export async function GET(request: NextRequest) {
	const supabase = createClient(cookies());
	if (!request.nextUrl.searchParams.has("event_id")) {
		return NextResponse.json({ success: false, message: "Id is required" });
	}
	const event_id = request.nextUrl.searchParams.get("event_id");

	const data = await supabase
		.from("projects")
		.select()
		.eq("event_id", Number(event_id))
		.maybeSingle();
	return NextResponse.json({ success: data.error == null, data: data.data });
}

export async function DELETE(request: NextRequest) {
	if (!request.nextUrl.searchParams.has("event_id")) {
		return NextResponse.json({ success: false, message: "Id is required" });
	}
	const event_id = request.nextUrl.searchParams.get("event_id");
	const supabase = createClient(cookies());
	const data = await supabase
		.from("projects")
		.delete()
		.eq("event_id", Number(event_id));
	return NextResponse.json({ success: data.error == null, data });
}
