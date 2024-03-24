"use client";

import Preloader from "@/components/Preloader";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Landing from "./landing/page";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return (
		<>
			<main className="min-h-screen bg-white dark:bg-black">
				<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
				{/* <Landing /> */}
				<div className="text-center px-10 pt-28 h-[50vh]">
					<h1
						className="scroll-m-20 md:text-7xl mc-auto text-4xl font-extrabold tracking-tight"
						data-scroll
						data-scroll-speed="0.5"
					>
						Welcome to my blog
					</h1>
					<p
						className="leading-7 px-10 [&:not(:first-child)]:mt-6 text-zinc-400"
						data-scroll
						data-scroll-speed="0.7"
					>
						One of the source of learning material for my Studies Journey
					</p>
				</div>
			</main>
		</>
	);
}
