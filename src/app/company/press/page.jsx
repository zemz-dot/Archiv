'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Heart, Smartphone, Play, Download, ExternalLink } from 'lucide-react';
import { Navbar, Footer, AppPopup, AnnouncementBar } from '../../../components/layout/SharedComponents';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function PressMediaPage() {
    const [showAppPopup, setShowAppPopup] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <AnimatePresence>
                {showAppPopup && <AppPopup onClose={() => setShowAppPopup(false)} />}
            </AnimatePresence>

            <AnnouncementBar onShowPopup={() => setShowAppPopup(true)} />
            <Navbar onSearch={() => setShowSearch(true)} />

            {/* Press Hero */}
            <section className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1 }}
                        className="h-1 w-24 bg-brilliant-rose mb-12 origin-left"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-7xl lg:text-[10rem] font-serif leading-[0.8] tracking-tighter mb-12"
                    >
                        Press & <br />
                        <span className="italic text-charcoal/20">Media.</span>
                    </motion.h1>
                    <p className="text-xl lg:text-2xl font-serif italic text-gray-400 leading-relaxed max-w-xl">
                        ARCHIV in the headlines. Curating global fashion conversations.
                    </p>
                </div>
            </section>

            {/* Premium editorial Logo Marquee */}
            <div className="relative w-full py-12 bg-off-white/50 border-y border-gray-100 overflow-hidden mb-24 group">
                <div className="flex gap-20 lg:gap-40 items-center">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: '-50%' }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex gap-20 lg:gap-40 items-center whitespace-nowrap"
                    >
                        {/* Tripled the array for super smooth infinite scroll on the press page */}
                        {[...['VOGUE', 'ELLE', 'BAZAAR', 'NY TIMES', 'FORBES', 'WWD', 'DAZED', 'GRAZIA'], ...['VOGUE', 'ELLE', 'BAZAAR', 'NY TIMES', 'FORBES', 'WWD', 'DAZED', 'GRAZIA'], ...['VOGUE', 'ELLE', 'BAZAAR', 'NY TIMES', 'FORBES', 'WWD', 'DAZED', 'GRAZIA']].map((press, i) => (
                            <span
                                key={i}
                                className="font-black text-xl lg:text-3xl tracking-tight opacity-20 group-hover:opacity-40 hover:!opacity-100 hover:text-brilliant-rose transition-all duration-700 cursor-default select-none"
                            >
                                {press}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Featured Articles */}
            <section className="py-24 px-6 lg:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14">
                        <span className="text-gray-300 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Newsroom</span>
                        <h3 className="text-4xl lg:text-5xl font-serif">Featured <span className="italic">Stories.</span></h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {[
                            {
                                date: "March 2026",
                                outlet: "VOGUE BUSINESS",
                                title: "How ARCHIV redefined the circular fashion economy for a new generation.",
                                img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800"
                            },
                            {
                                date: "Feb 2026",
                                outlet: "FORBES",
                                title: "Founded in a closet: The 2.4 million pound success story of Foued Mensi.",
                                img: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=800"
                            },
                            {
                                date: "Jan 2026",
                                outlet: "ELLE SUSTAIN",
                                title: "10 Most rented items from the ARCHIV collection this winter.",
                                img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
                            },
                            {
                                date: "Dec 2025",
                                outlet: "BAZAAR",
                                title: "Why luxury brands are now partnering directly with ARCHIV.",
                                img: "https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?q=80&w=800"
                            }
                        ].map((article, i) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="group cursor-pointer block"
                            >
                                <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-sm">
                                    <img
                                        src={article.img}
                                        alt={article.title}
                                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                                        <ExternalLink size={20} className="text-white" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brilliant-rose">{article.outlet}</span>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">{article.date}</span>
                                </div>
                                <h4 className="text-2xl font-serif font-black leading-tight group-hover:text-brilliant-rose transition-colors">{article.title}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Media Assets - Redesigned for Premium Feel */}
            <section className="py-40 px-6 lg:px-12 bg-cream/40 overflow-hidden relative">
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brilliant-rose/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                        <div className="max-w-xl">
                            <span className="text-gray-300 font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">Asset Library</span>
                            <h3 className="text-5xl lg:text-7xl font-serif leading-none tracking-tighter">
                                Brand <br />
                                <span className="italic text-charcoal/30">Resources.</span>
                            </h3>
                        </div>
                        <div className="pb-2">
                            <p className="text-gray-400 font-serif italic text-lg max-w-sm">
                                High-resolution assets and official guidelines for journalists and partners.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Brand Guidelines",
                                type: "PDF (12.4 MB)",
                                desc: "Full usage guide, color palettes, and typography rules.",
                                icon: <Play size={24} className="rotate-90" />,
                                color: "bg-charcoal text-white"
                            },
                            {
                                name: "Official Logos",
                                type: "SVG/PNG (4.2 MB)",
                                desc: "Primary and secondary logo marks in all brand variants.",
                                icon: <Globe size={24} />,
                                color: "bg-white text-charcoal"
                            },
                            {
                                name: "Founder Headshots",
                                type: "JPEG (85 MB)",
                                desc: "High-resolution, environmentally validated portraits of our leadership team.",
                                icon: <Heart size={24} />,
                                color: "bg-white text-charcoal shadow-xl shadow-black/[0.02]"
                            }
                        ].map((asset, i) => (
                            <motion.div
                                key={asset.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className={cn(
                                    "p-10 rounded-[2.5rem] border border-white flex flex-col justify-between aspect-square group transition-all duration-700 hover:-translate-y-3",
                                    asset.color
                                )}
                            >
                                <div className="flex flex-col gap-8">
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700",
                                        asset.name === "Brand Guidelines" ? "bg-white/10 group-hover:bg-brilliant-rose" : "bg-cream group-hover:bg-brilliant-rose group-hover:text-white"
                                    )}>
                                        {asset.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-serif italic mb-3">{asset.name}</h4>
                                        <p className={cn(
                                            "text-sm font-medium leading-relaxed mb-6",
                                            asset.name === "Brand Guidelines" ? "text-white/50" : "text-gray-400"
                                        )}>
                                            {asset.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest",
                                        asset.name === "Brand Guidelines" ? "text-white/30" : "text-charcoal/20"
                                    )}>
                                        {asset.type}
                                    </span>
                                    <button className={cn(
                                        "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
                                        asset.name === "Brand Guidelines" ? "bg-white text-charcoal hover:scale-110" : "bg-charcoal text-white hover:bg-brilliant-rose hover:scale-110"
                                    )}>
                                        <Download size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Media Contact Inline Card */}
                    <div className="mt-32 p-12 lg:p-20 rounded-[3rem] bg-white border border-white shadow-2xl shadow-black/[0.02] flex flex-col lg:flex-row items-center justify-between gap-12 group">
                        <div className="text-center lg:text-left">
                            <h5 className="text-3xl lg:text-4xl font-serif italic mb-4">Questions? Connect with <br /> our <span className="text-brilliant-rose">Press Team.</span></h5>
                            <p className="text-gray-400 font-medium max-w-sm">For interview requests, event access, or exclusive features.</p>
                        </div>
                        <div className="text-center lg:text-right">
                            <span className="text-gray-300 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Direct Contact</span>
                            <a href="mailto:press@archiv-fashion.com" className="text-3xl lg:text-5xl font-serif border-b-2 border-charcoal/5 group-hover:border-brilliant-rose transition-all pb-2 inline-block">
                                press<span className="italic text-gray-300">@</span>archiv<span className="text-brilliant-rose">.</span>com
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer onShowPopup={() => setShowAppPopup(true)} />
        </main>
    );
}
