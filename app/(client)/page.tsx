"use client";

import Preloader from "@/components/Preloader";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
const nextIcon = "/next-js.svg";
const supabaseIcon = "/supabase.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { toast } from "sonner";

interface Quote {
	_id: string;
	content: string;
	author: string;
	tags: string[];
	authorSlug: string;
	length: number;
	dateAdded: string;
	dateModified: string;
}

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [quotes, setQuotes] = useState<Quote | null>(null);
	const containerRef = useRef(null);
	const nextIconRef = useRef(null);
	const supabaseIconRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await new Promise((resolve) => setTimeout(resolve, 2000));

				const response = await fetch(
					"https://api.quotable.io/quotes/random?tags=technology,famous-quotes"
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const jsonData = await response.json();
				setQuotes(jsonData);
				console.log(quotes);
			} catch (error: any) {
				toast.error(error);
			}
		};

		fetchData();
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		const lenis = new Lenis();
		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time: any) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: containerRef.current,
				start: "top center",
				end: "bottom center",
				scrub: true,
			},
		});

		if (window.innerWidth > 768) {
			tl
				.to(supabaseIconRef.current, { x: -200, opacity: 100 }, ">")
				.to(nextIconRef.current, { x: 200, opacity: 100 }, "<");
		} else {
			tl
				.to(supabaseIconRef.current, { x: -30, opacity: 100 }, ">")
				.to(nextIconRef.current, { x: 30, opacity: 100 }, "<");
		}
	}, []);
	console.log(quotes);

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
						<Button className="mt-10 text-white bg-gray-800 hover:bg-gray-900 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
							Get Started
						</Button>
					</Link>
				</div>
				<div className="max-w-2xl p-5 mx-auto">
					<blockquote className="mt-6 border-l-2 pl-6 italic">
						{quotes &&
							quotes.map((quote: any) => (
								<div key={quote._id}>
									<h3 className="text-wrap">{quote.content}</h3>
									<p className="float-right">Author: {quote.author}</p>
								</div>
							))}
					</blockquote>
				</div>
			</main>
			<main className="min-h-screen">
				<div className="flex justify-between py-36" ref={containerRef}>
					<Avatar
						ref={nextIconRef}
						className="md:w-72 w-32 md:h-72 h-32 md:mx-0 ms-5 dark:outline"
					>
						<AvatarImage src={nextIcon} />
						<AvatarFallback>Next JS</AvatarFallback>
					</Avatar>

					<Avatar
						ref={supabaseIconRef}
						className="bg-black md:w-72 w-32 md:h-72 h-32 md:mx-0 me-5 dark:outline"
					>
						<AvatarImage src={supabaseIcon} />
						<AvatarFallback>Supabase</AvatarFallback>
					</Avatar>
				</div>
			</main>
		</>
	);
}
