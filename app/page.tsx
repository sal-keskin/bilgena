import { getCourses, createCourse } from './actions';
import Link from 'next/link';

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="h-full flex flex-col bg-background-main dark:bg-background-dark">
        <header className="bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-border-dark shrink-0">
            <div className="px-6 h-16 flex items-center justify-between">
                <nav className="flex space-x-8 h-full">
                    <a className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 h-full border-b-2 border-transparent hover:border-slate-300" href="#">Learn</a>
                    <a className="flex items-center text-sm font-medium text-primary h-full border-b-2 border-primary" href="#">
                        Content
                        <span className="material-symbols-outlined text-lg ml-1">arrow_drop_down</span>
                    </a>
                    <a className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 h-full border-b-2 border-transparent hover:border-slate-300" href="#">
                        Onboard
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-orange-100 text-primary text-[10px] font-bold uppercase tracking-wider">NEW</span>
                    </a>
                    <a className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 h-full border-b-2 border-transparent hover:border-slate-300" href="#">
                        Engage
                        <span className="material-symbols-outlined text-lg ml-1">arrow_drop_down</span>
                    </a>
                    <a className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 h-full border-b-2 border-transparent hover:border-slate-300" href="#">
                        Facilitate
                        <span className="material-symbols-outlined text-lg ml-1">arrow_drop_down</span>
                    </a>
                </nav>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Content</h1>
                    <div className="flex items-center gap-3">
                        <Link href="/setup" className="bg-white dark:bg-surface-dark hover:bg-slate-50 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-border-dark font-medium text-sm flex items-center gap-2 shadow-sm transition-colors">
                            <span className="material-symbols-outlined text-[20px]">settings</span>
                            Settings
                        </Link>
                        <button className="bg-white dark:bg-surface-dark hover:bg-slate-50 text-primary px-4 py-2.5 rounded-lg border border-slate-300 dark:border-border-dark font-medium text-sm flex items-center gap-2 shadow-sm transition-colors">
                            <span className="material-symbols-outlined text-[20px]">library_books</span>
                            Browse Library
                        </button>

                        {/*
                            For simplicity, keeping the form submission logic inline or we could make this a client component.
                            Since createCourse is a server action, we can use a form here.
                        */}
                        <form action={createCourse}>
                            <input type="hidden" name="title" value="New Untitled Course" />
                            <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[20px]">add</span>
                                Create course
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <Link key={course.id} href={`/editor/${course.id}`} className="block bg-surface-card dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-border-dark overflow-hidden shadow-card hover:shadow-md transition-shadow flex flex-col h-full group cursor-pointer">
                            <div className="h-48 overflow-hidden relative bg-slate-100">
                                {/* Using a placeholder image or generic one as we don't have course-specific images in DB yet */}
                                <img
                                    alt="Course"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqztaI6Ah0Y171c0p5FleFZra1l3W2vaNhgPEoRFiXxo_-eAHCT-uFKFMhxMGFOtJ1N-r69TOgFJD7NDzYhn7cnaWtmxPgskVIZNjBq6I5mBp2wIm5m2N-59oHNdGuqNc6yA0ZreQ8Kk-ZgKNsAt2bM1yeBQC6y3buE6n5M0y1wjM2CkjmfbhYFvDNrRqA6nf5_J0347GFVR-CexO_IXyGrQZg8MFVULOSF9A8Hwyuy97RK7JJK0vRLj3CMBCyBMGOhBxTMn2wnRw"
                                />
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-primary tracking-wide uppercase mb-2">
                                    <span className="material-symbols-outlined text-[16px] fill-current">school</span>
                                    Course
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 leading-snug line-clamp-2">{course.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description || "No description"}</p>
                                <div className="mt-auto pt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                        <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-primary dark:text-orange-300 flex items-center justify-center font-bold text-[10px]">OK</div>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
                                            <span>1</span>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium">Draft</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {courses.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-500">
                            No courses found. Create one to get started.
                        </div>
                    )}
                </div>
            </div>
        </main>

        <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-50">
            <span className="material-symbols-outlined text-2xl">chat_bubble</span>
        </button>
    </div>
  );
}
