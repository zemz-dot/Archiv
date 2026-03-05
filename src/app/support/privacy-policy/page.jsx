'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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

            <div className="pt-40 pb-32 px-6 lg:px-12 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-3 mb-10 py-2 px-5 rounded-full border border-charcoal/5 bg-white/40 backdrop-blur-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brilliant-rose animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Legal Affairs</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter mb-16">
                        Privacy <br />
                        <span className="italic text-charcoal/20">Protocol.</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="space-y-16 text-gray-500 font-medium leading-[1.8]"
                >
                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">01</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">Introduction</h2>
                        </div>
                        <p className="pl-12 border-l border-charcoal/5">
                            Welcome to ARCHIV. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">02</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">The Data We Collect</h2>
                        </div>
                        <div className="pl-12 border-l border-charcoal/5 space-y-6">
                            <p>
                                Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { label: 'Identity', desc: 'First name, last name, username or similar identifier.' },
                                    { label: 'Contact', desc: 'Billing address, delivery address, email address and telephone numbers.' },
                                    { label: 'Financial', desc: 'Secure payment processing tokens handled via Stripe.' },
                                    { label: 'Transaction', desc: 'Historical rental data and peer-to-peer engagement.' }
                                ].map(item => (
                                    <li key={item.label} className="flex gap-4">
                                        <span className="font-black text-[10px] uppercase tracking-widest text-charcoal pt-1.5 shrink-0">{item.label}</span>
                                        <span className="text-sm">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">03</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">Archival Usage</h2>
                        </div>
                        <p className="pl-12 border-l border-charcoal/5">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform contracts, facilitate peer-to-peer rentals, and comply with sovereign legal obligations.
                        </p>
                    </section>

                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">04</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">Security Architecture</h2>
                        </div>
                        <p className="pl-12 border-l border-charcoal/5">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. Access is limited to necessary archival staff and security protocols.
                        </p>
                    </section>

                    <footer className="pt-24 border-t border-charcoal/5 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">Last Updated: March 2026</p>
                        <p className="mt-4 text-sm font-serif italic">Questions regarding protocol? Contact <a href="mailto:privacy@archiv.com" className="text-charcoal underline underline-offset-4 decoration-brilliant-rose/30">privacy@archiv.com</a></p>
                    </footer>
                </motion.div>
            </div>
        </main>
    );
}
