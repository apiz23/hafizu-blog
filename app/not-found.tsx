"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (countdown > 0) {
				setCountdown((prevCountdown) => prevCountdown - 1);
			} else {
				router.back();
			}
		}, 1000);

		return () => clearTimeout(timer);
	}, [countdown, router]);
	const goBack = () => {
		router.back();
	};
	return (
		<div className="grid h-screen place-content-center bg-white px-4">
			<div className="text-center">
				<h1 className="text-9xl font-black text-gray-200">404</h1>

				<h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Nuh Uh!
				</h1>
				<p className="my-4 text-gray-500">We can't find that page.</p>

				<button
					className="group relative inline-block focus:outline-none focus:ring"
					onClick={goBack}
				>
					<span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

					<span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
						{countdown > 0 ? `Redirect in ${countdown} seconds` : "Lets Gooo"}
					</span>
				</button>
			</div>
		</div>
	);
}
