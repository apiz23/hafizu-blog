import supabase from "@/lib/supabase";
import { NextResponse } from "next/server";
import { toast } from "sonner";

export async function GET(
	req: Request,
	{ params }: { params: { linkId: string } }
) {
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
		toast.error("Error fetching data from Supabase:", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { linkId: string } }
) {
	try {
		const linkId = params?.linkId;
		const { error } = await supabase.from("link").delete().eq("id", linkId);

		if (error) {
			throw error;
		}

		return NextResponse.json({ message: "Link deleted successfully" });
	} catch (error: any) {
		toast.error("Error deleting data from Supabase:", error.message);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
