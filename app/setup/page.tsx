import Link from 'next/link';

export default function SetupPage() {
    return (
        <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100">
            <header className="h-16 border-b border-border-light dark:border-border-dark flex items-center px-4 bg-background-light dark:bg-background-dark shrink-0">
                <Link href="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                    <span className="material-icons-outlined text-xl">arrow_back</span>
                    <span className="font-medium">Back to Dashboard</span>
                </Link>
            </header>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <span className="material-icons-outlined text-3xl">settings_applications</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Set up Page</h1>
                <p className="text-slate-500 text-center max-w-md">Configure course settings, permissions, and metadata here.</p>
            </div>
        </div>
    );
}
