'use client';

import { Slide } from "@/types/course";
import { cn } from "@/lib/utils";

export function SlideRenderer({ slide }: { slide: Slide }) {
  const { data } = slide;

  switch (data.type) {
    case 'text':
      return (
        <div className="p-8 h-full flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
          <div className="prose prose-zinc text-lg">
            {data.content}
          </div>
        </div>
      );

    case 'image-slider':
      return (
        <div className="h-full flex flex-col">
          {data.images && data.images.length > 0 ? (
             <div className="relative h-full w-full bg-black">
                {/* Simplified representation of slider - just showing first image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.images[0].url} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h2 className="text-2xl font-bold">{slide.title}</h2>
                  {data.images[0].caption && <p className="mt-2">{data.images[0].caption}</p>}
                </div>
             </div>
          ) : (
             <div className="h-full flex items-center justify-center bg-muted text-muted-foreground p-8 text-center">
               <div>
                 <p className="mb-2">No images added</p>
                 <p className="text-sm">Use the properties panel to add images.</p>
               </div>
             </div>
          )}
        </div>
      );

    case 'multiple-choice':
       return (
         <div className="h-full flex flex-col p-6 bg-primary/5">
            <div className="mt-10 mb-8">
               <span className="text-primary text-sm font-bold uppercase tracking-wider">Quiz</span>
               <h2 className="text-2xl font-bold mt-2">{data.question}</h2>
            </div>
            <div className="space-y-3">
               {data.options.map((opt) => (
                 <button
                   key={opt.id}
                   className={cn(
                     "w-full p-4 rounded-xl border-2 text-left transition-all hover:bg-white/50 active:scale-[0.98]",
                     "border-primary/10 bg-white shadow-sm"
                   )}
                 >
                   {opt.text}
                 </button>
               ))}
            </div>
         </div>
       );

    case 'video':
       return (
         <div className="h-full flex flex-col justify-center bg-black">
           {data.url ? (
             <video src={data.url} controls className="w-full aspect-video" />
           ) : (
             <div className="text-white text-center p-4">No video URL provided</div>
           )}
           <div className="p-4 text-white">
              <h2 className="text-xl font-bold">{slide.title}</h2>
           </div>
         </div>
       )

    default:
      return <div>Unknown slide type</div>;
  }
}
