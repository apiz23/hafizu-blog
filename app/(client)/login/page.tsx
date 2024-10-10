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
import { Github, Loader } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabase";
import { setCache, getCookies } from "@/lib/auth";

interface Token {
	value: string;
}

export default function Page() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [token, setToken] = useState<Token | undefined>({ value: "" });
	const [tokenMatched, setTokenMatched] = useState(false);

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
			<div className="min-h-screen space-x-3 px-5 pt-24">
				<Card className="mx-auto max-w-md mt-36 bg-neutral-800">
					<CardHeader>
						<CardTitle className="text-white">Login</CardTitle>
					</CardHeader>
					<CardContent>
						<Input
							type="password"
							placeholder="Token"
							value={token?.value || ""}
							onChange={(e) => setToken({ value: e.target.value })}
						/>
					</CardContent>
					<CardFooter className="flex justify-between pt-5">
						<Button variant="outline" onClick={handleCheckToken}>
							Check Token
						</Button>
						<Button
							variant="secondary"
							disabled={tokenMatched ? false : true}
							onClick={handleSignIn}
						>
							<Github className="w-fit h-fit" />
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
}
