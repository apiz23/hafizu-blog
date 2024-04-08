"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	return (
		<>
			<div className="flex space-x-2 mb-5">
				<Switch
					onClick={() => setTheme(theme === "light" ? "dark" : "light")}
					checked={theme === "dark"}
				/>
			</div>
		</>
	);
}
