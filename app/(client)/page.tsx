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
import { Badge, LoaderIcon } from "lucide-react";
import { useTheme } from "next-themes";
import BlurIn from "@/components/magicui/blur-in";
import Loader from "@/components/Preloader";
import { BorderBeam } from "@/components/magicui/border-beam";
import ShinyButton from "@/components/magicui/shiny-button";
import { MacbookScroll } from "@/components/macbook-scroll";
import FlipText from "@/components/magicui/flip-text";

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
				.to(supabaseIconRef.current, { x: -400, opacity: 100 }, ">")
				.to(nextIconRef.current, { x: 400, opacity: 100 }, "<");
		} else {
			tl
				.to(supabaseIconRef.current, { x: -30, opacity: 100 }, ">")
				.to(nextIconRef.current, { x: 30, opacity: 100 }, "<");
		}
	}, []);
	const { theme } = useTheme();

	return (
		<>
			<section className="min-h-screen">
				<Loader />
				<div className="h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
					<BlurIn
						word="Welcome to my blog"
						className="text-4xl font-bold uppercase text-black dark:text-white"
					/>
					<div className="my-10">
						<ShinyButton text="Shiny Button" />
					</div>
				</div>

				{isLoading ? (
					<LoaderIcon className="animate-spin mx-auto text-white" />
				) : (
					<div className="relative max-w-2xl p-5 md:mx-auto mx-5 mb-10 rounded-lg duration-500">
						{quotes.map((quote, index) => (
							<blockquote key={index} className="my-10 border-l-2 pl-6 italic">
								<h3>{quote.quote}</h3>
								<p className="float-right mt-2">Author: {quote.author}</p>
							</blockquote>
						))}
						<BorderBeam />
					</div>
				)}
			</section>
			<div className="overflow-hidden bg-black w-full">
				<MacbookScroll
					title={
						<BlurIn
							word="NEXT JS + SUPABASE"
							className="text-4xl font-bold uppercase text-black dark:text-white"
						/>
					}
					badge={
						<Link href="https://peerlist.io/manuarora">
							<Badge className="h-10 w-10 transform -rotate-12" />
						</Link>
					}
					src={`/linear.webp`}
					showGradient={false}
				/>
			</div>
			<section className="min-h-screen pt-52">
				<FlipText
					className="text-4xl font-bold uppercase tracking-[-0.1em] py-10 text-black dark:text-white md:text-7xl md:leading-[5rem]"
					word="Tech"
				/>
				<div className="flex justify-between pt-20" ref={containerRef}>
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
			</section>
		</>
	);
}
