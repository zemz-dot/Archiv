'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactUs() {
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

            <div className="pt-40 pb-32 px-6 lg:px-12 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-3 mb-10 py-2 px-5 rounded-full border border-charcoal/5 bg-white/40 backdrop-blur-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Concierge Desk</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter mb-8">
                        The Archive <br />
                        <span className="italic text-charcoal/20">Dialogue.</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
                        Need assistance with a booking, have an archival inquiry, or simply want to say hello? Our team is curated to assist you.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-12 bg-white/40 backdrop-blur-md border border-white p-8 lg:p-16 rounded-[3rem] shadow-xl shadow-black/[0.02]"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/40 ml-1">First Identity</label>
                            <input type="text" placeholder="e.g. Alexander" className="w-full bg-transparent border-b border-charcoal/10 py-4 text-lg font-serif italic focus:outline-none focus:border-brilliant-rose transition-all placeholder:text-gray-200" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/40 ml-1">Last Identity</label>
                            <input type="text" placeholder="e.g. McQueen" className="w-full bg-transparent border-b border-charcoal/10 py-4 text-lg font-serif italic focus:outline-none focus:border-brilliant-rose transition-all placeholder:text-gray-200" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/40 ml-1">Digital Address</label>
                        <input type="email" placeholder="you@archive.com" className="w-full bg-transparent border-b border-charcoal/10 py-4 text-lg font-serif italic focus:outline-none focus:border-brilliant-rose transition-all placeholder:text-gray-200" />
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/40 ml-1">The Message</label>
                        <textarea rows={4} placeholder="What can we help you solve today?" className="w-full bg-transparent border-b border-charcoal/10 py-4 text-lg font-serif italic focus:outline-none focus:border-brilliant-rose transition-all placeholder:text-gray-200 resize-none" />
                    </div>

                    <button className="group w-full h-20 bg-charcoal text-cream font-black text-xs uppercase tracking-[0.4em] rounded-full hover:bg-brilliant-rose transition-all duration-700 flex items-center justify-center gap-4 shadow-xl shadow-black/10 mt-8">
                        Dispatch Message
                        <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </button>
                </motion.form>

                <div className="mt-32 grid md:grid-cols-3 gap-12 text-center border-t border-charcoal/5 pt-32">
                    {[
                        { label: 'General Help', val: 'concierge@archiv.com' },
                        { label: 'Press & Media', val: 'archive@archiv.com' },
                        { label: 'Global Offices', val: 'Paris / London / NYC' }
                    ].map((info) => (
                        <div key={info.label} className="space-y-4">
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">{info.label}</div>
                            <div className="text-lg font-serif italic text-charcoal">{info.val}</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
