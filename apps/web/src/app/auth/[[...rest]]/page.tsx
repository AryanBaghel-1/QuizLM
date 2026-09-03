"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("sign-in");

    useEffect(() => {
        const syncFromLocation = () => {
            const hash = window.location.hash.replace("#", "");
            const params = new URLSearchParams(window.location.search);
            const tabParam = params.get("tab") || params.get("mode");

            if (hash === "sign-up" || tabParam === "sign-up") {
                setActiveTab("sign-up");
            } else if (hash === "sign-in" || tabParam === "sign-in") {
                setActiveTab("sign-in");
            }
        };

        syncFromLocation();
        window.addEventListener("hashchange", syncFromLocation);
        window.addEventListener("popstate", syncFromLocation);
        return () => {
            window.removeEventListener("hashchange", syncFromLocation);
            window.removeEventListener("popstate", syncFromLocation);
        };
    }, []);

    const handleTabChange = (value: string) => {
        const nextTab = value === "sign-up" ? "sign-up" : "sign-in";
        setActiveTab(nextTab);
        window.location.hash = nextTab;
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                >
                    <TabsList className="w-full">
                        <TabsTrigger className="flex-1" value="sign-in">
                            Sign in
                        </TabsTrigger>
                        <TabsTrigger className="flex-1" value="sign-up">
                            Sign up
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-in" className="mt-4 flex justify-center">
                        <SignIn
                            routing="hash"
                            signUpUrl="#sign-up"
                            fallbackRedirectUrl="/dashboard"
                        />
                    </TabsContent>
                    <TabsContent value="sign-up" className="mt-4 flex justify-center">
                        <SignUp
                            routing="hash"
                            signInUrl="#sign-in"
                            fallbackRedirectUrl="/dashboard"
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
