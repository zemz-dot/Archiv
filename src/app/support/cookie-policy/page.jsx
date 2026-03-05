'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, ShieldCheck, Cpu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <nav className="fixed top-0 w-full bg-cream/80 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center px-6 lg:px-12 z-50">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Digital Protocol</span>
                    </div>

                    <h1 className="text-6xl lg:text-9xl font-serif leading-[0.85] tracking-tighter mb-8">
                        Cookie <br />
                        <span className="italic text-charcoal/20">Governance.</span>
                    </h1>
                    <p className="text-gray-400 font-serif italic text-xl">Protecting your data footprint across the archive.</p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-24">
                    <div className="lg:col-span-2 space-y-24">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">01. The Concept</h2>
                            <p className="text-2xl font-serif italic text-gray-500 leading-relaxed">
                                Cookies are small text files that are placed on your device by our platform. They act as "archival tags," helping us remember your preferences, secure your sessions, and understand how you interact with our curated collections.
                            </p>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">02. Cookie Categories</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    {
                                        title: 'Essential Portals',
                                        icon: <ShieldCheck size={20} className="text-charcoal" />,
                                        desc: 'Strictly necessary for the platform to function. They handle authentication, security, and the booking process. These cannot be disabled.'
                                    },
                                    {
                                        title: 'Experience Tuning',
                                        icon: <Cpu size={20} className="text-charcoal" />,
                                        desc: 'Functional cookies that remember your settings, such as your region or currency preferences, to ensure a seamless wardrobe exploration.'
                                    },
                                    {
                                        title: 'Insight Analytics',
                                        icon: <Globe size={20} className="text-charcoal" />,
                                        desc: 'Anonymized tracking that helps us understand which designers and collections the community finds most inspiring.'
                                    },
                                    {
                                        title: 'Curated Displays',
                                        icon: <Cookie size={20} className="text-charcoal" />,
                                        desc: 'Targeting cookies used to showcase relevant items back to you based on your archival interests across other digital spaces.'
                                    }
                                ].map((cat) => (
                                    <div key={cat.title} className="p-8 rounded-[2rem] bg-white shadow-xl shadow-black/[0.02] border border-white group hover:-translate-y-2 transition-all duration-700">
                                        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center mb-6 group-hover:bg-brilliant-rose transition-colors duration-700">
                                            <div className="group-hover:text-white transition-colors">
                                                {cat.icon}
                                            </div>
                                        </div>
                                        <h4 className="text-lg font-serif italic mb-3">{cat.title}</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed font-medium">{cat.desc}</p>
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
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">03. Ownership & Control</h2>
                            <p className="text-xl font-medium text-charcoal leading-relaxed mb-6">
                                You hold the keys to your archival data. You can adjust your consent at any time via our persistent settings hub or through your browser configuration.
                            </p>
                            <p className="text-sm text-gray-400 font-medium">
                                Note: Restricting certain protocols may affect the high-fidelity experience we aim to provide.
                            </p>
                        </motion.section>
                    </div>

                    <div className="space-y-12">
                        <div className="p-8 rounded-[2.5rem] bg-charcoal text-cream shadow-2xl sticky top-32">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-cream/40">Secure Assistance</h4>
                            <p className="text-lg font-serif italic mb-6 leading-relaxed">Questions regarding our digital governance?</p>
                            <Link
                                href="/support/contact"
                                className="w-full h-14 bg-brilliant-rose text-white rounded-full flex items-center justify-center font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-pink-900/20"
                            >
                                Contact Counsel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="py-20 border-t border-charcoal/5 text-center">
                <p className="text-[9px] font-black text-charcoal/20 uppercase tracking-[0.4em]">Archiv Protocol — v2.4.0</p>
            </footer>
        </main>
    );
}
