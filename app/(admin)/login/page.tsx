import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
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
					<form action="/dashboard">
						<Card className="mx-auto max-w-md mt-36">
							<CardHeader>
								<CardTitle>Login</CardTitle>
							</CardHeader>
							<CardContent>
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" />
							</CardContent>
							<CardFooter className="flex justify-end">
								<Button variant="secondary" type="submit">
									Submit
								</Button>
							</CardFooter>
						</Card>
					</form>
				</div>
			</div>
		</>
	);
}
