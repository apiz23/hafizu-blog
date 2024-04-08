"use client";

import Preloader from "@/components/Preloader";
import { Button } from "@/components/ui/button";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";

const nextIcon = "/next-js.svg";
const supabaseIcon = "/supabase.png";

interface Quote {
	author: string;
	quote: string;
	category: string;
}

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const containerRef = useRef(null);
	const nextIconRef = useRef(null);
	const supabaseIconRef = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = "aIeYYuA5/L5bGO45XY8q6w==QunyhvLAU682Kwbv";
				const headers = new Headers();
				headers.append("Authorization", `Bearer ${token}`);
				const response = await fetch(
					"https://api.api-ninjas.com/v1/quotes?category=computers",
					{
						method: "GET",
						headers: {
							"X-Api-Key": token,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const jsonData = await response.json();
				setQuotes(jsonData);
			} catch (error: any) {
				toast.error(error.message);
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
	const { theme } = useTheme();

	const particleColor =
		theme === "dark" ? ["#FFFFFF", "#FFFFFF"] : ["#000000", "#000000"];

	return (
		<>
			<main className="min-h-screen">
				<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
				<div className="h-[40rem] w-full bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
					<h1
						className="scroll-m-20 md:text-7xl mx-auto text-4xl font-extrabold tracking-tight mb-5"
						data-scroll
						data-scroll-speed="0.5"
					>
						Welcome to my blog
					</h1>

					<div className="w-[40rem] h-40 relative">
						<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
						<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
						<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
						<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

						<SparklesCore
							background="transparent"
							minSize={0.4}
							maxSize={1}
							particleDensity={1200}
							className="w-full h-full"
							particleColor={particleColor}
						/>

						<div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
					</div>

					<p
						className="absolute leading-7 px-10 [&:not(:first-child)]:mt-6 text-zinc-400"
						data-scroll
						data-scroll-speed="0.7"
					>
						One of the source of learning material for my Studies Journey
					</p>

					<Link href="/link" className="absolute pt-28">
						<Button className="mt-10 text-white bg-gray-800 hover:bg-gray-900 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
							Get Started
						</Button>
					</Link>
				</div>

				{isLoading ? (
					<LoaderIcon className="animate-spin mx-auto text-black" />
				) : (
					<div className="max-w-2xl p-5 md:mx-auto mx-5 rounded-lg shadow-md hover:shadow-2xl dark:shadow-white duration-500">
						{quotes.map((quote, index) => (
							<blockquote key={index} className="my-10 border-l-2 pl-6 italic">
								<h3>{quote.quote}</h3>
								<p className="float-right mt-2">Author: {quote.author}</p>
							</blockquote>
						))}
					</div>
				)}
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
