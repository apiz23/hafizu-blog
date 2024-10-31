import supabase from "@/lib/supabase";
import { toast } from "sonner";

export const handleDownload = async (url: string) => {
	try {
		const { data: publicData } = supabase.storage
			.from("Documents")
			.getPublicUrl(url);
		window.open(publicData.publicUrl);
	} catch (error) {
		toast.error("Error Downloading");
	}
};
