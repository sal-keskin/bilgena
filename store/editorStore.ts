import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CourseContent, Lesson, Slide, TemplateType } from '@/types/course';
import { v4 as uuidv4 } from 'uuid';

interface EditorState {
  courseContent: CourseContent | null;
  activeLessonId: string | null;
  activeSlideId: string | null;

  // Actions
  setCourseContent: (content: CourseContent) => void;
  setActiveLesson: (id: string) => void;
  setActiveSlide: (id: string) => void;

  addLesson: (title: string) => void;
  addSlide: (lessonId: string, template: TemplateType) => void;
  updateSlide: (lessonId: string, slideId: string, updates: Partial<Slide>) => void;
  reorderSlides: (lessonId: string, oldIndex: number, newIndex: number) => void;
}

export const useEditorStore = create<EditorState>()(
  immer((set) => ({
    courseContent: null,
    activeLessonId: null,
    activeSlideId: null,

    setCourseContent: (content) => set((state) => {
      state.courseContent = content;
    }),

    setActiveLesson: (id) => set((state) => {
      state.activeLessonId = id;
    }),

    setActiveSlide: (id) => set((state) => {
      state.activeSlideId = id;
    }),

    addLesson: (title) => set((state) => {
      if (!state.courseContent) return;
      const newLesson: Lesson = {
        id: uuidv4(),
        title,
        slides: [],
        displayIndex: state.courseContent.lessons.length,
      };
      state.courseContent.lessons.push(newLesson);
    }),

    addSlide: (lessonId, template) => set((state) => {
      if (!state.courseContent) return;
      const lesson = state.courseContent.lessons.find((l) => l.id === lessonId);
      if (!lesson) return;

      const newSlide: Slide = {
        id: uuidv4(),
        template,
        title: 'New Slide',
        displayIndex: lesson.slides.length,
        data: { type: 'text', content: 'New Slide' } // Default data
      };

      // Initialize specific data based on template
      if (template === 'image-slider') {
        newSlide.data = { type: 'image-slider', images: [] };
      } else if (template === 'multiple-choice') {
        newSlide.data = { type: 'multiple-choice', question: 'New Question', options: [] };
      } else if (template === 'video') {
         newSlide.data = { type: 'video', url: '' };
      }

      lesson.slides.push(newSlide);
      state.activeSlideId = newSlide.id;
    }),

    updateSlide: (lessonId, slideId, updates) => set((state) => {
      if (!state.courseContent) return;
      const lesson = state.courseContent.lessons.find((l) => l.id === lessonId);
      if (!lesson) return;
      const slide = lesson.slides.find((s) => s.id === slideId);
      if (!slide) return;

      Object.assign(slide, updates);
    }),

    reorderSlides: (lessonId, oldIndex, newIndex) => set((state) => {
      if (!state.courseContent) return;
      const lesson = state.courseContent.lessons.find((l) => l.id === lessonId);
      if (!lesson) return;

      const [removed] = lesson.slides.splice(oldIndex, 1);
      lesson.slides.splice(newIndex, 0, removed);

      // Update display indexes
      lesson.slides.forEach((slide, index) => {
        slide.displayIndex = index;
      });
    }),
  }))
);
