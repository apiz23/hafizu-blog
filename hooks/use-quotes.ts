// hooks/useQuotes.ts
import { useQuery } from "react-query";
import { toast } from "sonner";

const fetchQuotes = async () => {
	const token = process.env.NEXT_PUBLIC_API_NINJA;
	if (!token) {
		throw new Error("API token is not defined");
	}

	const headers = new Headers();
	headers.append("X-Api-Key", token);

	const response = await fetch(
		"https://api.api-ninjas.com/v1/quotes?category=computers",
		{
			method: "GET",
			headers: headers,
		}
	);

	if (!response.ok) {
		throw new Error("Network response was not ok");
	}

	return response.json();
};

export const useQuotes = () => {
	const { data, error, isLoading } = useQuery("quotes", fetchQuotes);

	if (error) {
		toast.error((error as Error).message);
	}

	return { quotes: data, isLoading };
};
