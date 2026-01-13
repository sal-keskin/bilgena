'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LessonList } from "./LessonList";
import { MobileCanvas } from "./MobileCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { SlideLibrary } from "./SlideLibrary";
import { cn } from "@/lib/utils";

export function EditorShell() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSlideLibrary, setShowSlideLibrary] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 h-screen flex flex-col overflow-hidden font-sans transition-colors duration-200">
      {/* Header */}
      <header className="h-16 border-b border-border-light dark:border-border-dark flex items-center justify-between px-4 bg-background-light dark:bg-background-dark z-20 shrink-0">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                <span className="material-icons-outlined text-xl">arrow_back</span>
                <span className="font-medium">Back</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <button className="flex items-center gap-1 text-primary font-medium">
                <span className="material-icons-outlined text-lg">language</span>
                <span>Turkish (Original)</span>
                <span className="material-icons-outlined text-sm">arrow_drop_down</span>
            </button>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm">
            <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary mb-1"></div>
                <span className="text-primary font-semibold">Edit</span>
            </div>
            <div className="w-16 h-px bg-slate-200 dark:bg-slate-700 mb-5"></div>
            <Link href="/setup" className="flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 mb-1 group-hover:bg-primary transition-colors"></div>
                <span className="text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors">Set up</span>
            </Link>
            <div className="w-16 h-px bg-slate-200 dark:bg-slate-700 mb-5"></div>
            <div className="flex flex-col items-center opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 mb-1"></div>
                <span className="text-slate-500 dark:text-slate-400">Publish</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mr-2">
                <span className="material-icons-outlined text-lg">cloud_done</span>
                <span>Saved</span>
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="material-icons-outlined">more_horiz</span>
            </button>
            <button className="px-4 py-1.5 rounded bg-primary text-white font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1">
                <span>Next</span>
                <span className="material-icons-outlined text-sm">arrow_forward</span>
            </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className={cn(
          "sidebar-transition border-border-light dark:border-border-dark flex flex-col bg-background-light dark:bg-background-dark z-10 relative",
          isSidebarCollapsed ? 'w-0 overflow-hidden border-none' : 'w-72 border-r'
        )}>
           <LessonList onOpenSlideLibrary={() => setShowSlideLibrary(true)} />
        </aside>

        {/* Center Canvas */}
        <section className="flex-1 bg-surface-light dark:bg-surface-dark relative flex flex-col items-center justify-center p-8 overflow-hidden transition-all duration-300">
             {/* Collapse/Expand Toggle Button */}
             <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 w-8 h-20 rounded-full bg-white dark:bg-slate-700 shadow-floating flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-primary transition-all z-30 group border border-border-light dark:border-border-dark",
                  isSidebarCollapsed && "left-0 rounded-l-none"
                )}
            >
                <span className={cn(
                  "material-icons-outlined text-2xl transition-transform duration-300",
                  isSidebarCollapsed ? 'rotate-180' : ''
                )}>chevron_left</span>
            </button>

            <MobileCanvas />

        </section>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-border-light dark:border-border-dark flex flex-col bg-background-light dark:bg-background-dark z-10">
           <PropertiesPanel />
        </aside>
      </main>

      {showSlideLibrary && (
        <SlideLibrary onClose={() => setShowSlideLibrary(false)} />
      )}
    </div>
  );
}
