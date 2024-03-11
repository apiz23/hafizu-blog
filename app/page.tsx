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
			<main className="min-h-screen">
				<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
				{/* <Landing /> */}
				<div className="min-h-screen my-20">Hafiz</div>
			</main>
		</>
	);
}
