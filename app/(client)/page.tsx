"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import BlurIn from "@/components/magicui/blur-in";
import Loader from "@/components/Preloader";
import { BorderBeam } from "@/components/magicui/border-beam";
import ShinyButton from "@/components/magicui/shiny-button";
import FlipText from "@/components/magicui/flip-text";
import {
	RiNextjsLine,
	RiSupabaseLine,
	RiTailwindCssFill,
} from "react-icons/ri";
import { SiAuth0 } from "react-icons/si";
import { useQuery } from "react-query";
import ContributionsChart from "@/components/contributor";

interface Quote {
	author: string;
	quote: string;
	category: string;
}

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);

		const lenis = new Lenis();
		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
		gsap.registerPlugin(ScrollTrigger);
	}, []);

	const fetchQuotes = async () => {
		const token = process.env.NEXT_PUBLIC_API_NINJA;
		if (!token) {
			throw new Error("API token is not defined");
		}

		const headers = new Headers();
		headers.append("X-Api-Key", token);

		const response = await fetch(
			"https://api.api-ninjas.com/v1/quotes?category=computers",
			{
				method: "GET",
				headers: headers,
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		return response.json();
	};

	const { data: quotes, error } = useQuery("quotes", fetchQuotes);

	if (error) {
		toast.error((error as Error).message);
	}

	return (
		<>
			<section className="min-h-screen">
				<Loader />
				<div className="h-[30rem] md:h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
					<BlurIn
						word="Welcome to my blog"
						className="text-4xl font-bold uppercase text-black dark:text-white"
					/>
					<div className="md:my-5">
						<Link href="/link">
							<ShinyButton text="Get Started" />
						</Link>
					</div>
				</div>

				{isLoading ? (
					<LoaderIcon className="animate-spin mx-auto text-white" />
				) : (
					<div className="relative max-w-2xl p-5 md:mx-auto mx-5 mb-10 rounded-lg duration-500">
						{quotes.map((quote: any, index: any) => (
							<blockquote key={index} className="my-5 border-l-2 pl-6 italic">
								<h3>{quote.quote}</h3>
								<p className="float-right mt-2">Author: {quote.author}</p>
							</blockquote>
						))}
						<BorderBeam />
					</div>
				)}
			</section>
			<section className="min-h-screen pt-28 grid grid-cols-1 md:grid-cols-5">
				<div className="block md:col-span-2 pt-5 md:pt-24">
					<ContributionsChart />
				</div>
				<div className="block"></div>
			</section>
			<section className="min-h-screen pt-36">
				<FlipText
					className="text-4xl font-bold uppercase tracking-[-0.1em] py-10 mb-10 text-black dark:text-white md:text-7xl md:leading-[5rem]"
					word="Tech"
				/>
				<div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 px-5 md:px-10 mx-auto mb-10">
					<div className="col-span-1 p-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg md:rounded-ss-2xl">
						<RiNextjsLine className="h-20 w-20 text-black mx-auto" />
					</div>
					<div className="col-span-1 p-4 bg-yellow-600 hover:bg-yellow-500 rounded-lg md:rounded-tr-lg">
						<RiSupabaseLine className="h-20 w-20 text-black mx-auto" />
					</div>
					<div className="col-span-1 p-4 bg-yellow-600 hover:bg-yellow-500 rounded-lg md:rounded-bl-lg">
						<SiAuth0 className="h-20 w-20 text-black mx-auto" />
					</div>
					<div className="col-span-1 p-4 bg-yellow-500 hover:bg-yellow-600 rounded-lg md:rounded-ee-lg">
						<RiTailwindCssFill className="h-20 w-20 text-black mx-auto" />
					</div>
				</div>
			</section>
		</>
	);
}
