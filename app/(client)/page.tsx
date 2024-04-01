"use client";

import Preloader from "@/components/Preloader";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const nextIcon = "/nextjs.svg";
const supabaseIcon = "/supabase.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const containerRef = useRef(null);
	const nextIconRef = useRef(null);
	const supabaseIconRef = useRef(null);

	useEffect(() => {
		// const lenis = new Lenis();
		// lenis.on("scroll", ScrollTrigger.update);

		// gsap.ticker.add((time) => {
		// 	lenis.raf(time * 1000);
		// });

		// gsap.ticker.lagSmoothing(0);
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top center",
				end: "bottom center",
				scrub: true,
			},
		});

		tl
			.to(supabaseIconRef.current, { x: -200, opacity: 100 }, ">")
			.to(nextIconRef.current, { x: 200, opacity: 100 }, "<");
	}, []);

	return (
		<>
			<main className="min-h-screen">
				<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
				<div className="text-center px-10 pt-20 h-[50vh]">
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
					<Link href="/link">
						<Button className="my-10 text-white bg-gray-800 hover:bg-gray-900 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
							Get Started
						</Button>
					</Link>
				</div>
			</main>
			<div className="min-h-screen">
				<div className="flex justify-between py-32" ref={containerRef}>
					<Avatar
						ref={nextIconRef}
						className="bg-white md:w-72 w-44 md:h-72 h-44 md:mx-0 mx-5"
					>
						<AvatarImage src={nextIcon} />
						<AvatarFallback>Next JS</AvatarFallback>
					</Avatar>

					<Avatar
						ref={supabaseIconRef}
						className="bg-black md:w-72 w-44 md:h-72 h-44 md:mx-0 mx-5"
					>
						<AvatarImage src={supabaseIcon} />
						<AvatarFallback>Supabase</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</>
	);
}
