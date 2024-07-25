import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Page() {
	return (
		<>
			<div className="px-5 pt-32 min-h-screen">
				<ScrollArea className="h-[80vh] max-w-2xl mx-auto">Scroll Areas</ScrollArea>
			</div>
		</>
	);
}
