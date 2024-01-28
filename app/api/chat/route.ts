import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const supabase = createClient(cookies());
	const data = await supabase.from("chats").insert(body);
	return NextResponse.json({ success: data.error == null, data });
}

export async function DELETE(request: NextRequest) {
	if (!request.nextUrl.searchParams.has("id")) {
		return NextResponse.json({ success: false, message: "Id is required" });
	}
	const id = request.nextUrl.searchParams.get("id");
	const supabase = createClient(cookies());
	const { data } = await supabase
		.from("chats")
		.select()
		.eq("id", Number(id))
		.maybeSingle();
	if (data?.attachment != null) {
		await supabase.storage.from("chats").remove([data.attachment]);
	}
	const deletedInfo = await supabase
		.from("chats")
		.delete()
		.eq("id", Number(id));
	return NextResponse.json({ success: deletedInfo.error == null, data });
}

export async function GET(request: NextRequest) {
	const name = request.nextUrl.searchParams.get("name");
	if (name === null) {
		return NextResponse.json({
			success: false,
			message: "name is required",
		});
	}
	const alias = request.nextUrl.searchParams.get("alias");
	const supabase = createClient(cookies());
	const { data, error } = await supabase.storage.from("chats").download(name);
	if (data == null) return NextResponse.json({ success: false });
	const headers = new Headers();
	headers.set("Content-disposition", `attachment; filename=${alias}`);
	headers.set("Content-type", "application/octet-stream");
	return new NextResponse(data, { status: 200, statusText: "OK", headers });
}
