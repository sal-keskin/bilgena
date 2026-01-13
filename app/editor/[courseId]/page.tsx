import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditorProvider } from '@/components/editor/EditorProvider';
import { EditorShell } from '@/components/editor/EditorShell';
import { CourseContent } from '@/types/course';

interface EditorPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    notFound();
  }

  // Parse the string content back to object
  let content: CourseContent;
  try {
    content = JSON.parse(course.content) as CourseContent;
  } catch (e) {
    console.error("Failed to parse course content:", e);
    content = { lessons: [], branding: { primaryColor: '#000000' } };
  }

  return (
    <EditorProvider initialContent={content}>
       <EditorShell />
    </EditorProvider>
  );
}
