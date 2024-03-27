import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { data, error } = await supabase.from("link").select("*");

		if (error) {
			throw error;
		}

		return NextResponse.json(data);
	} catch (error: any) {
		console.error("Error fetching data from Supabase:", error.message);
	}
}
