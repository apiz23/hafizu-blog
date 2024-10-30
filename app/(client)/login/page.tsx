"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, Loader, LoaderIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { setCache, getCookies } from "@/lib/auth";
import { useQuotes } from "@/hooks/use-quotes";

interface Token {
	value: string;
}

export default function Page() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [token, setToken] = useState<Token | undefined>({ value: "" });
	const [tokenMatched, setTokenMatched] = useState(false);
	const { quotes, isLoading: isQuotesLoading } = useQuotes();

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/dashboard");
		}
	}, [status, router]);

	const handleCheckToken = async () => {
		let { data: tokens, error } = await supabase.from("tokens").select("*");
		if (tokens && tokens.length > 0) {
			const matchedToken = tokens.find(
				(t: { token: string }) => t.token === token?.value
			);
			if (matchedToken) {
				setTokenMatched(true);
				setCache();
			} else {
				setTokenMatched(false);
			}
		} else {
			setTokenMatched(false);
		}
	};

	const handleSignIn = async () => {
		if (session && (await getCookies())) {
			router.push("/dashboard");
		} else {
			signIn("github");
		}
	};

	if (status === "loading") {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<p className="text-2xl">
					<Loader className="animate-spin" />
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-screen flex">
				<div className="hidden md:flex flex-col justify-center items-start bg-neutral-900 text-white w-1/2 px-16">
					<h1 className="text-3xl font-semibold mb-6">Hafizu Blog</h1>
					{isQuotesLoading ? (
						<LoaderIcon className="animate-spin mx-auto text-white" />
					) : (
						<div className="relative py-5 mb-10 rounded-lg duration-500">
							{quotes.map((quote: any, index: any) => (
								<div key={index} className="italic space-y-4">
									<h3>{quote.quote}</h3>
									<p>Author: {quote.author}</p>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex md:flex-col justify-center items-center w-full md:w-1/2 bg-neutral-800 px-16">
					<Card className="w-full max-w-md bg-transparent border-none">
						<CardHeader>
							<CardTitle className="text-white">Login Account</CardTitle>
							<p className="text-gray-400">Enter the token below to login</p>
						</CardHeader>
						<CardContent>
							<Input
								type="password"
								placeholder="Token"
								className="mb-4"
								value={token?.value || ""}
								onChange={(e) => setToken({ value: e.target.value })}
								onBlur={handleCheckToken}
							/>

							<Button
								variant="outline"
								className="w-full"
								onClick={handleSignIn}
								disabled={!tokenMatched}
							>
								<Github className="mr-2" /> GitHub
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}
