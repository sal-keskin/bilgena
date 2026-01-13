// Phase 1.3: Strict Type Definitions

export type TemplateType = 'image-slider' | 'multiple-choice' | 'video' | 'text';

export type SlideData =
  | { type: 'image-slider'; images: { url: string; caption?: string }[] }
  | { type: 'multiple-choice'; question: string; options: { id: string; text: string; isCorrect: boolean }[] }
  | { type: 'video'; url: string; caption?: string }
  | { type: 'text'; content: string };

export interface Slide {
  id: string;
  template: TemplateType;
  title: string;
  data: SlideData;
  displayIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  slides: Slide[];
  displayIndex: number;
}

export interface Branding {
  primaryColor: string;
  logoUrl?: string;
  fontFamily?: string;
}

export interface CourseContent {
  lessons: Lesson[];
  branding: Branding;
}
