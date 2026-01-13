'use client';

import { useEditorStore } from "@/store/editorStore";
import { cn } from "@/lib/utils";

interface LessonListProps {
  onOpenSlideLibrary: () => void;
}

export function LessonList({ onOpenSlideLibrary }: LessonListProps) {
  const {
    courseContent,
    activeLessonId,
    activeSlideId,
    setActiveLesson,
    setActiveSlide,
    addLesson,
  } = useEditorStore();

  if (!courseContent) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      {/* Top Course Info */}
      <div className="p-4 border-b border-border-light dark:border-border-dark">
        <div className="flex gap-3">
            <img alt="Course Thumbnail" className="w-12 h-12 rounded-md object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqztaI6Ah0Y171c0p5FleFZra1l3W2vaNhgPEoRFiXxo_-eAHCT-uFKFMhxMGFOtJ1N-r69TOgFJD7NDzYhn7cnaWtmxPgskVIZNjBq6I5mBp2wIm5m2N-59oHNdGuqNc6yA0ZreQ8Kk-ZgKNsAt2bM1yeBQC6y3buE6n5M0y1wjM2CkjmfbhYFvDNrRqA6nf5_J0347GFVR-CexO_IXyGrQZg8MFVULOSF9A8Hwyuy97RK7JJK0vRLj3CMBCyBMGOhBxTMn2wnRw"/>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                    {/* Placeholder title since we don't have course title in store yet */}
                    <h2 className="font-semibold text-sm leading-tight text-slate-800 dark:text-white line-clamp-2">Course Editor</h2>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2 py-0.5 rounded font-medium">Draft</span>
                </div>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll flex flex-col">
        <div className="px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Lessons</h3>
            <button
                onClick={() => addLesson("New Lesson")}
                className="w-6 h-6 bg-primary text-white rounded flex items-center justify-center hover:opacity-90"
            >
                <span className="material-icons-outlined text-sm">add</span>
            </button>
        </div>

        <div className="px-3 pb-2 space-y-4">
            {courseContent.lessons.map((lesson, idx) => {
                const isActive = activeLessonId === lesson.id;
                return (
                    <div key={lesson.id} className={cn(
                        "rounded-lg p-3 border transition-colors",
                        isActive
                            ? "bg-secondary/30 dark:bg-primary/20 border-secondary dark:border-primary/30"
                            : "bg-surface-light dark:bg-surface-dark border-transparent hover:border-slate-200"
                    )}>
                        <div
                            className="flex items-start gap-2 mb-2 cursor-pointer"
                            onClick={() => setActiveLesson(lesson.id)}
                        >
                            <div className="mt-0.5 text-slate-500 dark:text-slate-400">
                                <span className="material-icons-outlined text-base">article</span>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-slate-800 dark:text-white leading-tight">{lesson.title}</h4>
                                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">13:00</span>
                            </div>
                        </div>

                        {/* Expanded slides for active lesson */}
                        {isActive && (
                            <div className="ml-1 space-y-0.5 mt-2">
                                {lesson.slides.map((slide, sIdx) => (
                                    <div
                                        key={slide.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveSlide(slide.id);
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 py-1.5 px-2 rounded text-sm cursor-pointer transition-colors",
                                            activeSlideId === slide.id
                                            ? 'bg-secondary dark:bg-primary/30 text-primary font-medium'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                                        )}
                                    >
                                        <span className={cn(
                                            "w-4 text-right text-xs",
                                            activeSlideId === slide.id ? 'opacity-70' : 'opacity-50'
                                        )}>{sIdx + 1}</span>
                                        <span className="truncate">{slide.title || "Untitled Slide"}</span>
                                    </div>
                                ))}

                                <div className="pt-2 px-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onOpenSlideLibrary();
                                        }}
                                        className="w-full py-2.5 px-4 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all group"
                                    >
                                        <span className="material-icons-outlined text-lg group-hover:scale-110 transition-transform">add_circle</span>
                                        New Slide
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      <div className="p-3 border-t border-border-light dark:border-border-dark mt-auto">
        <button className="flex items-center gap-2 w-full px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
            <span className="material-icons-outlined text-xl">palette</span>
            <span className="font-medium text-sm">Theme</span>
        </button>
      </div>
    </div>
  );
}
