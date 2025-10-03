'use client';
import { signIn, getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            if (session) {
                router.push('/dashboard');
            }
        });
    }, [router]);

    const handleSlackLogin = async () => {
        try {
            const result = await signIn("slack", { 
                callbackUrl: '/dashboard',
                redirect: false 
            });
            
            if (result?.url) {
                router.push(result.url);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#ede9fe]">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                        Welcome to Musical YSWS
                    </h2>
                    <p className="mt-3 text-lg text-gray-600">
                        Sign in to start your music development journey
                    </p>
                </div>

                <button 
                    onClick={handleSlackLogin}
                    type="button"
                    className="w-full px-6 py-4 bg-[#4A154B] hover:bg-[#3A1139] text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A154B] focus:ring-offset-2 transition-all duration-200 shadow-lg mb-4"
                >
                    <div className="flex items-center justify-center">
                        <span className="text-2xl mr-3">💬</span>
                        <span className="text-lg">Continue with Slack</span>
                    </div>
                </button>
            </div>
        </div>
    );
}