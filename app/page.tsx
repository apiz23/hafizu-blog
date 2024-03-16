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
				<div className="w-full flex justify-center p-10">
					<h1 className="scroll-m-20 md:text-5xl text-2xl font-extrabold tracking-tight lg:text-5xl">
						Welcome to my blog
					</h1>
				</div>
			</main>
		</>
	);
}
