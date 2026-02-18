import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const signOut = async () => {
        'use server';
        const supabase = await createClient();
        await supabase.auth.signOut();
        revalidatePath('/', 'layout'); // clear cache essentially
        redirect('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
            {/* Simple Navbar for Dashboard */}
            <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-xl tracking-tight">MyApp Dashboard</div>
                <form action={signOut}>
                    <button className="text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                        Sign Out
                    </button>
                </form>
            </nav>

            <main className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Hello, {user.email}</h1>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Account Info</h2>
                            <div className="space-y-3 text-sm">
                                <p><span className="font-medium text-gray-500 dark:text-gray-400">Email:</span> {user.email}</p>
                                <p><span className="font-medium text-gray-500 dark:text-gray-400">User ID:</span> {user.id}</p>
                                <p><span className="font-medium text-gray-500 dark:text-gray-400">Last Sign In:</span> {new Date(user.last_sign_in_at || '').toLocaleDateString()} {new Date(user.last_sign_in_at || '').toLocaleTimeString()}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Quick Actions</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">You are securely logged in. This content is protected and only visible to authenticated users.</p>
                            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                Manage Profile
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
