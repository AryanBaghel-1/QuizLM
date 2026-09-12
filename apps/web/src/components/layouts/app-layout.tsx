"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Plus,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/questions", label: "Questions", icon: FileText },
  { href: "/questions/create", label: "Create Question", icon: Plus },
  { href: "/tests", label: "Tests", icon: ClipboardList },
  { href: "/tests/create", label: "Create Test", icon: Plus },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user, isLoaded, isSignedIn } = useUser();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Derived user details from Clerk
  const displayName = user
    ? user.fullName || user.username || user.firstName || "User"
    : "Guest";
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "";
  const displayImage = user?.imageUrl;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "transition-all duration-300 border-r bg-sidebar flex flex-col justify-between h-screen shrink-0",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Area */}
          <div className="flex items-center justify-between h-16 px-4 border-b shrink-0">
            {sidebarOpen && (
              <Link href="/dashboard" className="font-bold text-lg">
                QuizLM
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={cn("hover:bg-accent", sidebarOpen ? "ml-auto" : "mx-auto")}
            >
              {sidebarOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5 p-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "hover:bg-accent text-muted-foreground hover:text-foreground",
                    !sidebarOpen && "justify-center px-2"
                  )}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom - User Profile & Logout */}
        <div className="p-3 border-t mt-auto space-y-2.5">
          {sidebarOpen ? (
            <div className="flex flex-col gap-2.5">
              {!isLoaded ? (
                <div className="flex items-center gap-3 p-2 rounded-xl bg-accent/40 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="h-3.5 w-20 bg-muted rounded" />
                    <div className="h-2.5 w-28 bg-muted rounded" />
                  </div>
                </div>
              ) : isSignedIn && user ? (
                <div className="flex items-center gap-3 p-2 rounded-xl bg-accent/40 border border-border/50">
                  <div className="relative shrink-0">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={displayName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-sidebar" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold truncate text-foreground leading-tight">
                      {displayName}
                    </span>
                    {displayEmail && (
                      <span className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                        {displayEmail}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}

              <Button
                variant="outline"
                className="w-full justify-start gap-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
                onClick={async () => {
                  await signOut({ redirectUrl: "/" });
                }}
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="text-sm">Sign Out</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              {isSignedIn && user && (
                <div className="relative">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={displayName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                      title={`${displayName} (${displayEmail})`}
                    />
                  ) : (
                    <div
                      className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs"
                      title={`${displayName} (${displayEmail})`}
                    >
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-sidebar" />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Sign Out"
                onClick={async () => {
                  await signOut({ redirectUrl: "/" });
                }}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="border-b bg-background/80 backdrop-blur-sm px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            {/* User Profile Section from Clerk */}
            {!isLoaded ? (
              <div className="flex items-center gap-3 px-3 py-1.5 rounded-full border bg-muted/30 animate-pulse">
                <div className="flex flex-col items-end gap-1">
                  <div className="h-3.5 w-24 bg-muted rounded" />
                  <div className="h-2.5 w-32 bg-muted rounded" />
                </div>
                <div className="w-8 h-8 rounded-full bg-muted" />
              </div>
            ) : isSignedIn && user ? (
              <div className="flex items-center gap-3 pl-3 pr-1.5 py-1 rounded-full border bg-card/70 hover:bg-card transition-all shadow-xs">
                <div className="flex flex-col items-end text-right hidden sm:flex">
                  <span className="text-sm font-semibold leading-tight text-foreground">
                    {displayName}
                  </span>
                  {displayEmail && (
                    <span className="text-xs text-muted-foreground leading-tight max-w-[180px] truncate">
                      {displayEmail}
                    </span>
                  )}
                </div>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 ring-2 ring-primary/20 hover:ring-primary/40 transition-all",
                    },
                  }}
                />
              </div>
            ) : (
              <Link href="/auth#sign-in">
                <Button size="sm" variant="default">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
