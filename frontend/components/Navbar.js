"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Candy } from "lucide-react";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="border-b border-border bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-gradient-to-br from-primary to-yellow-600 rounded-lg group-hover:scale-110 transition-transform">
                            <Candy className="h-6 w-6 text-black" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200">
                            Golden Sweets
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary border border-border">
                                    <User className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-gray-300">
                                        {user.name}
                                        {user.role === 'admin' && <span className="ml-2 text-xs bg-primary text-black px-1.5 py-0.5 rounded font-bold">ADMIN</span>}
                                    </span>
                                </div>

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-primary transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-300 hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-primary hover:bg-primary-hover text-black text-sm font-bold rounded-full transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
