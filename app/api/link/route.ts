"use server";

import supabase from "@/lib/supabase";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: any, res: NextApiResponse) {
	try {
		const { data, error } = await supabase.from("link").select("*");
		if (error) {
			throw error;
		}

		return NextResponse.json(data);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
}
