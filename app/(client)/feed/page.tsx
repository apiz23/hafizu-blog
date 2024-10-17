"use client";

import GradualSpacing from "@/components/magicui/gradual-spacing";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Link2Icon } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

function getRandomDarkColor() {
	const hue = Math.floor(Math.random() * 360);
	const saturation = Math.floor(Math.random() * 50) + 30;
	const lightness = Math.floor(Math.random() * 20) + 20;
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function isImage(url: string) {
	return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url);
}

function isVideo(url: string) {
	return /\.(mp4|webm|ogg)$/i.test(url);
}
export default function Page() {
	const [posts, setPosts] = useState<any[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchPosts() {
			
			const { data, error } = await supabase.from("posts").select("*");
			if (error) {
				setError(error.message);
			} else {
				setPosts(data || []);
			}
		}

		fetchPosts();
	}, []);

	return (
		<>
			<div className="px-5 pt-24 min-h-screen">
				<GradualSpacing
					className="scroll-m-20 text-2xl font-extrabold tracking-wider uppercase lg:text-6xl mb-20"
					text="Feed Sharing"
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{posts.map((post) => (
						<div
							key={post.id}
							className="w-full mx-auto mb-5 border-2 rounded-md p-4 bg-black"
						>
							<p className="text-lg font-bold text-white mb-2">{post.user_id}</p>
							<p className="text-base text-white mb-2">{post.content}</p>
							{post.media_url && (
								<div className="w-full flex mb-2">
									{isImage(post.media_url) ? (
										<img
											src={post.media_url}
											alt="Post media"
											className="w-full h-auto mb-2 rounded"
										/>
									) : isVideo(post.media_url) ? (
										<video
											controls
											src={post.media_url}
											className="w-full h-auto mb-2 rounded"
										/>
									) : (
										<Link
											href={post.media_url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sky-300 hover:text-blue-500 hover:underline flex gap-2"
										>
											View Link <Link2Icon />
										</Link>
									)}
								</div>
							)}
							<div className="flex flex-wrap gap-2 mb-2">
								{(post.category || "Uncategorized")
									.split(",")
									.map((item: string, index: number) => (
										<Badge
											key={index}
											variant="outline"
											className="text-white"
											style={{ backgroundColor: getRandomDarkColor() }}
										>
											{item.trim()}
										</Badge>
									))}
							</div>
							<div className="flex justify-end">
								<FaHeart className="hover:text-red-600 size-6" />
								<span className="mx-2">{post.likes_count}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
