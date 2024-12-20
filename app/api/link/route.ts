"use server";

import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { data, error } = await supabase.from("link").select("*");

		if (error) {
			throw error;
		}

		return NextResponse.json(data, {
			headers: {
				"Cache-Control": "no-store, max-age=0",
			},
		});
	} catch (error: any) {
		console.error("Error fetching data from Supabase:", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
