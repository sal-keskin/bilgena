import { getCourses, createCourse } from './actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  console.log("Rendering SafetyApp DashboardPage"); // Tracer bullet for Vercel logs
  const courses = await getCourses();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">SafetyApp Dashboard</h1>
          <p className="text-muted-foreground mt-2">Create and manage your mobile-first training courses.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Course Card */}
        <Card className="border-dashed border-2 flex flex-col justify-center items-center h-[250px] hover:bg-muted/50 transition-colors">
          <form action={createCourse} className="w-full max-w-xs space-y-4 p-4">
             <div className="space-y-2">
                <Label htmlFor="title" className="sr-only">Course Title</Label>
                <Input id="title" name="title" placeholder="New Course Title" required />
                <Input id="description" name="description" placeholder="Description (optional)" />
             </div>
             <Button type="submit" className="w-full">
               <PlusCircle className="mr-2 h-4 w-4" /> Create Course
             </Button>
          </form>
        </Card>

        {/* Existing Courses */}
        {courses.map((course) => (
          <Card key={course.id} className="h-[250px] flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description || 'No description provided.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="flex items-center text-sm text-muted-foreground">
                 <div className="bg-primary/10 p-2 rounded-full mr-3">
                   <BookOpen className="h-4 w-4 text-primary" />
                 </div>
                 <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
               </div>
            </CardContent>
            <CardFooter>
              <Link href={`/editor/${course.id}`} className="w-full">
                <Button variant="secondary" className="w-full">Edit Course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
