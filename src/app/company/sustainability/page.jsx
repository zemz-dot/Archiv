'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Heart, Smartphone, Leaf, Recycle, Wind, Droplets } from 'lucide-react';
import { Navbar, Footer, AppPopup, AnnouncementBar } from '../../../components/layout/SharedComponents';

export default function SustainabilityPage() {
    const [showAppPopup, setShowAppPopup] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <AnimatePresence>
                {showAppPopup && <AppPopup onClose={() => setShowAppPopup(false)} />}
            </AnimatePresence>

            <AnnouncementBar onShowPopup={() => setShowAppPopup(true)} />
            <Navbar onSearch={() => setShowSearch(true)} />

            {/* Sustainability Hero */}
            <section className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-sage/10 rounded-full blur-[160px] translate-x-1/3 -translate-y-1/3 opacity-40" />
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1 }}
                        className="h-1 w-24 bg-sage mb-12 origin-left"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-7xl lg:text-[10rem] font-serif leading-[0.8] tracking-tighter mb-12"
                    >
                        Conscious <br />
                        <span className="italic text-sage/20">Circulation.</span>
                    </motion.h1>
                    <p className="text-xl lg:text-2xl font-serif italic text-gray-400 leading-relaxed max-w-xl">
                        Extending the lifecycle of fashion. One rotation at a time.
                    </p>
                </div>
            </section>

            {/* Impact Stats Overlay */}
            <section className="py-24 px-6 lg:px-12 bg-off-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { val: '6.4 tons', label: 'Carbon Offset Monthly', icon: <Wind className="text-brilliant-rose" /> },
                            { val: '120k+', label: 'Items in Circulation', icon: <Recycle className="text-sage" /> },
                            { val: '98%', label: 'Rental Return Accuracy', icon: <CheckCircle2 className="text-charcoal" /> },
                            { val: '1.2M L', label: 'Water Saved', icon: <Droplets className="text-blue-200" /> }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-sage/20"
                            >
                                <div className="w-12 h-12 rounded-xl bg-off-white flex items-center justify-center mb-8 group-hover:bg-sage/10 transition-all">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-serif italic font-black mb-3">{stat.val}</div>
                                <div className="text-charcoal/30 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study: The Life of a Rental */}
            <section className="py-40 px-6 lg:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <span className="text-sage font-black text-[10px] uppercase tracking-[0.4em] block mb-8">Case Study 01 // The Loop Life</span>
                            <h2 className="text-5xl lg:text-7xl font-serif leading-tight mb-12">
                                95% Emissions <br /> <span className="italic">Reduction.</span>
                            </h2>
                            <div className="space-y-8 text-charcoal/60 text-lg leading-relaxed max-w-lg">
                                <p>
                                    Compared to buying a new wool coat, renting through ARCHIV reduces the carbon footprint by over 95%.
                                </p>
                                <p>
                                    Our logistics are bio-mapped to minimize travel distance, and our cleaning process uses ozone technology to eliminate toxins and water waste.
                                </p>
                            </div>
                            <div className="mt-12">
                                <Link href="#" className="h-14 px-8 border border-charcoal/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-black transition-all flex items-center justify-center inline-flex group gap-3">
                                    Read Impact Report 2026 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative">
                                <img
                                    src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200"
                                    className="w-full h-full object-cover"
                                    alt="Sustainable fashion"
                                />
                                <div className="absolute inset-x-8 bottom-8 p-8 bg-black/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <Leaf size={16} className="text-sage" />
                                        <span className="text-white font-bold text-[10px] uppercase tracking-widest">Net Zero Target // 2027</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CEO Commitment Section */}
            <section className="py-40 px-6 lg:px-12 bg-charcoal text-cream overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sage/10 rounded-full blur-[120px]" />
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <div className="relative mb-16">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-8 ring-white/5 relative z-10">
                            <img src="/Foued.jpg" className="w-full h-full object-cover" alt="CEO" />
                        </div>
                        {/* Environmentally Validated Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="absolute -top-2 -right-2 z-20 bg-sage text-white p-4 rounded-full shadow-2xl"
                        >
                            <CheckCircle2 size={24} />
                        </motion.div>
                    </div>

                    <div className="max-w-3xl">
                        <span className="text-sage font-black text-[10px] uppercase tracking-[0.4em] block mb-8">Executive Commitment</span>
                        <h2 className="text-4xl lg:text-6xl font-serif italic mb-12 leading-tight">
                            &ldquo;Our goal isn&apos;t just to be better for the planet, but to redefine what it means to be a modern fashion company.&rdquo;
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="font-black text-sm uppercase tracking-[0.3em]">Foued Mensi</div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="text-sage text-[10px] font-bold uppercase tracking-[0.2em]">Environmentally Validated CEO</div>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <div className="text-cream/30 text-[10px] font-bold uppercase tracking-[0.2em]">Archiv Founding Lead</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer onShowPopup={() => setShowAppPopup(true)} />
        </main>
    );
}
