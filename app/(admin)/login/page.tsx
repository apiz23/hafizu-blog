"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Github } from "lucide-react";
import React, { useState } from "react";
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

interface Token {
	value: string;
}

export default function Page() {
	const { data: session } = useSession();
	const [token, setToken] = useState<Token | undefined>({ value: "" });
	const [tokenMatched, setTokenMatched] = useState(false);

	if (session && localStorage.getItem("token-hafiz")) {
		return redirect(`${window.location.origin}/dashboard`);
	}

	const handleCheckToken = async () => {
		let { data: tokens, error } = await supabase.from("tokens").select("*");
		if (tokens && tokens.length > 0) {
			const matchedToken = tokens.find(
				(t: { token: string }) => t.token === token?.value
			);
			console.log(tokens, matchedToken);
			if (matchedToken) {
				setTokenMatched(true);
				localStorage.setItem("token-hafiz", token?.value || "");
			} else {
				setTokenMatched(false);
			}
		} else {
			setTokenMatched(false);
		}
	};

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
								onClick={() => signIn("github")}
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
