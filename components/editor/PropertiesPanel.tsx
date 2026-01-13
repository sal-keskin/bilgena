'use client';

import { useState } from 'react';
import { useEditorStore } from "@/store/editorStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slide, SlideData } from "@/types/course";
import { v4 as uuidv4 } from 'uuid';
import { cn } from "@/lib/utils";

export function PropertiesPanel() {
  const { activeLessonId, activeSlideId, courseContent, updateSlide } = useEditorStore();
  const [itemsExpanded, setItemsExpanded] = useState(true);

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
       {/* Tabs */}
       <div className="flex border-b border-border-light dark:border-border-dark">
           <button className="flex-1 py-3 text-sm font-medium text-primary border-b-2 border-primary">Edit</button>
           <button className="flex-1 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">Comments</button>
       </div>

       <div className="flex-1 overflow-y-auto custom-scroll p-4 space-y-6">
          {/* Slide Type Header */}
          <div className="flex items-center justify-between text-xs font-bold text-primary tracking-wider">
             <span className="flex items-center gap-1 uppercase">
                 <span className="material-icons-outlined text-sm">wysiwyg</span>
                 {activeSlide.template}
             </span>
             <span className="text-slate-400 font-normal">Standard</span>
          </div>

          {/* Items Accordion */}
          <div>
            <div
                className="flex items-center justify-between mb-3 group cursor-pointer"
                onClick={() => setItemsExpanded(!itemsExpanded)}
            >
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Properties</h3>
                <span className="material-icons-outlined text-slate-400">{itemsExpanded ? 'remove' : 'add'}</span>
            </div>

            {itemsExpanded && (
                <div className="space-y-4">
                     {/* Title Field */}
                     <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Slide Title</Label>
                        <Input
                          className="font-sans text-sm"
                          value={activeSlide.title}
                          onChange={(e) => handleChange({ title: e.target.value })}
                        />
                     </div>

                     {/* Type Specific Forms */}
                     {activeSlide.data.type === 'text' && (
                        <div className="space-y-2">
                           <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Content</Label>
                           <Textarea
                             className="min-h-[150px] font-sans text-sm leading-relaxed"
                             value={activeSlide.data.content}
                             onChange={(e) => handleDataChange({ content: e.target.value })}
                           />
                        </div>
                     )}

                     {activeSlide.data.type === 'image-slider' && (
                        <div className="space-y-4">
                           <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Images</Label>
                           {activeSlide.data.images.map((img, idx) => (
                             <div key={idx} className="p-3 border border-border-light dark:border-border-dark rounded-md space-y-2 relative group bg-slate-50 dark:bg-slate-800/50">
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
                                  <span className="material-icons-outlined text-xs">delete</span>
                                </Button>
                                <Input
                                  placeholder="Image URL"
                                  className="text-xs"
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
                                  className="text-xs"
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
                           <Button variant="outline" className="w-full border-dashed" onClick={() => {
                              const data = activeSlide.data as Extract<SlideData, { type: 'image-slider' }>;
                              handleDataChange({
                                images: [...data.images, { url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800', caption: 'New Image' }]
                              });
                           }}>
                             <span className="material-icons-outlined text-sm mr-2">add_photo_alternate</span> Add Image
                           </Button>
                        </div>
                     )}

                     {activeSlide.data.type === 'video' && (
                       <div className="space-y-2">
                         <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Video URL</Label>
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
                            <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Question</Label>
                            <Input
                              value={activeSlide.data.question}
                              onChange={(e) => handleDataChange({ question: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Options</Label>
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
                                   <span className="material-icons-outlined text-sm text-muted-foreground">delete</span>
                                 </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => {
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
            )}
          </div>
       </div>
    </div>
  );
}
