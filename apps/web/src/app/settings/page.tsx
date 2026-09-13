"use client";

import { AppLayout } from "@/components/layouts/app-layout";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";

const notificationPreferencesKey = "quizlm-notification-preferences";

export default function SettingsPage() {
    const { resolvedTheme, setTheme } = useTheme();
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );

    useEffect(() => {
        const savedPreferences = localStorage.getItem(notificationPreferencesKey);

        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences) as {
                emailNotifications?: boolean;
                pushNotifications?: boolean;
            };

            setEmailNotifications(preferences.emailNotifications ?? false);
            setPushNotifications(
                preferences.pushNotifications === true &&
                    typeof Notification !== "undefined" &&
                    Notification.permission === "granted",
            );
        }
    }, []);

    const saveNotificationPreferences = (preferences: {
        emailNotifications?: boolean;
        pushNotifications?: boolean;
    }) => {
        const currentPreferences = JSON.parse(localStorage.getItem(notificationPreferencesKey) ?? "{}");

        localStorage.setItem(notificationPreferencesKey, JSON.stringify({ ...currentPreferences, ...preferences }));
    };

    const handlePushNotificationsChange = async (checked: boolean) => {
        if (!checked) {
            setPushNotifications(false);
            saveNotificationPreferences({ pushNotifications: false });
            return;
        }

        if (typeof Notification === "undefined") {
            return;
        }

        const permission =
            Notification.permission === "default" ? await Notification.requestPermission() : Notification.permission;
        const enabled = permission === "granted";

        setPushNotifications(enabled);
        saveNotificationPreferences({ pushNotifications: enabled });
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>

                    <p className="text-muted-foreground mt-2">Manage your account and application preferences.</p>
                </div>

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

                            <Switch
                                checked={emailNotifications}
                                onCheckedChange={checked => {
                                    setEmailNotifications(checked);
                                    saveNotificationPreferences({ emailNotifications: checked });
                                }}
                                aria-label="Toggle email notifications"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push Notifications</p>

                                <p className="text-sm text-muted-foreground">Receive browser notifications.</p>
                            </div>

                            <Switch
                                checked={pushNotifications}
                                onCheckedChange={handlePushNotificationsChange}
                                aria-label="Toggle push notifications"
                            />
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
            </div>
        </AppLayout>
    );
}
