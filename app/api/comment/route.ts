import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const supabase = createClient(cookies());
	const data = await supabase.from("comments").insert(body);
	return NextResponse.json({ success: data.error == null, data });
}
