"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Github } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import supabase from "@/lib/supabase";
import { setCache, getCookies } from "@/lib/auth";

interface Token {
	value: string;
}

export default function Page() {
	const { data: session } = useSession();
	const [token, setToken] = useState<Token | undefined>({ value: "" });
	const [tokenMatched, setTokenMatched] = useState(false);

	useEffect(() => {
		const checkToken = async () => {
			if (session && (await getCookies())) {
				setTokenMatched(true);
			}
		};
		checkToken();
	}, [session]);

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
			redirect(`${window.location.origin}/dashboard`);
		} else {
			signIn("github");
		}
	};

	if (session) {
		return redirect(`${window.location.origin}/dashboard`);
	}

	return (
		<>
			<div className="min-h-screen bg-white dark:bg-black">
				<div className="flex">
					<Link href="/">
						<Button variant="ghost" className="m-3">
							<ArrowBigLeft />
						</Button>
					</Link>
				</div>
				<div className="block md:p-0 p-5">
					<Card className="mx-auto max-w-md mt-36">
						<CardHeader>
							<CardTitle>Login</CardTitle>
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
							<Button variant="ghost" onClick={handleCheckToken}>
								Check Token
							</Button>
							<Button
								variant="ghost"
								disabled={tokenMatched ? false : true}
								onClick={handleSignIn}
							>
								<Github className="w-fit h-fit" />
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
}
