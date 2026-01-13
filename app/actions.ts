'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { CourseContent } from '@/types/course';

export async function createCourse(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;

  const defaultContent: CourseContent = {
    lessons: [],
    branding: {
      primaryColor: '#2563eb', // Default blue
      fontFamily: 'Inter',
    },
  };

  // Ensure user exists (mock user for now since we don't have auth)
  let user = await prisma.user.findFirst({
    where: { email: 'demo@example.com' },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        name: 'Demo User',
      },
    });
  }

  const course = await prisma.course.create({
    data: {
      title,
      description,
      content: JSON.stringify(defaultContent), // Serialize to string for SQLite
      creatorId: user.id,
      isPublished: false,
    },
  });

  redirect(`/editor/${course.id}`);
}

export async function getCourses() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return courses;
}
