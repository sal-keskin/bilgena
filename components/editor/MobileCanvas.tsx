'use client';

import { useEditorStore } from "@/store/editorStore";
import { SlideRenderer } from "./SlideRenderer";

export function MobileCanvas() {
  const { activeSlideId, courseContent } = useEditorStore();

  const activeSlide = courseContent?.lessons
    .flatMap(l => l.slides)
    .find(s => s.id === activeSlideId);

  // Calculate slide index
  let slideIndex = 0;
  let totalSlides = 0;
  if (courseContent) {
      const allSlides = courseContent.lessons.flatMap(l => l.slides);
      totalSlides = allSlides.length;
      slideIndex = allSlides.findIndex(s => s.id === activeSlideId) + 1;
  }

  return (
    <>
        {/* Phone Frame */}
        <div className="relative w-[340px] h-[680px] bg-white dark:bg-black rounded-[40px] shadow-phone border-[8px] border-slate-800 dark:border-slate-900 overflow-hidden flex flex-col shrink-0 z-10">
            {/* Top Bar */}
            <div className="h-14 bg-white/90 dark:bg-black/90 backdrop-blur-sm absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-400 to-primary flex items-center justify-center text-white font-bold text-xs">SC</div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">Course Preview</span>
                </div>
                <div className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded">{slideIndex} / {totalSlides || '-'}</div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative bg-white dark:bg-slate-800 pt-14 pb-24 overflow-y-auto custom-scroll">
                {activeSlide ? (
                    <SlideRenderer slide={activeSlide} />
                ) : (
                    <div className="h-full flex items-center justify-center p-6 text-center text-slate-400">
                        Select a slide to edit
                    </div>
                )}
            </div>

            {/* Bottom Action Area (Mock) */}
            <div className="p-6 bg-transparent absolute bottom-0 w-full flex justify-center pb-8 pointer-events-none">
                <button className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded shadow-lg transition-colors pointer-events-auto">
                    Continue
                </button>
            </div>
        </div>

        {/* View Controls */}
        <div className="absolute bottom-6 flex items-center gap-2 bg-white dark:bg-slate-900 shadow-md border border-border-light dark:border-border-dark px-3 py-1.5 rounded-lg z-20">
            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-icons-outlined text-lg">undo</span>
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-r border-border-light dark:border-border-dark pr-3 mr-1">
                <span className="material-icons-outlined text-lg">redo</span>
            </button>
            <button className="p-1.5 text-primary bg-primary/10 rounded">
                <span className="material-icons-outlined text-lg">smartphone</span>
            </button>
            <span className="text-xs font-medium text-primary">Mobile</span>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-icons-outlined text-lg">tablet</span>
            </button>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-icons-outlined text-lg">desktop_mac</span>
            </button>
        </div>
    </>
  );
}
