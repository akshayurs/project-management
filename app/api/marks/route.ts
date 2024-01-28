import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
	const body = await request.json();
	const supabase = createClient(cookies());

	const results = await Promise.all(
		body.map(async (item: any) => {
			if (item.id) {
				const { data: updatedData, error: updateError } = await supabase
					.from("marks")
					.upsert([item], { onConflict: "id" });

				if (updateError) {
					console.error("Error updating row:", updateError);
					// Handle update error
					return { success: false, data: null };
				}

				return { success: true, data: updatedData };
			} else {
				// If id is not present, insert a new row
				const { data: insertedData, error: insertError } =
					await supabase.from("marks").insert([item]);

				if (insertError) {
					console.error("Error inserting row:", insertError);
					// Handle insert error
					return { success: false, data: null };
				}

				return { success: true, data: insertedData };
			}
		})
	);

	const overallSuccess = results.every((result) => result.success);

	return NextResponse.json({ success: overallSuccess, data: results });
}
