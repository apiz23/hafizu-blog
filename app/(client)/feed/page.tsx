import GradualSpacing from "@/components/magicui/gradual-spacing";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
	return (
		<>
			<div className="px-5 pt-24 min-h-screen">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-20"
					text="Feed Sharing"
				/>
				<ScrollArea className="h-[65vh] md:h-[60vh] max-w-3xl mx-auto mb-5 border-x-2 p-4">
					Scroll Areas
				</ScrollArea>
			</div>
		</>
	);
}
