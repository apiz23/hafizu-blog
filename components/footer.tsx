import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<>
			<footer className="fixed bottom-0 left-0 z-20 p-4 h-20 w-80">
				<div className="text-center w-full text-white backdrop-blur-md">
					<div className="p-4 pb-0 mx-auto">
						<section className="mb-4 flex justify-center space-x-5">
							<Link href="https://github.com/apiz23" target="_blank">
								<Github className="text-black dark:text-white hover:cursor-pointer hover:text-blue-500" />
							</Link>
							<Link href="https://linkedin.com/in/muh-hafizuddin" target="_blank">
								<Linkedin className="text-black dark:text-white hover:cursor-pointer hover:text-blue-500" />
							</Link>
						</section>
					</div>
				</div>
			</footer>
		</>
	);
}
