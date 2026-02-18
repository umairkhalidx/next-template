'use client';

import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { login, signup } from '@/app/auth/actions';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
    const [tab, setTab] = useState(defaultTab);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTab(defaultTab);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            setError('');
        } else {
            document.body.style.overflow = 'unset';
            // Reset form state on close if desired, or keep it.
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, defaultTab]);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        // Ensure manual state is sync'd if needed, but the inputs have names, so formData is enough.

        try {
            const action = tab === 'login' ? login : signup;
            const res = await action({ message: '' }, formData);

            if (res?.error) {
                setError(res.error);
                setIsLoading(false);
            } else if (res?.message) {
                // Determine if it's a success message or error message
                // The signup action returns { message: 'Check your email...' } on success
                // The login action redirects on success (throws NEXT_REDIRECT)

                // If we get here for signup, it might be the "Check email" success
                if (tab === 'signup') {
                    // Ideally show a success state or close modal
                    // For now, let's just close or show the message
                    // But since it's an "error" state visually in the UI below, we might want a success UI.
                    // The current UI only has an error box.
                    // Let's treat it as an error for visibility or add a success box.
                    // Simple fix: Close modal and let them check email? Or Alert?
                    alert(res.message);
                    onClose();
                } else {
                    setError(res.message);
                }
                setIsLoading(false);
            } else {
                // Login redirect usually throws, so we might not reach here unless no error and no message?
                // If we do, it means success but no redirect happened?
                setIsLoading(false);
                onClose();
            }
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            // Check for Next.js redirect
            if (err.message === 'NEXT_REDIRECT' || (err.digest && err.digest.startsWith('NEXT_REDIRECT'))) {
                // Redirecting...
                onClose();
                return;
            }
            console.error(err);
            setError('An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    const socialProviders = [
        {
            id: 'google',
            name: 'Google',
            color: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 dark:border-gray-700',
            icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
            )
        },
        {
            id: 'facebook',
            name: 'Facebook',
            color: 'bg-[#1877F2] hover:bg-[#166FE5] text-white border-transparent',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            id: 'linkedin',
            name: 'LinkedIn',
            color: 'bg-[#0A66C2] hover:bg-[#004182] text-white border-transparent',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            id: 'twitter',
            name: 'X',
            color: 'bg-black hover:bg-gray-900 text-white border-transparent dark:bg-white dark:hover:bg-gray-100 dark:text-black',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop with blur and dark overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container - Split Layout */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl bg-gray-50 dark:bg-[#1C1C1E] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-5 h-auto md:h-[665px]"
                    >
                        {/* Close Button (Mobile Only) */}
                        <button
                            onClick={onClose}
                            className="md:hidden absolute top-4 right-4 z-10 text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            aria-label="Close modal"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        {/* Left Brand Panel (Desktop) */}
                        <div className="hidden md:flex md:col-span-2 bg-gradient-to-br from-[#059669] to-[#047857] p-10 flex-col text-white relative overflow-hidden">
                            {/* Decorative Circles */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

                            <div className="relative z-10 flex-none">
                                <div className="flex items-center gap-3">
                                    <div className="bg-white/20 backdrop-blur-sm w-12 h-12 flex items-center justify-center rounded-xl">
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-3xl font-extrabold tracking-tight">NEXTAPP</h1>
                                </div>
                            </div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center space-y-6">
                                <motion.div
                                    key={tab}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-3xl font-bold leading-tight mb-4">
                                        {tab === 'login' ? 'Welcome back to your workspace.' : 'Start your journey with us.'}
                                    </h2>
                                    <p className="text-emerald-50/90 text-sm leading-relaxed">
                                        {tab === 'login'
                                            ? 'Access your projects, manage your work, and collaborate with your team all in one place.'
                                            : 'Join thousands of users using NextApp to streamline their workflow and grow faster.'}
                                    </p>
                                </motion.div>
                            </div>
                        </div>

                        {/* Right Form Panel */}
                        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto">
                            <div className="max-w-sm mx-auto w-full">
                                {/* Auth Toggle Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {tab === 'login' ? 'Sign In' : 'Create Account'}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {tab === 'login' ? 'Enter your details to proceed' : 'Get started for free today'}
                                        </p>
                                    </div>
                                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                                        <button
                                            onClick={() => setTab('login')}
                                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'login' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => setTab('signup')}
                                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${tab === 'signup' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>

                                <form onSubmit={onFormSubmit} className="space-y-5">
                                    {error && (
                                        <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {error}
                                        </div>
                                    )}

                                    <AnimatePresence mode="wait">
                                        {tab === 'signup' && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-1.5 overflow-hidden"
                                            >
                                                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                    FULL NAME
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-transparent focus:border-[#059669] dark:focus:border-[#10b981] focus:bg-white dark:focus:bg-gray-900 transition-all outline-none focus:ring-0 font-medium text-gray-900 dark:text-white"
                                                    placeholder="John Doe"
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                            EMAIL
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-transparent focus:border-[#059669] dark:focus:border-[#10b981] focus:bg-white dark:focus:bg-gray-900 transition-all outline-none focus:ring-0 font-medium text-gray-900 dark:text-white"
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between">
                                            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                PASSWORD
                                            </label>
                                            {tab === 'login' && (
                                                <button
                                                    type="button"
                                                    className="text-xs text-[#059669] dark:text-[#10b981] hover:underline font-medium"
                                                >
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-transparent focus:border-[#059669] dark:focus:border-[#10b981] focus:bg-white dark:focus:bg-gray-900 transition-all outline-none focus:ring-0 font-medium text-gray-900 dark:text-white"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {tab === 'login' ? 'Sign In' : 'Create Account'}
                                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
                                    <div className="relative flex justify-center text-xs"><span className="bg-gray-50 dark:bg-[#1C1C1E] px-2 text-gray-400 uppercase">Or continue with</span></div>
                                </div>

                                <div className="grid grid-cols-4 gap-3">
                                    {socialProviders.map(p => (
                                        <button
                                            key={p.id}
                                            type="button"
                                            className={`h-12 flex items-center justify-center rounded-xl border transition-all hover:scale-105 active:scale-95 ${p.color}`}
                                            aria-label={`Sign in with ${p.name}`}
                                        >
                                            {p.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Close Button Desktop */}
                        <button
                            onClick={onClose}
                            className="hidden md:block absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="Close modal"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
