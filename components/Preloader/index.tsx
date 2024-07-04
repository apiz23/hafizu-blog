"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

const opacity = {
	initial: {
		opacity: 0,
	},
	enter: {
		opacity: 0.75,
		transition: { duration: 1, delay: 0.2 },
	},
};

const slideUp = {
	initial: {
		top: 0,
	},
	exit: {
		top: "-100vh",
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
	},
};

export function Preloader() {
	const [dimension, setDimension] = useState({ width: 0, height: 0 });
	const { theme } = useTheme();

	useEffect(() => {
		setDimension({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height + 300} 0 ${
		dimension.height
	}  L0 0`;
	const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
		dimension.height
	} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

	const curve = {
		initial: {
			d: initialPath,
			transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
		},
		exit: {
			d: targetPath,
			transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
		},
	};

	const fillColor = theme === "dark" ? "#1f2937" : "#10223b";

	return (
		<motion.div
			variants={slideUp}
			initial="initial"
			exit="exit"
			className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-black"
		>
			{dimension.width > 0 && (
				<>
					<motion.p
						variants={opacity}
						initial="initial"
						animate="enter"
						className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl flex items-center relative z-10"
					>
						Hafizu Blog
					</motion.p>
					<svg
						className="absolute top-0 w-full "
						style={{ height: `calc(100% + 300px)` }}
					>
						<motion.path
							variants={curve}
							initial="initial"
							exit="exit"
							fill="#10223b"
						></motion.path>
					</svg>
				</>
			)}
		</motion.div>
	);
}

export default function Loader() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	});

	return (
		<AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
	);
}
