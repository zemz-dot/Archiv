'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Ear, ToggleLeft, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Accessibility() {
    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <nav className="fixed top-0 w-full bg-cream/80 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center px-6 lg:px-12 z-50 transition-all duration-500">
                <Link href="/" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back to Archive</span>
                </Link>
                <div className="mx-auto font-bold tracking-tighter text-2xl text-center">ARCHIV</div>
                <div className="w-20 hidden sm:block" />
            </nav>

            <div className="pt-40 pb-32 px-6 lg:px-12 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-3 mb-10 py-2 px-5 rounded-full border border-charcoal/5 bg-white/40 backdrop-blur-md shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brilliant-rose animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Universal Access</span>
                    </div>

                    <h1 className="text-6xl lg:text-9xl font-serif leading-[0.85] tracking-tighter mb-8">
                        Inclusion <br />
                        <span className="italic text-charcoal/20">Protocol.</span>
                    </h1>
                    <p className="text-gray-400 font-serif italic text-xl">Fashion is for every identity. We ensure digital equity.</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-24">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">Commitment</h2>
                            <p className="text-2xl font-serif italic text-charcoal leading-relaxed">
                                ARCHIV is dedicated to providing a high-fidelity experience that is accessible to the widest possible audience, regardless of ability or technology. We believe our digital archive should be as open as our communal wardrobe.
                            </p>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">Technical Standard</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: 'Visual Fidelity',
                                        icon: <Eye size={20} />,
                                        desc: 'We optimize for high contrast, color-independent signaling, and screen-reader compatibility across all designer listings.'
                                    },
                                    {
                                        title: 'Navigational Logic',
                                        icon: <ToggleLeft size={20} />,
                                        desc: 'Our interface supports full keyboard navigation and clear focus states for frictionless archival exploration.'
                                    },
                                    {
                                        title: 'Semantic Structure',
                                        icon: <HeartHandshake size={20} />,
                                        desc: 'We utilize W3C WCAG 2.1 Level AA standards as our baseline for code architecture and content hierarchy.'
                                    },
                                    {
                                        title: 'Responsive Design',
                                        icon: <Ear size={20} />,
                                        desc: 'Fluid layouts ensure that scaling text or zooming into high-detail product shots never breaks the editorial flow.'
                                    }
                                ].map((item) => (
                                    <div key={item.title} className="p-8 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] border border-white">
                                        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center mb-6 text-charcoal">
                                            {item.icon}
                                        </div>
                                        <h4 className="text-lg font-serif italic mb-3">{item.title}</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">Feedback</h2>
                            <p className="text-xl font-medium text-charcoal leading-relaxed mb-6">
                                Digital governance is an iterative process. If you encounter any barriers while accessing our collections, please notify our accessibility lead immediately.
                            </p>
                        </motion.section>
                    </div>

                    <div>
                        <div className="p-10 rounded-[3rem] bg-charcoal text-cream shadow-2xl sticky top-32">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-cream/40">Concierge Desk</h4>
                            <p className="text-xl font-serif italic mb-8 leading-relaxed">Report an interface barrier or request assistance.</p>
                            <Link
                                href="/support/contact"
                                className="w-full h-16 bg-white text-charcoal rounded-full flex items-center justify-center font-black text-[10px] uppercase tracking-[0.2em] hover:bg-brilliant-rose hover:text-white transition-all duration-500"
                            >
                                Accessibility Desk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-20 border-t border-charcoal/5 text-center">
                <p className="text-[9px] font-black text-charcoal/20 uppercase tracking-[0.4em]">Archiv Inclusion — v1.0.1</p>
            </footer>
        </main>
    );
}
