'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle2, Camera, User } from 'lucide-react';

export default function SignUpPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1 = account, 2 = profile
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '',
        password: '', confirmPassword: '', handle: '', agree: false
    });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB'); return; }
        const reader = new FileReader();
        reader.onload = (ev) => setAvatarPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const perks = [
        'Rent from 120,000+ designer pieces',
        'Earn money from your own wardrobe',
        'Zero-waste fashion community',
        'Free shipping on first rental',
    ];

    const validateStep1 = () => {
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            setError('Please fill in all fields.'); return false;
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.'); return false;
        }
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.'); return false;
        }
        return true;
    };

    const handleNext = (e) => {
        e.preventDefault();
        setError('');
        if (validateStep1()) setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!form.handle) { setError('Please choose a handle.'); return; }
        if (!form.agree) { setError('Please accept the terms to continue.'); return; }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));

        const newUser = {
            name: `${form.firstName} ${form.lastName}`,
            handle: `@${form.handle}`,
            email: form.email,
            avatar: avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.firstName + '+' + form.lastName)}&background=E8115B&color=fff&bold=true&size=200`,
            followers: 0,
            following: 0,
        };
        localStorage.setItem('archiv-user', JSON.stringify(newUser));
        setLoading(false);
        router.push('/dashboard');
    };

    return (
        <main className="min-h-screen bg-off-white flex">
            {/* Left editorial panel — hidden on mobile */}
            <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12 bg-black">
                <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                    alt="Fashion"
                />
                <div className="relative z-10">
                    <Link href="/" className="text-2xl font-black tracking-tighter text-white hover:text-brilliant-rose transition-colors">ARCHIV</Link>
                </div>
                <div className="relative z-10 max-w-xs">
                    <h2 className="text-4xl font-serif italic text-white leading-tight mb-8">
                        Join 200,000+ members sharing the world&apos;s finest wardrobes.
                    </h2>
                    <div className="space-y-4">
                        {perks.map(p => (
                            <div key={p} className="flex items-center gap-3">
                                <CheckCircle2 size={16} className="text-brilliant-rose flex-shrink-0" />
                                <span className="text-white/70 text-sm font-medium">{p}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 text-white/30 text-xs font-medium">© 2026 Archiv Community Ltd.</div>
            </div>

            {/* Right form panel */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
                <div className="w-full max-w-md">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black transition-colors mb-8 group lg:hidden">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
                    </Link>

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Progress */}
                        <div className="flex items-center gap-2 mb-8">
                            {[1, 2].map(s => (
                                <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-black' : 'bg-gray-100'}`} />
                            ))}
                        </div>

                        <h1 className="text-3xl font-serif font-black italic mb-1">
                            {step === 1 ? 'Create your account.' : 'Build your profile.'}
                        </h1>
                        <p className="text-gray-500 text-sm font-medium mb-8">
                            {step === 1 ? 'Step 1 of 2 — Basic info' : 'Step 2 of 2 — Your lender identity'}
                        </p>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 text-sm font-medium px-4 py-3 rounded-xl mb-6"
                            >
                                <AlertCircle size={16} /> {error}
                            </motion.div>
                        )}

                        {step === 1 ? (
                            <form onSubmit={handleNext} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'First Name', key: 'firstName', placeholder: 'Sarah' },
                                        { label: 'Last Name', key: 'lastName', placeholder: 'M.' },
                                    ].map(f => (
                                        <div key={f.key} className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">{f.label}</label>
                                            <input
                                                type="text"
                                                value={form[f.key]}
                                                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                                                placeholder={f.placeholder}
                                                className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        placeholder="sarah@archiv.co"
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPass ? 'text' : 'password'}
                                            value={form.password}
                                            onChange={e => setForm({ ...form, password: e.target.value })}
                                            placeholder="Min. 8 characters"
                                            className="w-full h-12 px-4 pr-12 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                        />
                                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                        placeholder="••••••••"
                                        className="w-full h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                    />
                                </div>

                                <button type="submit" className="w-full h-14 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brilliant-rose transition-all shadow-xl shadow-black/5 mt-4">
                                    Continue →
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Avatar upload */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Profile Picture</label>
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-brilliant-rose hover:bg-pink-50 transition-all group overflow-hidden flex-shrink-0 relative"
                                        >
                                            {avatarPreview ? (
                                                <img src={avatarPreview} className="w-full h-full object-cover" alt="avatar" />
                                            ) : (
                                                <User size={24} className="text-gray-300 group-hover:text-brilliant-rose transition-colors" />
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                                                <Camera size={16} className="text-white" />
                                            </div>
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                                        <div>
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-black text-black hover:text-brilliant-rose transition-colors">
                                                {avatarPreview ? 'Change photo' : 'Upload photo'}
                                            </button>
                                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">JPG, PNG or WEBP. Max 5MB.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Your Handle</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                                        <input
                                            type="text"
                                            value={form.handle}
                                            onChange={e => setForm({ ...form, handle: e.target.value.replace(/[^a-z0-9_]/gi, '').toLowerCase() })}
                                            placeholder="sarahstyle"
                                            className="w-full h-12 pl-8 pr-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-medium">This will be your public lender URL: archiv.co/lender/@handle</p>
                                </div>

                                <div className="bg-off-white rounded-xl p-5 border border-gray-100">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Your Profile Preview</div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} className="w-full h-full object-cover" alt="avatar" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-brilliant-rose to-pink-400 flex items-center justify-center text-white font-black text-lg">
                                                    {(form.firstName?.[0] || '').toUpperCase()}{(form.lastName?.[0] || '').toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{form.firstName || 'Your'} {form.lastName || 'Name'}</div>
                                            <div className="text-brilliant-rose text-xs font-black">@{form.handle || 'yourhandle'}</div>
                                        </div>
                                    </div>
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div
                                        onClick={() => setForm({ ...form, agree: !form.agree })}
                                        className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 border-2 flex items-center justify-center transition-all ${form.agree ? 'bg-black border-black' : 'border-gray-200 group-hover:border-black'}`}
                                    >
                                        {form.agree && <CheckCircle2 size={12} className="text-white" />}
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium leading-relaxed">
                                        I agree to ARCHIV&apos;s{' '}
                                        <Link href="/support/terms-of-service" className="underline text-black font-bold">Terms of Service</Link>{' '}
                                        and{' '}
                                        <Link href="/support/privacy-policy" className="underline text-black font-bold">Privacy Policy</Link>.
                                    </span>
                                </label>

                                <div className="flex gap-3 mt-4">
                                    <button type="button" onClick={() => setStep(1)} className="flex-1 h-14 border-2 border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest hover:border-black transition-all">
                                        ← Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-[2] h-14 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brilliant-rose transition-all shadow-xl shadow-black/5 flex items-center justify-center gap-3 disabled:opacity-60"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Creating account…
                                            </>
                                        ) : 'Join ARCHIV'}
                                    </button>
                                </div>
                            </form>
                        )}

                        <p className="text-center text-sm text-gray-500 font-medium mt-8">
                            Already have an account?{' '}
                            <Link href="/auth/sign-in" className="font-black text-black hover:text-brilliant-rose transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-brilliant-rose">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
