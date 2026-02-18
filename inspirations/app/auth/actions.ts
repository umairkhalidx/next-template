'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export interface AuthResponse {
    error?: string;
    message?: string;
}

export async function login(prevState: AuthResponse, formData: FormData): Promise<AuthResponse> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Basic Input Validation
    if (!email || !password) {
        return { error: 'Email and password are required.' };
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            // Customize Supabase error messages if needed, or return as is
            console.error('Login Error:', error.message);
            return { error: error.message };
        }

    } catch (error) {
        console.error('Unexpected Login Error:', error);
        return { error: 'An unexpected error occurred. Please try again later.' };
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard');
}

export async function signup(prevState: AuthResponse, formData: FormData): Promise<AuthResponse> {
    const supabase = await createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    // Basic Input Validation
    if (!email || !password) {
        return { error: 'Email and password are required.' };
    }
    if (password.length < 6) {
        return { error: 'Password must be at least 6 characters long.' };
    }

    try {
        // 1. Try to Log In first (Auto-Login Feature)
        // If the user exists and password matches, this will succeed.
        const { data: signInData } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInData.session) {
            revalidatePath('/', 'layout');
            redirect('/dashboard');
        }

        // 2. If Login failed (User doesn't exist OR Wrong Password), proceed with Signup
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            console.error('Signup Error:', error.message);
            return { error: error.message };
        }

        // Check if session exists (auto-confirmed)
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            redirect('/dashboard');
        }

    } catch (error) {
        // Redirect throws an error in Next.js, so we need to re-throw it if it's a redirect
        if ((error as any).digest?.startsWith('NEXT_REDIRECT') || (error as any).message === 'NEXT_REDIRECT') { // eslint-disable-line @typescript-eslint/no-explicit-any
            throw error;
        }

        console.error('Unexpected Signup Error:', error);
        return { error: 'An unexpected error occurred during signup. Please try again.' };
    }

    return { message: 'Check your email to verify your account.' };
}
