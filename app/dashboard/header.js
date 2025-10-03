'use client';

import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    const handleSignOut = () => {
        signOut({ 
            callbackUrl: '/',
            redirect: true 
        });
    };

    return (
        <header className="w-full p-4 sm:p-5 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r flex items-center justify-center">
                        <span className="text-white font-bold">🎵</span>
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-gray-700">
                        Musical Dashboard
                    </h1>
                </div>

                <div className="flex items-center space-x-6">
                    <nav className="flex space-x-6">
                        <a 
                            href="/dashboard" 
                            className="text-gray-600 hover:text-purple-500 transition-colors duration-200 font-medium"
                        >
                            Dashboard
                        </a>
                        <a 
                            href="/dashboard/projects" 
                            className="text-gray-600 hover:text-purple-500 transition-colors duration-200 font-medium"
                        >
                            My Projects
                        </a>
                        <a 
                            href="/dashboard/rewards" 
                            className="text-gray-600 hover:text-purple-500 transition-colors duration-200 font-medium"
                        >
                            Rewards
                        </a>
                        <a 
                            href="/dashboard/settings" 
                            className="text-gray-600 hover:text-purple-500 transition-colors duration-200 font-medium"
                        >
                            Settings
                        </a>
                    </nav>

                    {session?.user && (
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-2">
                                <img 
                                    src={session.user.image || '/default-avatar.png'} 
                                    alt={session.user.name}
                                    className="w-6 h-6 rounded-full border border-gray-200"
                                />
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {session.user.name}
                                </span>
                            </div>
                            
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}