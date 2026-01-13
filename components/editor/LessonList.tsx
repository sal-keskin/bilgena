'use client';

import { useEditorStore } from "@/store/editorStore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, GripVertical, Image as ImageIcon, FileText, Video, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export function LessonList() {
  const {
    courseContent,
    activeLessonId,
    activeSlideId,
    setActiveLesson,
    setActiveSlide,
    addLesson,
    addSlide
  } = useEditorStore();

  if (!courseContent) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-2">Structure</h2>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={() => addLesson("New Lesson")}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Lesson
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {courseContent.lessons.map((lesson) => (
            <div key={lesson.id} className="space-y-2">
              <div
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted font-medium text-sm group",
                  activeLessonId === lesson.id && "bg-muted text-primary"
                )}
                onClick={() => setActiveLesson(lesson.id)}
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {lesson.displayIndex + 1}
                </div>
                <span className="truncate flex-1">{lesson.title}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                  <Plus className="h-3 w-3" onClick={(e) => {
                    e.stopPropagation();
                    // Add default slide
                    addSlide(lesson.id, 'text');
                  }} />
                </Button>
              </div>

              {/* Slides List */}
              <div className="ml-4 pl-4 border-l space-y-1">
                {lesson.slides.map((slide) => (
                  <div
                    key={slide.id}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm hover:bg-muted/50 transition-colors",
                      activeSlideId === slide.id && "bg-primary/10 text-primary font-medium"
                    )}
                    onClick={() => {
                      setActiveLesson(lesson.id);
                      setActiveSlide(slide.id);
                    }}
                  >
                    <GripVertical className="h-3 w-3 text-muted-foreground/50" />
                    {getIconForTemplate(slide.template)}
                    <span className="truncate text-xs">{slide.title}</span>
                  </div>
                ))}

                {activeLessonId === lesson.id && (
                  <div className="pt-2 grid grid-cols-4 gap-1">
                     <TemplateButton icon={<ImageIcon className="h-3 w-3" />} label="Img" onClick={() => addSlide(lesson.id, 'image-slider')} />
                     <TemplateButton icon={<ListChecks className="h-3 w-3" />} label="Quiz" onClick={() => addSlide(lesson.id, 'multiple-choice')} />
                     <TemplateButton icon={<Video className="h-3 w-3" />} label="Vid" onClick={() => addSlide(lesson.id, 'video')} />
                     <TemplateButton icon={<FileText className="h-3 w-3" />} label="Txt" onClick={() => addSlide(lesson.id, 'text')} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function getIconForTemplate(type: string) {
  switch (type) {
    case 'image-slider': return <ImageIcon className="h-3 w-3" />;
    case 'multiple-choice': return <ListChecks className="h-3 w-3" />;
    case 'video': return <Video className="h-3 w-3" />;
    default: return <FileText className="h-3 w-3" />;
  }
}

function TemplateButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" className="h-auto py-2 flex-col gap-1 h-12" onClick={onClick}>
       {icon}
       <span className="text-[10px]">{label}</span>
    </Button>
  )
}
