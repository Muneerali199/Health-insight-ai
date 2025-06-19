"use client";

import Link from "next/link";
import { Activity, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden md:inline-block">HealthInsight AI</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      
      <div 
        className={cn(
          "md:hidden absolute w-full bg-background border-b transition-all duration-300 ease-in-out transform", 
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav className="container py-4 flex flex-col space-y-2">
          <Link 
            href="/dashboard" 
            className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            href="/dashboard/history" 
            className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            History
          </Link>
          <Link 
            href="/dashboard/settings" 
            className="px-4 py-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}