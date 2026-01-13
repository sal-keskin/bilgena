'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { LessonList } from "./LessonList";
import { MobileCanvas } from "./MobileCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export function EditorShell() {
  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <header className="h-14 border-b flex items-center px-4 justify-between bg-card z-10">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="font-semibold text-sm">Course Editor</span>
        </div>
        <div className="flex items-center gap-2">
           <Button size="sm" variant="outline" disabled>
             <Save className="h-4 w-4 mr-2" />
             Auto-saving...
           </Button>
           <Button size="sm">Publish</Button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup orientation="horizontal">

          {/* Left Sidebar: Lessons */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r bg-muted/30">
            <LessonList />
          </ResizablePanel>

          <ResizableHandle />

          {/* Center: Canvas */}
          <ResizablePanel defaultSize={55} className="bg-muted/10 relative">
            <MobileCanvas />
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Sidebar: Properties */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35} className="border-l bg-card">
            <PropertiesPanel />
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
