import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const supabase = createClient(cookies());
	const data = await supabase.from("announcements").insert(body);
	return NextResponse.json({ success: data.error == null, data });
}

export async function DELETE(request: NextRequest) {
	if (!request.nextUrl.searchParams.has("id")) {
		return NextResponse.json({ success: false, message: "Id is required" });
	}
	const id = request.nextUrl.searchParams.get("id");
	const supabase = createClient(cookies());
	const data = await supabase
		.from("announcements")
		.delete()
		.eq("id", Number(id));
	return NextResponse.json({ success: data.error == null, data });
}
