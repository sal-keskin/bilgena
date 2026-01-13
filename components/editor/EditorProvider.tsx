'use client';

import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { CourseContent } from '@/types/course';

interface EditorProviderProps {
  initialContent: CourseContent;
  children: React.ReactNode;
}

export function EditorProvider({ initialContent, children }: EditorProviderProps) {
  const setCourseContent = useEditorStore((state) => state.setCourseContent);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setCourseContent(initialContent);
      initialized.current = true;
    }
  }, [initialContent, setCourseContent]);

  return <>{children}</>;
}
