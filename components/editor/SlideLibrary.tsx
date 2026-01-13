'use client';

import { useEditorStore } from "@/store/editorStore";
import { cn } from "@/lib/utils";
import { TemplateType } from "@/types/course";

interface SlideLibraryProps {
  onClose: () => void;
}

const TEMPLATES: { title: string; icon: string; color: string; type: TemplateType }[] = [
  { title: "Standard Article", icon: "article", color: "bg-blue-500", type: 'text' },
  { title: "Image Slider", icon: "collections", color: "bg-emerald-500", type: 'image-slider' },
  { title: "Video Player", icon: "play_circle", color: "bg-purple-500", type: 'video' },
  { title: "Multiple Choice", icon: "quiz", color: "bg-cyan-500", type: 'multiple-choice' },
];

export function SlideLibrary({ onClose }: SlideLibraryProps) {
  const { addSlide, activeLessonId } = useEditorStore();

  const handleAddSlide = (type: TemplateType) => {
    if (activeLessonId) {
      addSlide(activeLessonId, type);
      onClose();
    } else {
      alert("Please select a lesson first.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-surface-dark w-full max-w-6xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-border-dark">
            {/* Modal Header */}
            <div className="h-16 border-b border-slate-200 dark:border-border-dark flex items-center justify-between px-6 bg-white dark:bg-surface-dark shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-icons-outlined">library_add</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">Slide Library</h2>
                        <p className="text-xs text-slate-500">Select a template to add to your course</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                        <input type="text" placeholder="Search templates..." className="pl-10 pr-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border-none text-sm w-72 focus:ring-2 focus:ring-primary/50 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none" />
                    </div>
                    <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 cursor-pointer">
                        <span className="material-icons-outlined">close</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Categories Sidebar */}
                <div className="w-64 border-r border-slate-200 dark:border-border-dark bg-surface-light dark:bg-background-dark/50 p-4 overflow-y-auto hidden md:block">
                    <div className="space-y-1">
                        {['All Templates', 'Text Layouts', 'Media & Gallery', 'Quizzes & Polls'].map((cat, i) => (
                            <button key={i} className={cn(
                                "w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between group transition-colors",
                                i === 0 ? 'bg-white dark:bg-slate-800 text-primary shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800'
                            )}>
                                {cat}
                                {i === 0 && <span className="w-2 h-2 rounded-full bg-primary"></span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 dark:bg-background-dark custom-scroll">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-800 dark:text-white">Available Templates</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                        {TEMPLATES.map((item, idx) => (
                            <div key={idx} className="group cursor-pointer" onClick={() => handleAddSlide(item.type)}>
                                <div className="aspect-[4/3] bg-white dark:bg-surface-card rounded-xl border border-slate-200 dark:border-border-dark shadow-sm group-hover:shadow-xl group-hover:border-primary/30 transition-all relative overflow-hidden flex flex-col transform group-hover:-translate-y-1 duration-300">
                                    <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 relative p-6 flex flex-col items-center justify-center gap-4">
                                        <div className={cn("w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-white", item.color)}>
                                            <span className="material-icons-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                    </div>
                                    <div className="p-4 bg-white dark:bg-surface-card border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-slate-800 dark:text-white text-sm">{item.title}</p>
                                            <span className="material-icons-outlined text-slate-300 group-hover:text-primary transition-colors text-lg">add_circle</span>
                                        </div>
                                    </div>

                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center backdrop-blur-[2px]">
                                        <button
                                            className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transform scale-90 group-hover:scale-100 transition-all flex items-center gap-2"
                                        >
                                            <span className="material-icons-outlined">add</span>
                                            Add Slide
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-14 bg-slate-50 dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark px-6 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-500">{TEMPLATES.length} templates available</span>
                <button className="text-primary text-sm font-medium hover:underline">Import from another course</button>
            </div>
        </div>
    </div>
  );
}
