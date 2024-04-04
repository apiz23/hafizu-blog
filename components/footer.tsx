import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<>
			<div className="bg-slate-900 text-center text-white backdrop-blur-md	">
				<div className="p-4 pb-0">
					<section className="mb-4 flex justify-center space-x-5">
						<Link href="https://github.com/apiz23" target="_blank">
							<Github className="hover:cursor-pointer hover:text-blue-500" />
						</Link>
						<Link href="https://linkedin.com/in/muh-hafizuddin" target="_blank">
							<Linkedin className="hover:cursor-pointer hover:text-blue-500" />
						</Link>
					</section>
				</div>

				<div
					className="text-center p-3"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
				>
					Copyright MJ195345 || JG160007
				</div>
			</div>
		</>
	);
}
