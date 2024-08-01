import React, { useEffect, useState } from "react";
import { PinContainer } from "./3d-pin";
import { toast } from "sonner";

interface GitHubAPI {
	login: string;
	id: number;
	avatar_url: string;
	html_url: string;
	contributions: number;
}

const ContributionsCard = () => {
	const [contributors, setContributors] = useState<GitHubAPI[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(
					"https://api.github.com/repos/apiz23/hafizu-blog/contributors",
					{
						headers: {
							Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) throw new Error("Failed to fetch contributors data");
				const result = await response.json();

				setContributors(result);
			} catch (error: any) {
				toast.error("Error fetching data:", error);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="p-4 max-w-fit mx-auto">
			{contributors.map((contributor) => (
				<PinContainer
					key={contributor.id}
					title="GitHub Repo"
					href={contributor.html_url}
				>
					<div className="flex basis-full flex-col p-4 tracking-tight text-slate-700/80 sm:basis-1/2 w-[15rem] md:w-[30rem] h-[20rem] md:h-[35rem]">
						<h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-700">
							Hafizu Blog
						</h3>
						<div className="text-base !m-0 !p-0 font-normal">
							<span className="text-slate-500 ">
								<img
									src={contributor.avatar_url}
									alt={`${contributor.login}'s avatar`}
									className="p-4 rounded-full"
								/>
							</span>
						</div>
						Contributions: {contributor.contributions}
					</div>
				</PinContainer>
			))}
		</div>
	);
};

export default ContributionsCard;
