"use server";

import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export async function setCache() {
	const token = uuidv4();
	cookies().set("token-hafiz", token);
}

export async function getCookies() {
	return cookies().get("token-hafiz");
}

export async function deleteCookies() {
	cookies().delete("token-hafiz");
}