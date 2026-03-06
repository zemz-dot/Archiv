'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    Upload,
    Camera,
    CheckCircle2,
    X,
    ChevronLeft,
    Smartphone,
    Fingerprint,
    Lock,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

import { useSession } from "next-auth/react";

export default function VerificationPage() {
    const { data: session, update: updateSession } = useSession();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [step, setStep] = useState(1);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const s = localStorage.getItem('archiv-user');
        if (!s) {
            router.push('/auth/sign-in');
            return;
        }
        setUser(JSON.parse(s));
    }, [router]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const runBiometricScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setSelfie("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop");
            setIsScanning(false);
        }, 3000);
    };

    const handleUpload = async () => {
        if (!file || !selfie) return;

        setUploading(true);
        setError(null);

        // Simulate API call
        try {
            await new Promise(r => setTimeout(r, 2000));

            const updatedStatus = 'UNDER_REVIEW';
            const updatedUser = { ...user, verificationStatus: updatedStatus };
            localStorage.setItem('archiv-user', JSON.stringify(updatedUser));

            // Sync with Next-Auth session immediately
            await updateSession({ verificationStatus: updatedStatus });

            // Add to activity feed
            const userSlug = (updatedUser.handle || updatedUser.email || 'default').replace('@', '');
            const activityKey = `archiv-activities-${userSlug}`;
            const existingActivities = JSON.parse(localStorage.getItem(activityKey) || '[]');
            const successActivity = {
                id: Date.now(),
                type: 'verification',
                text: 'Documents Uploaded Successfully',
                time: 'Just now',
                icon: '⏳'
            };
            const messageActivity = {
                id: Date.now() + 1,
                type: 'message',
                text: 'Personal Note: "Thank you for providing your credentials. Our security team is now reviewing your documents. This typically takes 2-4 hours."',
                sender: 'ARCHIV Concierge',
                time: 'Just now',
                icon: '✉️'
            };
            localStorage.setItem(activityKey, JSON.stringify([successActivity, messageActivity, ...existingActivities]));

            setUser(updatedUser);
            setSuccess(true);
            setStep(5);
        } catch (err) {
            setError("Failed to verify ID. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    if (!user) return null;

    return (
        <main className="min-h-screen bg-[#F5F4EF] text-charcoal font-sans p-6 lg:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-12">
                    <Link href="/dashboard" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/40 hover:text-charcoal transition-colors group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                    </Link>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-sage">Security Protocol v4.0</div>
                </header>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left side: Instructions */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h1 className="text-5xl font-serif font-black italic tracking-tighter leading-none mb-6">Identity <br />Verification.</h1>
                            <p className="text-sm font-medium text-charcoal/60 leading-relaxed">To ensure the safety of our community and comply with financial regulations, we require all lenders to verify their identity before receiving payouts.</p>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: Smartphone, title: 'Valid Photo ID', desc: 'Passport, Driver\'s License or National ID card' },
                                { icon: Camera, title: 'Selfie Verification', desc: 'A quick facial scan to match your document' },
                                { icon: Lock, title: 'Secure Encryption', desc: 'Your data is encrypted and never stored on our servers' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-[2rem] bg-white border border-charcoal/5">
                                    <div className="w-10 h-10 rounded-xl bg-charcoal/5 flex items-center justify-center shrink-0">
                                        <item.icon size={18} className="text-charcoal/40" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-widest mb-1">{item.title}</div>
                                        <div className="text-[10px] text-charcoal/40 font-bold">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Verification Flow */}
                    <div className="lg:col-span-7">
                        <motion.div
                            layout
                            className="bg-white rounded-[3rem] shadow-2xl border border-charcoal/5 p-8 lg:p-12 relative overflow-hidden"
                        >
                            {/* Progress bar */}
                            <div className="flex gap-2 mb-12">
                                {[1, 2, 3, 4].map(s => (
                                    <div key={s} className="flex-1 h-1.5 rounded-full bg-charcoal/5 relative overflow-hidden">
                                        <motion.div
                                            initial={false}
                                            animate={{ x: step >= s ? '0%' : '-100%' }}
                                            className="absolute inset-0 bg-brilliant-rose"
                                        />
                                    </div>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <div className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6">
                                                <Fingerprint size={32} className="text-sage" />
                                            </div>
                                            <h2 className="text-2xl font-serif italic mb-2">Select Document Type</h2>
                                            <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">Choose the ID you want to provide</p>
                                        </div>

                                        <div className="space-y-3">
                                            {['Passport', 'Driver\'s License', 'National ID'].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setStep(2)}
                                                    className="w-full h-16 rounded-2xl border border-charcoal/5 hover:border-brilliant-rose hover:bg-brilliant-rose/[0.02] flex items-center justify-between px-6 transition-all group"
                                                >
                                                    <span className="text-sm font-black uppercase tracking-widest">{type}</span>
                                                    <ArrowRight size={16} className="text-charcoal/20 group-hover:text-brilliant-rose group-hover:translate-x-1 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                                                <Upload size={32} className="text-amber-600" />
                                            </div>
                                            <h2 className="text-2xl font-serif italic mb-2">Upload Document</h2>
                                            <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">Front of your photo ID</p>
                                        </div>

                                        <div className="relative group">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className={cn(
                                                "aspect-[1.6/1] border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center p-8 transition-all duration-500",
                                                preview ? "border-sage bg-sage/5" : "border-charcoal/10 bg-charcoal/[0.02] group-hover:border-brilliant-rose group-hover:bg-brilliant-rose/[0.02]"
                                            )}>
                                                {preview ? (
                                                    <img src={preview} alt="ID Preview" className="w-full h-full object-cover rounded-xl" />
                                                ) : (
                                                    <>
                                                        <Camera size={32} className="text-charcoal/20 mb-4" />
                                                        <div className="text-xs font-black uppercase tracking-widest text-charcoal/40">Drop image here or click to browse</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={() => setStep(1)} className="h-16 flex-1 rounded-full border border-charcoal/10 font-black text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all">Back</button>
                                            <button
                                                onClick={() => setStep(3)}
                                                disabled={!file}
                                                className="h-16 flex-[2] rounded-full bg-charcoal text-white font-black text-[10px] uppercase tracking-widest hover:bg-brilliant-rose disabled:opacity-20 transition-all"
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                                                <Camera size={32} className="text-blue-600" />
                                            </div>
                                            <h2 className="text-2xl font-serif italic mb-2">Biometric Scan</h2>
                                            <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">Position your face in the circle</p>
                                        </div>

                                        <div className="relative flex justify-center py-4">
                                            <div className="w-64 h-64 rounded-full border-4 border-charcoal/5 relative overflow-hidden bg-charcoal/5">
                                                {selfie ? (
                                                    <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={selfie} className="w-full h-full object-cover" alt="Selfie" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Camera size={48} className="text-charcoal/10" />
                                                    </div>
                                                )}

                                                {isScanning && (
                                                    <motion.div
                                                        initial={{ top: '-10%' }}
                                                        animate={{ top: '110%' }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                        className="absolute left-0 right-0 h-1 bg-sage shadow-[0_0_15px_rgba(74,222,128,0.8)] z-20"
                                                    />
                                                )}
                                            </div>

                                            {/* Corner indicators */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="w-[280px] h-[280px] border-2 border-charcoal/5 rounded-[3rem] dashed" />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={() => setStep(2)} className="h-16 flex-1 rounded-full border border-charcoal/10 font-black text-[10px] uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all">Back</button>
                                            {selfie ? (
                                                <button onClick={() => setStep(4)} className="h-16 flex-[2] rounded-full bg-charcoal text-white font-black text-[10px] uppercase tracking-widest hover:bg-brilliant-rose transition-all">Continue</button>
                                            ) : (
                                                <button
                                                    onClick={runBiometricScan}
                                                    disabled={isScanning}
                                                    className="h-16 flex-[2] rounded-full bg-charcoal text-white font-black text-[10px] uppercase tracking-widest hover:bg-brilliant-rose transition-all disabled:opacity-50"
                                                >
                                                    {isScanning ? 'Scanning...' : 'Start Face Scan'}
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center">
                                            <div className="w-20 h-20 rounded-full bg-brilliant-rose/10 flex items-center justify-center mx-auto mb-6">
                                                <ShieldCheck size={32} className="text-brilliant-rose" />
                                            </div>
                                            <h2 className="text-2xl font-serif italic mb-2">Final Review</h2>
                                            <p className="text-xs font-bold text-charcoal/30 uppercase tracking-widest">Decrypting and matching visual data</p>
                                        </div>

                                        <div className="p-6 bg-charcoal/[0.02] rounded-3xl space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-charcoal/5">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">ID Document</span>
                                                <span className="text-[10px] font-black text-sage uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={12} /> Received</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-charcoal/5">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">Biometric Scan</span>
                                                <span className="text-[10px] font-black text-sage uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={12} /> Received</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/30">Security Level</span>
                                                <span className="text-xs font-bold text-sage">Ultra-Secure v4.1</span>
                                            </div>
                                        </div>

                                        {error && <div className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{error}</div>}

                                        <button
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            className="w-full h-16 rounded-full bg-charcoal text-white font-black text-[10px] uppercase tracking-widest hover:bg-brilliant-rose shadow-xl shadow-brilliant-rose/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        >
                                            {uploading ? (
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>Confirm & Verify <CheckCircle2 size={16} /></>
                                            )}
                                        </button>
                                    </motion.div>
                                )}

                                {step === 5 && (
                                    <motion.div
                                        key="step5"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-500/40">
                                            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                                        </div>
                                        <h2 className="text-4xl font-serif font-black italic mb-4">Under <br />Review.</h2>
                                        <p className="text-sm font-medium text-charcoal/40 mb-12 max-w-xs mx-auto">Your identity documents have been submitted. Our security team will authenticate your profile within the next 2-4 hours.</p>

                                        <button
                                            onClick={() => router.push('/dashboard')}
                                            className="h-16 px-12 rounded-full bg-charcoal text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-brilliant-rose transition-all inline-flex items-center gap-4 group"
                                        >
                                            Return to Dashboard
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="mt-8 text-center">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-charcoal/20">
                                Protected by ARCHIV Security Infrastructure. <br />
                                All data processed in according with the GDPR Protocol v3.2
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
