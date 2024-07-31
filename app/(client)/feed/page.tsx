import GradualSpacing from "@/components/magicui/gradual-spacing";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
	return (
		<>
			<div className="px-5 pt-32 min-h-screen">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-20"
					text="Feed Sharing"
				/>
				<ScrollArea className=" rounded-sm h-[65vh] md:h-[80vh] max-w-3xl mx-auto mb-5 bg-zinc-600 p-4">
					Scroll Areas
				</ScrollArea>
			</div>
		</>
	);
}
