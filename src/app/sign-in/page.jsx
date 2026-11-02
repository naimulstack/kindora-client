'use client';

import { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSignIn = async (e) => {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            ...formData,
        });

        if (error) {
            console.log(error);
            return;
        }

        if (data) {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-3xl p-8 sm:p-10 shadow-xl space-y-7">

                <div className="text-center space-y-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Kindora Community
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                        Sign In to Your Account
                    </h1>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1]">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-5">

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                            Email Address
                        </label>

                        <div className="relative">
                            <Mail className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] dark:focus:border-[#22C55E] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <Lock className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] dark:focus:border-[#22C55E] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                        Sign In
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#E2E8F0] dark:bg-[#334155]" />
                    <span className="text-xs text-[#64748B]">OR SIGN UP WITH</span>
                    <div className="h-px flex-1 bg-[#E2E8F0] dark:bg-[#334155]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#172B3A] dark:text-[#F1F5F9] hover:bg-slate-50 dark:hover:bg-[#111C2E] transition-all"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Google
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#172B3A] dark:text-[#F1F5F9] hover:bg-slate-50 dark:hover:bg-[#111C2E] transition-all"
                    >
                        <FaGithub className="w-5 h-5" />
                        GitHub
                    </button>
                </div>

                <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/sign-up"
                            className="text-[#16A34A] dark:text-[#22C55E] font-bold hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SignInPage;