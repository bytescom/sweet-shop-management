"use client";

import Link from "next/link";
import { Candy, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-black px-4 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Icon */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative p-5 bg-gradient-to-br from-primary to-yellow-600 rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.3)]">
          <Candy className="h-14 w-14 text-black" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-yellow-200 to-primary mb-4">
        Golden Sweets
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
        Experience the authentic taste of tradition. Premium Indian sweets crafted with love.
        <span className="block mt-2 text-gray-500">Join us to order your favorites or manage your inventory.</span>
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/dashboard"
          className="group px-8 py-4 bg-primary hover:bg-primary-hover text-black font-bold text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] flex items-center gap-2 justify-center"
        >
          View Dashboard
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/register"
          className="px-8 py-4 bg-transparent border-2 border-border hover:border-primary text-gray-300 hover:text-primary font-bold text-lg rounded-full transition-all hover:bg-primary/5"
        >
          Create Account
        </Link>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-primary/10 blur-3xl" />
    </div>
  );
}
