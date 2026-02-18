'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function ConnectionTestPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [envCheck, setEnvCheck] = useState({ url: false, key: false });

    useEffect(() => {
        async function checkConnection() {
            // Check if environment variables are loaded
            const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
            const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            setEnvCheck({ url: hasUrl, key: hasKey });

            if (!hasUrl || !hasKey) {
                setStatus('error');
                setMessage('Missing environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.');
                return;
            }

            try {
                // Attempt to get the session to verify connection
                const { error } = await supabase.auth.getSession();

                if (error) {
                    throw error;
                }

                setStatus('success');
                setMessage('Successfully connected to Supabase!');
            } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
                console.error('Connection error:', error);
                setStatus('error');
                setMessage(`Connection failed: ${error.message}`);
            }
        }

        checkConnection();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h1 className="text-2xl font-bold mb-6 text-center">Supabase Connection Test</h1>

                {/* Environment Variable Check */}
                <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium">Supabase URL</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${envCheck.url ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                            {envCheck.url ? 'Loaded' : 'Missing'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium">Anon Key</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${envCheck.key ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                            {envCheck.key ? 'Loaded' : 'Missing'}
                        </span>
                    </div>
                </div>

                {/* Connection Status */}
                <div className={`p-4 rounded-lg flex items-center justify-center text-center min-h-[100px] transition-colors duration-300 ${status === 'loading' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                    status === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                    {status === 'loading' && (
                        <div className="flex flex-col items-center">
                            <svg className="animate-spin h-8 w-8 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Checking connection...</span>
                        </div>
                    )}
                    {status === 'success' && (
                        <div className="flex flex-col items-center">
                            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="font-semibold">{message}</span>
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="flex flex-col items-center">
                            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="font-semibold">Error Detected</span>
                            <span className="text-sm mt-1">{message}</span>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 underline underline-offset-4">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
