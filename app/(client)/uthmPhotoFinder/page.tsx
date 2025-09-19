"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    LoaderIcon,
    Search,
    User,
    Download,
    Users,
    Eye,
    ArrowRight,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Page() {
    const [matricNo, setMatricNo] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [batchImages, setBatchImages] = useState<
        { url: string; matric: string }[]
    >([]);
    const [batchPrefix, setBatchPrefix] = useState("");

    const [preview, setPreview] = useState<{
        url: string;
        matric: string;
    } | null>(null);

    const isMobile = useIsMobile();

    const getSessionFromMatric = (matric: string) => {
        const match = matric.match(/[A-Z]{2}(\d{2})/i);
        if (!match) return null;
        const startYearShort = parseInt(match[1], 10);
        const startYear = 2000 + startYearShort;
        const endYear = startYear + 1;
        return `${startYear}${endYear}`;
    };

    // single search
    const handleSearch = async (e: React.FormEvent) => {
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

    // batch search
    const handleBatchSearch = async () => {
        if (!batchPrefix.match(/^[A-Z]{2}\d{2}$/)) {
            toast.error("Invalid batch prefix. Example: CI23");
            return;
        }

        setBatchImages([]);
        setIsLoading(true);

        const session = getSessionFromMatric(batchPrefix + "0001");
        if (!session) {
            toast.error("Cannot detect session from batch prefix.");
            setIsLoading(false);
            return;
        }

        const promises = Array.from({ length: 200 }, (_, i) => {
            const num = (i + 1).toString().padStart(4, "0");
            const matric = `${batchPrefix}${num}`;
            const url = `https://community.uthm.edu.my/images/students/${session}/${matric}.jpg`;

            return new Promise<{ url: string; matric: string }>(
                (resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve({ url, matric });
                    img.onerror = () => reject();
                }
            );
        });

        const results = await Promise.allSettled(promises);
        const found = results
            .filter(
                (
                    r
                ): r is PromiseFulfilledResult<{
                    url: string;
                    matric: string;
                }> => r.status === "fulfilled"
            )
            .map((r) => r.value);

        setBatchImages(found);
        setIsLoading(false);
    };

    const handleDownload = (url: string, name: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-yellow-500">
                        UTHM Photo Finder
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Find and download student photos from UTHM community
                        portal
                    </p>
                </div>

                <Tabs defaultValue="single" className="w-full">
                    <TabsList className="flex justify-center w-full max-w-fit mx-auto mb-8 bg-gray-900 gap-2 p-0 border border-gray-800 rounded-lg">
                        <TabsTrigger
                            value="single"
                            className="rounded-lg px-6 py-2 transition-all flex items-center"
                        >
                            <User className="h-4 w-4 mr-2" />
                            Single Search
                        </TabsTrigger>
                        <TabsTrigger
                            value="batch"
                            className="rounded-lg px-6 py-2 transition-all flex items-center"
                        >
                            <Users className="h-4 w-4 mr-2" />
                            Batch Search
                        </TabsTrigger>
                    </TabsList>

                    {/* Single Matric Tab */}
                    <TabsContent value="single" className="mt-4">
                        <Card className="bg-gray-900 border-gray-800 shadow-2xl rounded-2xl max-w-2xl mx-auto">
                            <CardContent className="p-6 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2 text-white">
                                        Find Individual Photo
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        Enter a specific matric number to find a
                                        student{"'"}s photo
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSearch}
                                    className="space-y-4"
                                >
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                            <Input
                                                type="text"
                                                placeholder="Enter Matric No (e.g., DI230052)"
                                                value={matricNo}
                                                onChange={(e) =>
                                                    setMatricNo(
                                                        e.target.value.toUpperCase()
                                                    )
                                                }
                                                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="h-12 px-6 bg-gradient-to-r from-neutral-600 to-yellow-600 hover:from-neutral-700 hover:to-yellow-700 rounded-xl"
                                        >
                                            {isLoading ? (
                                                <LoaderIcon className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <>
                                                    <Search className="h-5 w-5 mr-2" />
                                                    Search
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {isLoading && (
                                    <div className="flex justify-center items-center py-12">
                                        <LoaderIcon className="h-8 w-8 animate-spin text-neutral-500" />
                                    </div>
                                )}

                                {imageUrl && !isLoading ? (
                                    <div className="mt-6 space-y-4 animate-fade-in">
                                        <div className="relative rounded-xl overflow-hidden border-2 border-gray-700">
                                            <img
                                                src={imageUrl}
                                                alt={matricNo}
                                                className="w-fit h-72 mx-auto"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400 font-mono">
                                                {matricNo}
                                            </span>
                                            <Button
                                                onClick={() =>
                                                    handleDownload(
                                                        imageUrl,
                                                        `${matricNo}.jpg`
                                                    )
                                                }
                                                className="bg-gradient-to-r from-neutral-600 to-yellow-600 hover:from-neutral-700 hover:to-yellow-700"
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    !isLoading && (
                                        <div className="mt-8 text-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
                                            <User className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-500">
                                                Enter a matric number to find a
                                                photo
                                            </p>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Example: DI230052, CI230101
                                            </p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Batch Search Tab */}
                    <TabsContent value="batch" className="mt-4">
                        <Card className="bg-gray-900 border-gray-800 shadow-2xl rounded-2xl max-w-6xl mx-auto">
                            <CardContent className="p-6 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2 text-white">
                                        Batch Photo Search
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        Enter a batch prefix to find all photos
                                        for that group (e.g. CI23 for CI230001
                                        to CI230100)
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                    <div className="relative flex-1">
                                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            type="text"
                                            placeholder="Enter Batch Prefix (e.g., CI23)"
                                            value={batchPrefix}
                                            onChange={(e) =>
                                                setBatchPrefix(
                                                    e.target.value.toUpperCase()
                                                )
                                            }
                                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12 rounded-xl"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleBatchSearch}
                                        disabled={isLoading}
                                        className="h-12 px-6 bg-gradient-to-r from-neutral-600 to-yellow-600 hover:from-neutral-700 hover:to-yellow-700 rounded-xl"
                                    >
                                        {isLoading ? (
                                            <LoaderIcon className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <>
                                                <Search className="h-5 w-5 mr-2" />
                                                Search Batch
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {isLoading && (
                                    <div className="flex flex-col items-center justify-center py-12">
                                        <LoaderIcon className="h-8 w-8 animate-spin text-neutral-500 mb-4" />
                                        <p className="text-gray-400">
                                            Searching for batch images...
                                        </p>
                                    </div>
                                )}

                                {batchImages.length > 0 && !isLoading && (
                                    <div className="mb-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-gray-300">
                                                Found {batchImages.length}{" "}
                                                images for batch &quot;
                                                {batchPrefix}&quot;
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {batchImages.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {batchImages.map(({ url, matric }) => (
                                            <div
                                                key={matric}
                                                onClick={() =>
                                                    setPreview({ url, matric })
                                                }
                                                className="cursor-pointer group bg-gray-800 rounded-xl overflow-hidden transition-all hover:scale-105 border border-gray-700"
                                            >
                                                <div className="relative aspect-square">
                                                    <img
                                                        src={url}
                                                        alt={matric}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.currentTarget.src =
                                                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%234B5563'%3E%3Crect width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='14' fill='%239CA3AF'%3ENo Image%3C/text%3E%3C/svg%3E";
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Eye className="h-6 w-6 text-white" />
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <p className="text-xs font-mono text-gray-400 truncate">
                                                        {matric}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    !isLoading && (
                                        <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-xl">
                                            <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                                            <p className="text-gray-500">
                                                Enter a batch prefix to search
                                                for photos
                                            </p>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Example: CI23, AA21, BB22
                                            </p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Preview Modal */}
            {preview &&
                (isMobile ? (
                    <Drawer
                        open={!!preview}
                        onOpenChange={(o) => !o && setPreview(null)}
                    >
                        <DrawerContent className="bg-gray-900 border-gray-800 text-white">
                            <DrawerHeader className="border-b border-gray-800">
                                <DrawerTitle className="font-mono">
                                    {preview.matric}
                                </DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 flex flex-col items-center space-y-4">
                                <img
                                    src={preview.url}
                                    alt={preview.matric}
                                    className="max-h-[60vh] w-auto rounded-lg"
                                />
                                <Button
                                    onClick={() =>
                                        handleDownload(
                                            preview.url,
                                            `${preview.matric}.jpg`
                                        )
                                    }
                                    className="w-full bg-gradient-to-r from-neutral-600 to-yellow-600 hover:from-neutral-700 hover:to-yellow-700"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                ) : (
                    <Dialog
                        open={!!preview}
                        onOpenChange={(o) => !o && setPreview(null)}
                    >
                        <DialogContent className="max-w-3xl bg-gray-900 border-gray-800 text-white">
                            <DialogHeader className="border-b border-gray-800 pb-4">
                                <DialogTitle className="font-mono">
                                    {preview.matric}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center space-y-4 py-4">
                                <img
                                    src={preview.url}
                                    alt={preview.matric}
                                    className="max-h-[70vh] w-auto rounded-lg"
                                />
                                <Button
                                    onClick={() =>
                                        handleDownload(
                                            preview.url,
                                            `${preview.matric}.jpg`
                                        )
                                    }
                                    className="bg-gradient-to-r from-neutral-600 to-yellow-600 hover:from-neutral-700 hover:to-yellow-700"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
        </div>
    );
}
