"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderIcon, Search, User, Download } from "lucide-react";

export default function Page() {
    const [matricNo, setMatricNo] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getSessionFromMatric = (matric: string) => {
        const match = matric.match(/[A-Z]{2}(\d{2})/i);
        if (!match) return null;
        const startYearShort = parseInt(match[1], 10);
        const startYear = 2000 + startYearShort;
        const endYear = startYear + 1;
        return `${startYear}${endYear}`;
    };

    const handleSearch = async (e: any) => {
        e.preventDefault();

        if (!matricNo) {
            toast.error("Please enter a matric number.");
            return;
        }

        const session = getSessionFromMatric(matricNo);
        if (!session) {
            toast.error("Invalid matric number format.");
            return;
        }

        setImageUrl(null);
        setIsLoading(true);
        toast.dismiss();

        try {
            const url = `https://community.uthm.edu.my/images/students/${session}/${matricNo}.jpg`;

            await new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = () => reject(new Error("Image not found"));
            });

            setImageUrl(url);
        } catch (err: any) {
            setImageUrl(null);
            toast.error(
                err.message ||
                    "Image not found. Please check your matric number."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (!imageUrl) return;

        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `${matricNo}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-wider uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-tr from-neutral-500 to-yellow-500">
                    UTHM Photo Finder
                </h1>
                <p className="text-base sm:text-lg text-neutral-400 mb-12">
                    Enter your UTHM Matric Number to find your image
                    effortlessly.
                </p>

                <Card className="bg-gray-900 border-gray-800 shadow-2xl rounded-xl">
                    <CardContent className="p-6 sm:p-8">
                        <form
                            onSubmit={handleSearch}
                            className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    className="pl-10 pr-4 py-4 sm:py-6 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full"
                                    placeholder="Enter Matric Number (e.g. AA210100)..."
                                    value={matricNo}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setMatricNo(
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                />
                            </div>
                            <Button
                                type="submit"
                                className="py-4 sm:py-6 px-6 sm:px-8 bg-gradient-to-r from-neutral-600 to-yellow-600 hover:from-neutral-700 hover:to-yellow-700 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <LoaderIcon className="animate-spin h-5 w-5 mr-2" />
                                ) : (
                                    <Search className="h-5 w-5 mr-2" />
                                )}
                                {isLoading ? "Searching..." : "Find Photo"}
                            </Button>
                        </form>

                        <div className="text-center">
                            {imageUrl ? (
                                <div className="space-y-6">
                                    <div className="relative inline-block rounded-xl overflow-hidden border-4 border-gray-800 shadow-2xl max-w-xs mx-auto">
                                        <img
                                            src={imageUrl}
                                            alt="Student"
                                            className="w-full h-auto"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                                            <Button
                                                onClick={handleDownload}
                                                className="mb-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full px-4 py-2 flex items-center"
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Matric: {matricNo}
                                    </p>
                                </div>
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
                                    <User className="h-16 w-16 mb-4 opacity-50" />
                                    <p className="text-lg">
                                        Enter a matric number to find your photo
                                    </p>
                                    <p className="text-sm mt-2">
                                        Example: AA210100, BB220200
                                    </p>
                                </div>
                            )}
                        </div>

                        {!imageUrl && !isLoading && (
                            <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 text-left">
                                <h3 className="font-medium text-gray-300 mb-2">
                                    How to use:
                                </h3>
                                <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                                    <li>
                                        Enter your full matric number (e.g.
                                        AA210100)
                                    </li>
                                    <li>
                                        The system will automatically detect
                                        your session year
                                    </li>
                                    <li>
                                        Click &quot;Find Photo&quot; to search
                                        for your image
                                    </li>
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="mt-12 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} UTHM Photo Finder</p>
                </div>
            </div>
        </div>
    );
}
