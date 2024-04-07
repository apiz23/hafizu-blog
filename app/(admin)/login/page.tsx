"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigLeft, Github } from "lucide-react";
import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default function Page() {
	const { data: session } = useSession();

	if (!session) {
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
								<blockquote className="mt-6 border-l-2 pl-6 italic">
									404 Error
								</blockquote>
							</CardContent>
							<Separator />
							<CardFooter className="flex justify-center pt-5">
								<Button variant="ghost" onClick={() => signIn("github")}>
									<Github className="w-fit h-fit" />
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</>
		);
	}
	return redirect(`${window.location.origin}/dashboard`);
}
