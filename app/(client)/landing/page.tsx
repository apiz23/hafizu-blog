"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";

export default function Index() {
	const background = useRef(null);
	const introImage = useRef(null);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: document.documentElement,
				scrub: true,
				start: "top",
				end: "+=500px",
			},
		});

		timeline.to(introImage.current, { height: "200px" }, 0);
	}, []);

	return (
		<div className="relative w-[100%] flex justify-center">
			<div className="w-[100%] h-[140vh] absolute brightness-75" ref={background}>
				<Image
					src={"/images/background.jpeg"}
					fill={true}
					alt="background image"
					priority={true}
					className="object-cover"
				/>
			</div>
			<div className="flex justify-center relative mt-[35vh]">
				<div
					ref={introImage}
					data-scroll
					data-scroll-speed="0.3"
					className="w-[350px] h-[475px] absolute brightness-75"
				>
					<Image
						src={"/images/intro.png"}
						alt="intro image"
						fill={true}
						priority={true}
						className="object-cover object-top"
					/>
				</div>
				<h1
					data-scroll
					data-scroll-speed="0.7"
					className="text-white text-[7vw] text-center whitespace-nowrap"
				>
					SMOOTH SCROLL
				</h1>
			</div>
		</div>
	);
}
