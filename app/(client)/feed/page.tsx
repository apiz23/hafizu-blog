import GradualSpacing from "@/components/magicui/gradual-spacing";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Page() {
	return (
		<>
			<div className="px-5 pt-32 min-h-screen">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-20"
					text="Feed Sharing"
				/>
				<ScrollArea className="h-[80vh] max-w-2xl mx-auto">Scroll Areas</ScrollArea>
			</div>
		</>
	);
}
