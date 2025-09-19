"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import supabase from "@/lib/supabase";

export default function SecurePage({
    children,
}: {
    children: React.ReactNode;
}) {
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (error && password) {
            setError(null);
        }
    }, [password, error]);

    async function handleUnlock() {
        if (!password.trim()) {
            setError("Please enter a password");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from("tokens")
                .select("token")
                .eq("token", password)
                .maybeSingle();

            if (error) {
                throw new Error("Failed to check password");
            }

            if (data && data.token === password) {
                setShowSuccess(true);
                setTimeout(() => {
                    setUnlocked(true);
                    setShowSuccess(false);
                }, 1000);
            } else {
                setError("Incorrect password. Please try again.");
            }
        } catch (err: any) {
            setError(err?.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleUnlock();
        }
    };

    if (!unlocked) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
                <div
                    className={`bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 transition-all duration-500 ${
                        showSuccess
                            ? "scale-105 bg-green-900/20 border-green-500"
                            : ""
                    }`}
                >
                    <div className="text-center mb-7">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-white text-2xl font-bold mb-1">
                            Secure Access
                        </h2>
                        <p className="text-gray-400 text-sm">
                            Enter the password to continue
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <Input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className={`w-full py-6 px-4 text-lg text-black ${
                                    error
                                        ? "border-red-500 focus:ring-red-500"
                                        : ""
                                } transition-colors duration-300`}
                                disabled={loading || showSuccess}
                                autoFocus
                            />
                            {error && (
                                <div className="flex items-center mt-2 text-red-400 text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {error}
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleUnlock}
                            disabled={loading || showSuccess}
                            className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                                showSuccess
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Verifying...
                                </div>
                            ) : showSuccess ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    Access Granted!
                                </div>
                            ) : (
                                "Unlock"
                            )}
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Contact Owner if you want to access hehe
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
