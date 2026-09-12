"use client";

import { AppLayout } from "@/components/layouts/app-layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSyncExternalStore } from "react";
export default function SettingsPage() {
    const { signOut } = useClerk();
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

                    <p className="text-muted-foreground mt-2">Manage your account and application preferences.</p>
                </div>

                {/* Profile Settings */}
                <Card className="p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">Profile Settings</h2>

                        <p className="text-sm text-muted-foreground mt-1">Update your personal information.</p>
                    </div>

                    <Separator />

                    <div className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>

                            <Input id="name" placeholder="Enter your full name" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>

                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>

                            <Input id="username" placeholder="Enter your username" />
                        </div>

                        <div className="flex justify-end">
                            <Button>Save Changes</Button>
                        </div>
                    </div>
                </Card>

                {/* Notification Settings */}
                <Card className="p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">Notifications</h2>

                        <p className="text-sm text-muted-foreground mt-1">Choose how you receive notifications.</p>
                    </div>

                    <Separator />

                    <div className="space-y-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email Notifications</p>

                                <p className="text-sm text-muted-foreground">Receive updates via email.</p>
                            </div>

                            <Switch />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>

                                <p className="text-sm text-muted-foreground">Receive browser notifications.</p>
                            </div>

                            <Switch />
                        </div>
                    </div>
                </Card>

                {/* Appearance Settings */}
                <Card className="p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">Appearance</h2>

                        <p className="text-sm text-muted-foreground mt-1">Customize your application appearance.</p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Dark Mode</p>

                            <p className="text-sm text-muted-foreground">Toggle dark theme for the dashboard.</p>
                        </div>

                        <Switch
                            checked={mounted && resolvedTheme === "dark"}
                            onCheckedChange={checked => setTheme(checked ? "dark" : "light")}
                            aria-label="Toggle dark mode"
                        />
                    </div>
                </Card>

                {/* Security Settings */}
                <Card className="p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">Security</h2>

                        <p className="text-sm text-muted-foreground mt-1">Manage your account security settings.</p>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/auth#sign-in" className={cn(buttonVariants({ variant: "outline" }))}>
                            Change Password
                        </Link>
                        <Button variant="outline" onClick={() => signOut({ redirectUrl: "/auth#sign-in" })}>
                            Logout
                        </Button>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
