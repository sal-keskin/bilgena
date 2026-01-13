'use client';

import { useEditorStore } from "@/store/editorStore";
import { SlideRenderer } from "./SlideRenderer";

export function MobileCanvas() {
  const { activeSlideId, courseContent } = useEditorStore();

  const activeSlide = courseContent?.lessons
    .flatMap(l => l.slides)
    .find(s => s.id === activeSlideId);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 overflow-auto">
      <div
        className="bg-white w-[375px] h-[812px] shadow-2xl rounded-[3rem] border-[8px] border-zinc-900 overflow-hidden flex flex-col relative"
        style={{ transform: 'scale(0.9)', transformOrigin: 'center' }}
      >
        {/* Status Bar */}
        <div className="h-6 bg-black w-full absolute top-0 z-50 flex justify-between px-6 items-center">
            <div className="text-[10px] text-white font-medium">9:41</div>
            <div className="flex gap-1">
               <div className="w-3 h-2 bg-white rounded-[1px]" />
               <div className="w-3 h-2 bg-white rounded-[1px]" />
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 mt-6 overflow-y-auto bg-white">
           {activeSlide ? (
             <SlideRenderer slide={activeSlide} />
           ) : (
             <div className="h-full flex items-center justify-center text-muted-foreground p-8 text-center">
                Select a slide to edit
             </div>
           )}
        </div>

        {/* Navigation Bar Mock */}
        <div className="h-16 border-t bg-zinc-50 flex items-center justify-between px-8 text-zinc-300">
           <div className="w-8 h-8 rounded-full bg-zinc-200" />
           <div className="w-8 h-8 rounded-full bg-zinc-200" />
           <div className="w-8 h-8 rounded-full bg-zinc-200" />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
      </div>
    </div>
  );
}
