'use client';

import { useEditorStore } from "@/store/editorStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash, Plus } from "lucide-react";
import { Slide, SlideData } from "@/types/course";
import { v4 as uuidv4 } from 'uuid';

export function PropertiesPanel() {
  const { activeLessonId, activeSlideId, courseContent, updateSlide } = useEditorStore();

  const activeSlide = courseContent?.lessons
    .flatMap(l => l.slides)
    .find(s => s.id === activeSlideId);

  const activeLesson = courseContent?.lessons.find(l => l.id === activeLessonId);

  if (!activeSlide || !activeLesson) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm mt-10">
        Select a slide to edit properties
      </div>
    );
  }

  const handleChange = (updates: Partial<Slide>) => {
    updateSlide(activeLesson.id, activeSlide.id, updates);
  };

  const handleDataChange = (dataUpdates: Record<string, unknown>) => {
    updateSlide(activeLesson.id, activeSlide.id, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: { ...activeSlide.data, ...dataUpdates } as any
    });
  };

  return (
    <div className="flex flex-col h-full">
       <div className="p-4 border-b font-semibold bg-muted/20">
         Properties
       </div>
       <div className="flex-1 overflow-y-auto p-4 space-y-6">

          <div className="space-y-2">
            <Label>Slide Title</Label>
            <Input
              value={activeSlide.title}
              onChange={(e) => handleChange({ title: e.target.value })}
            />
          </div>

          <Separator />

          {/* Type Specific Forms */}
          {activeSlide.data.type === 'text' && (
             <div className="space-y-2">
               <Label>Content</Label>
               <Textarea
                 className="min-h-[150px]"
                 value={activeSlide.data.content}
                 onChange={(e) => handleDataChange({ content: e.target.value })}
               />
             </div>
          )}

          {activeSlide.data.type === 'image-slider' && (
             <div className="space-y-4">
                <Label>Images</Label>
                {activeSlide.data.images.map((img, idx) => (
                  <div key={idx} className="p-3 border rounded-md space-y-2 relative group">
                     <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const data = activeSlide.data as Extract<SlideData, { type: 'image-slider' }>;
                          const newImages = [...data.images];
                          newImages.splice(idx, 1);
                          handleDataChange({ images: newImages });
                        }}
                     >
                       <Trash className="h-3 w-3" />
                     </Button>
                     <Input
                       placeholder="Image URL"
                       value={img.url}
                       onChange={(e) => {
                         const data = activeSlide.data as Extract<SlideData, { type: 'image-slider' }>;
                         const newImages = [...data.images];
                         newImages[idx].url = e.target.value;
                         handleDataChange({ images: newImages });
                       }}
                     />
                     <Input
                       placeholder="Caption"
                       value={img.caption || ''}
                       onChange={(e) => {
                         const data = activeSlide.data as Extract<SlideData, { type: 'image-slider' }>;
                         const newImages = [...data.images];
                         newImages[idx].caption = e.target.value;
                         handleDataChange({ images: newImages });
                       }}
                     />
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => {
                   const data = activeSlide.data as Extract<SlideData, { type: 'image-slider' }>;
                   handleDataChange({
                     images: [...data.images, { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800', caption: 'New Image' }]
                   });
                }}>
                  <Plus className="mr-2 h-4 w-4" /> Add Image
                </Button>
             </div>
          )}

          {activeSlide.data.type === 'video' && (
            <div className="space-y-2">
              <Label>Video URL</Label>
              <Input
                value={activeSlide.data.url}
                onChange={(e) => handleDataChange({ url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          )}

          {activeSlide.data.type === 'multiple-choice' && (
            <div className="space-y-4">
               <div className="space-y-2">
                 <Label>Question</Label>
                 <Input
                   value={activeSlide.data.question}
                   onChange={(e) => handleDataChange({ question: e.target.value })}
                 />
               </div>

               <div className="space-y-2">
                 <Label>Options</Label>
                 {activeSlide.data.options.map((opt, idx) => (
                   <div key={opt.id} className="flex items-center gap-2">
                      <Input
                        value={opt.text}
                        onChange={(e) => {
                          const data = activeSlide.data as Extract<SlideData, { type: 'multiple-choice' }>;
                          const newOptions = [...data.options];
                          newOptions[idx].text = e.target.value;
                          handleDataChange({ options: newOptions });
                        }}
                      />
                      <Button variant="ghost" size="icon" onClick={() => {
                          const data = activeSlide.data as Extract<SlideData, { type: 'multiple-choice' }>;
                          const newOptions = [...data.options];
                          newOptions.splice(idx, 1);
                          handleDataChange({ options: newOptions });
                      }}>
                        <Trash className="h-4 w-4 text-muted-foreground" />
                      </Button>
                   </div>
                 ))}
                 <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    const data = activeSlide.data as Extract<SlideData, { type: 'multiple-choice' }>;
                    handleDataChange({
                      options: [...data.options, { id: uuidv4(), text: 'Option ' + (data.options.length + 1), isCorrect: false }]
                    })
                 }}>
                   Add Option
                 </Button>
               </div>
            </div>
          )}

       </div>
    </div>
  );
}
