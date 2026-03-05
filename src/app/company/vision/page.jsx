'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe, Heart } from 'lucide-react';
import { Navbar, Footer, AppPopup, AnnouncementBar } from '../../../components/layout/SharedComponents';

export default function VisionPage() {
    const [showAppPopup, setShowAppPopup] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <AnimatePresence>
                {showAppPopup && <AppPopup onClose={() => setShowAppPopup(false)} />}
            </AnimatePresence>

            <AnnouncementBar onShowPopup={() => setShowAppPopup(true)} />
            <Navbar onSearch={() => setShowSearch(true)} />

            {/* Hero Section */}
            <section className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
                    <div className="flex-1">
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
                            The <br />
                            <span className="italic text-charcoal/20">Vision.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl lg:text-2xl font-serif italic text-gray-400 leading-relaxed max-w-lg"
                        >
                            &ldquo;We believe the future of fashion isn&apos;t ownership, but access. A world where style is shared, and waste is vintage.&rdquo;
                        </motion.p>
                    </div>

                    <div className="relative w-full lg:w-[40%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Vision Fashion"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                </div>

                {/* Decorative background text */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[25vw] font-serif italic text-charcoal/[0.02] whitespace-nowrap pointer-events-none z-0">
                    CIRCULAR DESIGN FUTURE
                </div>
            </section>

            {/* Core Pillars */}
            <section className="py-32 px-6 lg:px-12 bg-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-24">
                        {[
                            {
                                title: "Sustainability",
                                desc: "Ditching the buy-wear-waste cycle for good. Our platform extends the life of high-end fashion by 10x.",
                                icon: <Globe size={24} className="text-sage" />
                            },
                            {
                                title: "Community",
                                desc: "Empowering 200k+ members to monetize their archives while accessing the world's best closets.",
                                icon: <Heart size={24} className="text-brilliant-rose" />
                            },
                            {
                                title: "Innovation",
                                desc: "Using AI mapping and biometric logistics to ensure every rotation is seamless, safe, and premium.",
                                icon: <CheckCircle2 size={24} className="text-charcoal" />
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="space-y-8"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-serif">{pillar.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{pillar.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story / Founder Section */}
            <section className="py-40 px-6 lg:px-12 bg-charcoal text-cream overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brilliant-rose/10 rounded-full blur-[120px]" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div className="relative z-10">
                        <span className="text-brilliant-rose font-black text-[10px] uppercase tracking-[0.4em] block mb-8">From The Founder</span>
                        <h2 className="text-5xl lg:text-7xl font-serif italic mb-12 leading-tight">
                            It started with one <br />
                            vintage Chanel bag.
                        </h2>
                        <div className="space-y-8 text-cream/60 text-lg leading-relaxed max-w-lg">
                            <p>
                                ARCHIV was born from a simple observation: our most beautiful clothes spend 95% of their lives in the dark.
                            </p>
                            <p>
                                We wanted to create a platform that treats fashion as an asset, not a disposable commodity. Today, we are the global leader in high-fidelity fashion rental.
                            </p>
                        </div>
                        <div className="mt-16 flex items-center gap-6">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/10 relative z-10">
                                    <img src="/Foued.jpg" className="w-full h-full object-cover" alt="Founder" />
                                </div>
                                {/* Environmentally Validated Badge */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="absolute -top-2 -right-2 z-20 bg-sage text-white p-2 rounded-full shadow-lg"
                                >
                                    <CheckCircle2 size={12} />
                                </motion.div>
                            </div>
                            <div>
                                <div className="font-black text-sm uppercase tracking-widest">Foued Mensi</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="text-cream/30 text-[10px] font-bold uppercase tracking-[0.2em]">Founder // Archiv</div>
                                    <span className="w-1 h-1 bg-sage rounded-full" />
                                    <div className="text-sage text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                                        Environmentally Validated
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                alt="Shared Wardrobe"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer onShowPopup={() => setShowAppPopup(true)} />
        </main>
    );
}
