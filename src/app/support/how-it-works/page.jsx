'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Smartphone, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function HowItWorks() {
    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <nav className="fixed top-0 w-full bg-cream/80 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center px-6 lg:px-12 z-50 transition-all duration-500">
                <Link href="/" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back to Archive</span>
                </Link>
                <div className="mx-auto font-bold tracking-tighter text-2xl">ARCHIV</div>
                <div className="w-20 hidden sm:block" />
            </nav>

            <div className="pt-40 pb-32 px-6 lg:px-12 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-3 mb-10 py-2 px-5 rounded-full border border-charcoal/5 bg-white/40 backdrop-blur-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brilliant-rose animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Platform Guide</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter mb-16">
                        How It <br />
                        <span className="italic text-charcoal/20">Works.</span>
                    </h1>
                </motion.div>

                <div className="space-y-32 mt-24">
                    {[
                        {
                            num: '01',
                            title: 'Discover',
                            desc: 'Browse thousands of designer items shared by our community. Use our advanced filters to find the exact piece for your occasion.',
                            icon: <Search size={32} className="text-brilliant-rose/40" />
                        },
                        {
                            num: '02',
                            title: 'Rent & Wear',
                            desc: 'Request dates seamlessly via the App or Web. Payments are held securely in escrow until the item safely arrives. Wear it and make it yours for the night.',
                            icon: <Smartphone size={32} className="text-sage/40" />
                        },
                        {
                            num: '03',
                            title: 'Rotate',
                            desc: 'Return it using our zero-waste compostable mailers. Rate your experience and rent again. Your wardrobe just became infinite.',
                            icon: <Globe size={32} className="text-charcoal/20" />
                        }
                    ].map((step, idx) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 * idx, ease: [0.16, 1, 0.3, 1] }}
                            className="group grid md:grid-cols-12 gap-12 items-start"
                        >
                            <div className="md:col-span-4 lg:col-span-3 flex flex-col justify-between h-full">
                                <div className="text-9xl font-serif text-charcoal/[0.04] leading-none select-none group-hover:text-charcoal/10 transition-colors duration-1000 font-black italic">
                                    {step.num}
                                </div>
                                <div className="mt-8">
                                    {step.icon}
                                </div>
                            </div>
                            <div className="md:col-span-8 lg:col-span-9 pt-4">
                                <h3 className="text-3xl font-serif italic mb-6 text-charcoal group-hover:text-brilliant-rose transition-colors duration-700">{step.title}</h3>
                                <p className="text-xl text-gray-400 leading-relaxed font-medium max-w-2xl">
                                    {step.desc}
                                </p>
                                <div className="mt-12 w-0 h-[2px] bg-charcoal/5 group-hover:w-full transition-all duration-1000 origin-left" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to action touch */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-48 text-center"
                >
                    <Link href="/collections/all" className="inline-block px-12 py-5 bg-charcoal text-cream rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-brilliant-rose transition-all duration-500 shadow-xl shadow-black/10">
                        Explore the Archive
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
