"use client";

import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Landing from "./landing/page";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();

			setTimeout(() => {
				setIsLoading(false);
				document.body.style.cursor = "default";
				window.scrollTo(0, 0);
			}, 2000);
		})();
	}, []);

	return (
		<>
			<main className="min-h-screen bg-white dark:bg-black">
				<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
				{/* <Landing /> */}
				<div className="text-center px-10 pt-28">
					<h1 className="scroll-m-20 md:text-7xl mc-auto text-4xl font-extrabold tracking-tight">
						Welcome to my blog
					</h1>
					<p className="leading-7 px-10 [&:not(:first-child)]:mt-6 text-zinc-400">
						One of the source of learning material for my Studies Journey
					</p>
				</div>
				
			</main>
		</>
	);
}
