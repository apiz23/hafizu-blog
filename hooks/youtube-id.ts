import { useCallback } from "react";

export default function useYoutubeId() {
	const getYoutubeId = useCallback((url: string): string => {
		const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
		const match = url.match(regExp);
		if (match && match[2].length === 11) {
			return match[2];
		} else {
			return "error";
		}
	}, []);

	return { getYoutubeId };
}
