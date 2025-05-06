"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";

type Message = {
	role: "user" | "assistant";
	content: string;
};

export default function AIAssistant() {
	const [messages, setMessages] = useState<Message[]>([
		{ role: "assistant", content: "Hello! How can I help you today?" },
	]);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const userMessage: Message = { role: "user", content: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_PERSONAL_AI}/hafizu-blog/chat`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ message: input }),
				}
			);

			if (!response.ok) throw new Error("Failed to fetch response");

			const data = await response.json();
			const aiMessage: Message = { role: "assistant", content: data.response };

			setMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			console.error("Error sending message:", error);
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: "Sorry, something went wrong." },
			]);
		}
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Dialog>
			<div className="fixed bottom-6 right-6 z-50">
				<DialogTrigger asChild>
					<Button className="p-4 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform">
						<Bot />
					</Button>
				</DialogTrigger>

				<DialogContent className="w-full">
					<DialogHeader>
						<DialogTitle>AI Assistant</DialogTitle>
						<DialogDescription>Your Assistant for today</DialogDescription>
					</DialogHeader>

					<div className="w-full mx-auto h-[60vh] flex flex-col">
						<div className="flex-1 overflow-y-auto p-2 space-y-2">
							{messages.map((msg, index) => (
								<div
									key={index}
									className={`p-2 rounded-lg w-fit max-w-[75%] whitespace-pre-wrap ${
										msg.role === "user"
											? "bg-black text-white ml-auto text-right"
											: "bg-gray-300 text-black mr-auto text-left"
									}`}
								>
									{msg.content.split("\n").map((line, i) => {
										if (/^\*\*(.*?)\*\*/.test(line)) {
											return (
												<p key={i} className="font-bold">
													{line.replace(/\*\*/g, "")}
												</p>
											);
										} else if (/^\d+\./.test(line)) {
											return (
												<ul key={i} className="list-disc pl-5">
													<li>{line.replace(/^\d+\.\s*/, "")}</li>
												</ul>
											);
										}
										return <p key={i}>{line}</p>;
									})}
								</div>
							))}
							<div ref={messagesEndRef} />
						</div>

						<div className="flex gap-2 mt-4">
							<Input
								type="text"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={async (e) => {
									if (e.key === "Enter") await sendMessage();
								}}
								className="flex-1 p-2 border rounded-lg text-black"
								placeholder="Type your message..."
							/>
							<Button
								onClick={sendMessage}
								className="text-white px-4 py-2 rounded-lg"
							>
								<SendHorizontal className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</DialogContent>
			</div>
		</Dialog>
	);
}
