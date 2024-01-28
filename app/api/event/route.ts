import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const supabase = createClient(cookies());
	const data = await supabase.from("events").insert(body);
	return NextResponse.json({ success: data.error == null, data });
}
export async function PUT(request: NextRequest) {
	if (!request.nextUrl.searchParams.has("id")) {
		return NextResponse.json({
			success: false,
			message: "Id is required",
		});
	}
	const id = request.nextUrl.searchParams.get("id");

	const body = await request.json();
	const supabase = createClient(cookies());
	const data = await supabase
		.from("events")
		.update(body)
		.eq("id", Number(id));
	return NextResponse.json({ success: data.error == null, data });
}
export async function GET(request: NextRequest) {
	const supabase = createClient(cookies());
	if (!request.nextUrl.searchParams.has("id")) {
		return NextResponse.json({ success: false, message: "Id is required" });
	}
	const id = request.nextUrl.searchParams.get("id");

	const data = await supabase
		.from("events")
		.select()
		.eq("id", Number(id))
		.maybeSingle();
	return NextResponse.json({ success: data.error == null, data: data.data });
}

export async function DELETE(request: NextRequest) {
	if (!request.nextUrl.searchParams.has("id")) {
		return NextResponse.json({ success: false, message: "Id is required" });
	}
	const id = request.nextUrl.searchParams.get("id");
	const supabase = createClient(cookies());
	const data = await supabase.from("events").delete().eq("id", Number(id));
	return NextResponse.json({ success: data.error == null, data });
}
