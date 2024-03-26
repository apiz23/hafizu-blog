import supabase from "@/lib/supabase";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// export async function GET() {
// 	try {
// 		const { data, error } = await supabase.from("link").select("*");

// 		if (error) {
// 			throw error;
// 		}

// 		return NextResponse.json(data);
// 	} catch (error: any) {
// 		console.error("Error fetching data from Supabase:", error.message);
// 	}
// }

export async function GET(req: Request, context: any, res: NextApiResponse) {
	const { params } = context;

	try {
		const linkId = params?.linkId;

		const { data, error } = await supabase
			.from("link")
			.select("*")
			.eq("id", linkId);
		if (error) {
			throw error;
		}

		return NextResponse.json(data);
	} catch (error: any) {
		return res.status(500).json({ error: error.message });
	}
}

export async function DELETE(req: Request, context: any) {
	const { params } = context;
	try {
		const linkId = params?.linkId;

		const { error } = await supabase.from("link").delete().eq("id", linkId);

		if (error) {
			throw error;
		}

		return NextResponse.json({ message: "Link deleted successfully" });
	} catch (error: any) {
		return new NextResponse(JSON.stringify({ error: error.message }), {
			status: 500,
		});
	}
}
