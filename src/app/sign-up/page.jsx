'use client';

import { useState } from 'react';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { data, error: authError } = await authClient.signUp.email({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            image: formData.image?.trim() || undefined,
        });

        if (authError) {
            setError(authError.message || 'Registration failed. Please check your details.');
            toast.error(authError.message || 'Registration failed');
            setLoading(false);
            return;
        }

        if (data) {
            toast.success('Account created successfully!');
            router.push("/");
            router.refresh();
        }
        setLoading(false);


    };

    const googleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    const githubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github"
        })
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-12 px-4 flex items-center justify-center">
            <div className="max-w-md w-full bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-3xl p-8 sm:p-10 shadow-xl space-y-7">

                <div className="text-center space-y-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#F0FDF4] dark:bg-emerald-950/60 text-[#16A34A] dark:text-[#22C55E] text-xs font-bold px-3.5 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Kindora Community
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B3A] dark:text-[#F1F5F9] tracking-tight">
                        Create an Account
                    </h1>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#CBD5E1]">
                        Join hands to create impactful community charity drives.
                    </p>
                </div>

                {error && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                            Full Name
                        </label>

                        <div className="relative">
                            <User className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] dark:focus:border-[#22C55E] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Profile Picture Link */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#172B3A] dark:text-[#F1F5F9] mb-2">
                            Profile Picture Link
                        </label>

                        <div className="relative">
                            <ImageIcon className="w-4 h-4 text-[#64748B] absolute left-4 top-3.5" />

                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/profile.jpg"
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-[#111C2E] border border-[#E2E8F0] dark:border-[#334155] focus:border-[#16A34A] dark:focus:border-[#22C55E] rounded-xl text-sm text-[#172B3A] dark:text-[#F1F5F9] focus:outline-none"
                            />
                        </div>

                        {formData.image && (
                            <div className="mt-2.5 flex items-center gap-3 p-2 bg-slate-50 dark:bg-[#111C2E] rounded-xl border border-dashed border-[#E2E8F0] dark:border-[#334155]">
                                <img
                                    src={formData.image}
                                    alt="Profile Preview"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#16A34A] shrink-0"
                                />
                                <span className="text-xs text-[#64748B] dark:text-[#CBD5E1] truncate">
                                    Profile picture preview
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Email Address */}
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

                    {/* Password */}
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
                        disabled={loading}
                        className="w-full bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                        {!loading && <ArrowRight className="w-4 h-4" />}
                    </button>
                </form>

                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#E2E8F0] dark:bg-[#334155]" />
                    <span className="text-xs text-[#64748B]">OR SIGN UP WITH</span>
                    <div className="h-px flex-1 bg-[#E2E8F0] dark:bg-[#334155]" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={googleSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#172B3A] dark:text-[#F1F5F9] hover:bg-slate-50 dark:hover:bg-[#111C2E] transition-all cursor-pointer"
                    >
                        <FcGoogle className="w-5 h-5" />
                        Google
                    </button>

                    <button
                        onClick={githubSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#334155] text-sm font-semibold text-[#172B3A] dark:text-[#F1F5F9] hover:bg-slate-50 dark:hover:bg-[#111C2E] transition-all cursor-pointer"
                    >
                        <FaGithub className="w-5 h-5" />
                        GitHub
                    </button>
                </div>

                <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-[#64748B] dark:text-[#CBD5E1]">
                        Already have an account?{' '}
                        <Link
                            href="/sign-in"
                            className="text-[#16A34A] dark:text-[#22C55E] font-bold hover:underline"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SignUpPage;
