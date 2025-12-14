"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await login(email, password);
        if (!result.success) {
            setError(result.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-gradient-to-b from-black via-primary/[0.02] to-black">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-border shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-yellow-200 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400">Sign in to continue your sweet journey</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black border border-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-black border border-border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-black font-bold rounded-xl transition-all shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link href="/register" className="font-semibold text-primary hover:text-primary-hover hover:underline transition-colors">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
