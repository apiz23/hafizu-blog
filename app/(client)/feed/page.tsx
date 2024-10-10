import GradualSpacing from "@/components/magicui/gradual-spacing";

export default function Page() {
	return (
		<>
			<div className="px-5 pt-24 min-h-screen">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-20"
					text="Feed Sharing"
				/>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<div className="w-full mx-auto mb-5 border-2 rounded-md p-4 bg-black">Item</div>
				</div>
			</div>
		</>
	);
}
