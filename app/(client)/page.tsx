"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { LoaderIcon } from "lucide-react";
import BlurIn from "@/components/magicui/blur-in";
import { BorderBeam } from "@/components/magicui/border-beam";
import FlipText from "@/components/magicui/flip-text";
import {
	RiNextjsLine,
	RiSupabaseLine,
	RiTailwindCssFill,
} from "react-icons/ri";
import { SiAuth0 } from "react-icons/si";
import Image from "next/image";
import { useQuotes } from "@/hooks/use-quotes";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";

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

	const { quotes, isLoading: isQuotesLoading } = useQuotes();

	return (
		<div className="h-fit">
			<section className="min-h-screen">
				<div className="h-[30rem] md:h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
					<Image
						src="/logo2.png"
						alt="logo"
						width={500}
						height={500}
						className="w-fit h-[20vh]"
					/>
					<BlurIn
						word="Welcome to my blog"
						className="text-2xl md:text-4xl lg:text-7xl font-bold uppercase text-white"
					/>
					<BlurIn
						word="Sharing Note and Feed"
						className="text-base md:text-lg font-normal capitalize text-white"
					/>
				</div>

				{isQuotesLoading ? (
					<LoaderIcon className="animate-spin mx-auto text-white" />
				) : (
					<div className="relative max-w-2xl p-5 md:mx-auto mx-5 mb-10 rounded-lg duration-500">
						{quotes.map((quote: any, index: any) => (
							<NeonGradientCard className="bg-black" key={index}>
								<blockquote className="my-5 border-l-2 pl-6 italic drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
									<h3>{quote.quote}</h3>
									<p className="float-right mt-2">Author: {quote.author}</p>
								</blockquote>
							</NeonGradientCard>
						))}
						{/* <BorderBeam /> */}
					</div>
				)}
			</section>
			<section className="min-h-screen py-32 md:pt-32 relative">
				<FlipText
					className="text-6xl font-bold uppercase tracking-[-0.1em] py-10 mb-10 text-white md:text-7xl md:leading-[5rem]"
					word="Tech"
				/>
				<div className="max-w-4xl mx-auto mb-5 px-5">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Frontend
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6">
						Build using Next.Js & Tailwind CSS
					</p>
				</div>
				<div className="max-w-4xl mx-auto mb-5 px-5 ">
					<h1 className="scroll-m-20 text-4xl font-extrabold flex justify-end tracking-tight lg:text-5xl">
						Backend
					</h1>
					<p className="leading-7 [&:not(:first-child)]:mt-6 flex justify-end">
						Nest.Js & Supabase
					</p>
				</div>
				<div className="max-w-4xl grid grid-cols-2 gap-4 px-5 md:px-10 mx-auto mb-10">
					<div className="col-span-1 p-4 bg-yellow-500 rounded-lg md:rounded-ss-2xl">
						<RiNextjsLine className="h-20 w-20 text-black mx-auto" />
					</div>
					<div className="col-span-1 p-4 bg-yellow-600 rounded-lg md:rounded-tr-lg">
						<RiSupabaseLine className="h-20 w-20 text-black mx-auto" />
					</div>
					<div className="col-span-1 p-4 bg-yellow-600 rounded-lg md:rounded-bl-lg">
						<SiAuth0 className="h-20 w-20 text-black mx-auto" />
					</div>
					<div className="col-span-1 p-4 bg-yellow-500 rounded-lg md:rounded-ee-lg">
						<RiTailwindCssFill className="h-20 w-20 text-black mx-auto" />
					</div>
				</div>
			</section>
		</div>
	);
}
