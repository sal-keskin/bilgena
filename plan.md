# Implementation Plan: Bilgena (Mobile-First Authoring Tool)

This plan outlines the step-by-step execution to build the Bilgena LMS editor. It follows a data-first approach, establishing the schema and state management before implementing the complex UI.

## Phase 1: Foundation, Data Layer & Types
**Goal:** Establish the data structures that drive the entire application. The UI cannot be built until these types are strict.

- [ ] **1.1. Project Initialization**
  - Initialize Next.js 14+ (App Router) with TypeScript.
  - Install Tailwind CSS.
  - Initialize `shadcn/ui` with **Zinc** color palette and CSS variables.
  - Install core dependencies: `zustand`, `immer`, `zod`, `@dnd-kit/core`, `@dnd-kit/sortable`, `lucide-react`, `archiver`.

- [ ] **1.2. Database & ORM Setup**
  - Initialize Prisma with SQLite (for Sandbox/Local dev) or PostgreSQL.
  - **Action:** Create `prisma/schema.prisma` with the following models:
    - `User`: Standard auth fields.
    - `Course`: Contains the critical `content Json` column.
  - Run `npx prisma migrate dev --name init`.

- [ ] **1.3. Strict Type Definitions**
  - **Action:** Create `types/course.ts`.
  - Implement the interfaces derived from `training-json.json`:
    - `TemplateType`: Union type for slide templates.
    - `SlideData`: Discriminated unions for `ImageSlider`, `MultipleChoice`, etc.
    - `Slide`: The atomic unit with `displayIndex` and `templateName`.
    - `Lesson`: Container for slides.
    - `CourseContent`: Root JSON object with branding and global config.

## Phase 2: State Management (The Brain)
**Goal:** Implement the logic that manipulates the course JSON. This must be decoupled from the UI.

- [ ] **2.1. Editor Store (Zustand)**
  - **Action:** Create `store/editorStore.ts`.
  - Implement `useEditorStore` with strict typing.
  - **Selectors:** Create selectors for `activeSlide`, `activeLesson`, and `courseBranding`.

- [ ] **2.2. State Actions (Optimistic UI)**
  - Implement `setCourse` to hydrate state from DB.
  - Implement `updateSlideData(slideId, partialData)` using `immer` for immutable deep updates.
  - Implement `addSlide(lessonId, templateType)`:
    - Should verify the lesson exists.
    - Should append a new slide object with default `data` matching the `templateType`.
  - Implement `reorderSlides(lessonId, oldIndex, newIndex)`:
    - Should update the `displayIndex` of affected slides.

## Phase 3: The Editor Shell (UI Architecture)
**Goal:** Create the "Holy Grail" 3-pane layout.

- [ ] **3.1. Layout Skeleton**
  - Create `app/editor/[courseId]/layout.tsx`.
  - Use `ResizablePanelGroup` (if available in shadcn) or a Grid layout.
  - Define 3 zones:
    1.  **Left:** Navigation (250px min).
    2.  **Center:** Canvas (Flex grow, gray background).
    3.  **Right:** Properties (300px min).

- [ ] **3.2. Left Sidebar (Navigation)**
  - Component: `LessonList.tsx`.
  - Implement `dnd-kit` SortableContext for reordering slides.
  - Add the "Add Slide" button (Large touch target - Fitts's Law).
  - Highlight the `activeSlideId` based on store state.

- [ ] **3.3. Center Stage (Mobile Simulation)**
  - Component: `MobileCanvas.tsx`.
  - Container: Fixed width `375px`, Height `812px`, `bg-white`, `rounded-3xl`, `shadow-xl`.
  - **Constraint:** Use `container-type: size` or strict pixel widths to ensure mobile fidelity on desktop.

## Phase 4: Slide Rendering Engine (The Player)
**Goal:** A dynamic renderer that works in both "Editor Mode" and "SCORM Player Mode".

- [ ] **4.1. The Registry**
  - Component: `SlideRenderer.tsx`.
  - Props: `{ slide: Slide, mode: 'edit' | 'view' }`.
  - Logic: Switch statement on `slide.type` to render specific components.

- [ ] **4.2. Slide Components**
  - **Image Slider:**
    - Support `Vertical series` scrolling.
    - Render image/text/video layers.
  - **Multiple Choice:**
    - Render question prompt.
    - Render selectable options.
    - In `mode='edit'`, disable interactivity (clicking selects the slide, doesn't answer the quiz).

## Phase 5: Authoring Forms (Right Sidebar)
**Goal:** Context-aware forms to edit the active slide.

- [ ] **5.1. Form Registry**
  - Component: `PropertiesPanel.tsx`.
  - Subscribe to `useEditorStore.activeSlide`.
  - Switch render based on `activeSlide.type`.

- [ ] **5.2. Specific Forms**
  - **ImageSliderForm:** Inputs for Image URL, Caption, Position (Cover/Contain).
  - **QuizForm:** Dynamic array inputs for Questions and Answers.
  - **UX Law:** Group inputs into Cards (Common Region).

## Phase 6: SCORM & Export
**Goal:** Generate the offline-capable ZIP package.

- [ ] **6.1. Static Player Build**
  - Create a lightweight `player/` directory (or specific Next.js route).
  - Ensure `SlideRenderer` is shared/importable here.
  - This build accepts a `window.COURSE_DATA` object to hydrate its state.

- [ ] **6.2. The Archiver**
  - **Action:** Create `lib/scorm.ts`.
  - Function: `generateManifest(course)` creates `imsmanifest.xml` dynamically.
  - Function: `packageCourse(courseId)`:
    1.  Fetches course JSON from DB.
    2.  Reads the static player build files.
    3.  Injects JSON into `index.html`.
    4.  Zips everything using `archiver`.

- [ ] **6.3. API Route**
  - Create `app/api/courses/[courseId]/export/route.ts`.
  - Trigger the `packageCourse` function and stream the ZIP to the client.
