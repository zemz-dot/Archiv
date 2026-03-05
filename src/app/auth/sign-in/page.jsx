'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

export default function SignInPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);

        // Simulate authentication with a small delay
        await new Promise(r => setTimeout(r, 1200));

        // Check if this user already has stored data, otherwise create from email
        const existing = localStorage.getItem('archiv-user');
        let userData;
        if (existing) {
            const parsed = JSON.parse(existing);
            // If email matches stored user, reuse their data (including avatar)
            if (parsed.email === form.email) {
                userData = parsed;
            }
        }
        if (!userData) {
            const emailHandle = form.email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase();
            userData = {
                name: emailHandle.charAt(0).toUpperCase() + emailHandle.slice(1),
                handle: `@${emailHandle}`,
                email: form.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(emailHandle)}&background=E8115B&color=fff&bold=true&size=200`,
                followers: 0,
                following: 0,
            };
        }
        localStorage.setItem('archiv-user', JSON.stringify(userData));
        setLoading(false);
        router.push('/dashboard');
    };

    return (
        <main className="min-h-screen bg-off-white flex items-center justify-center p-6">
            {/* Background editorial image */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-10"
                    alt="bg"
                />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back link */}
                <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to ARCHIV
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-gray-100"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block text-2xl font-black tracking-tighter mb-8 hover:text-brilliant-rose transition-colors">ARCHIV</Link>
                        <h1 className="text-3xl font-serif font-black italic mb-2">Welcome back.</h1>
                        <p className="text-gray-500 text-sm font-medium">Sign in to access your wardrobe.</p>
                    </div>

                    {/* Error state */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 text-sm font-medium px-4 py-3 rounded-xl mb-6"
                        >
                            <AlertCircle size={16} /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                placeholder="sarah@archiv.co"
                                className="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
                                <Link href="/auth/reset-password" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-brilliant-rose transition-colors">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full h-14 px-5 pr-12 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brilliant-rose transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 disabled:opacity-60 mt-6"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing you in…
                                </>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Or continue with</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: 'Google', icon: 'G' },
                            { name: 'Apple', icon: '⌘' },
                        ].map(p => (
                            <button key={p.name} className="h-12 border border-gray-200 rounded-xl font-bold text-sm hover:border-black transition-all flex items-center justify-center gap-2">
                                <span className="font-black">{p.icon}</span> {p.name}
                            </button>
                        ))}
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-sm text-gray-500 font-medium mt-8">
                        No account?{' '}
                        <Link href="/auth/sign-up" className="font-black text-black hover:text-brilliant-rose transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-brilliant-rose">
                            Create one free
                        </Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
