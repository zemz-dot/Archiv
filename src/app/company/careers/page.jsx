'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, Heart, Smartphone, Briefcase, Zap, Star } from 'lucide-react';
import { Navbar, Footer, AppPopup, AnnouncementBar } from '../../../components/layout/SharedComponents';

export default function CareersPage() {
    const [showAppPopup, setShowAppPopup] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            <AnimatePresence>
                {showAppPopup && <AppPopup onClose={() => setShowAppPopup(false)} />}
            </AnimatePresence>

            <AnnouncementBar onShowPopup={() => setShowAppPopup(true)} />
            <Navbar onSearch={() => setShowSearch(true)} />

            {/* Careers Hero */}
            <section className="relative px-6 lg:px-12 py-32 lg:py-48 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div>
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
                            Join The <br />
                            <span className="italic text-charcoal/20">Loop.</span>
                        </motion.h1>
                        <p className="text-xl lg:text-2xl font-serif italic text-gray-400 leading-relaxed max-w-sm">
                            Building the world&apos;s first high-fidelity circular fashion ecosystem.
                        </p>
                    </div>

                    <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1200"
                            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                            alt="Team at work"
                        />
                        <div className="absolute inset-x-8 bottom-8 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-between">
                            <div>
                                <div className="text-white text-2xl font-serif italic font-black">24</div>
                                <div className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-1">Open Positions</div>
                            </div>
                            <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-charcoal shadow-lg hover:bg-brilliant-rose hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Culture Section */}
            <section className="py-32 px-6 lg:px-12 bg-off-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
                        <div className="max-w-2xl">
                            <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block italic">Our Culture // The loop life</span>
                            <h3 className="text-6xl font-serif text-black leading-tight">Fast Growth. <br /> <span className="italic">Infinite Style.</span></h3>
                        </div>
                        <div className="max-w-xs">
                            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                                We're a team of fashion enthusiasts, data scientists, and creative thinkers redefining what it means to get dressed.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Radical Transparency", desc: "No egos, just results. We share every win and every lesson.", icon: <Zap size={20} /> },
                            { title: "Fashion First", desc: "We are obsessed with aesthetics. High-fidelity is in our DNA.", icon: <Star size={20} /> },
                            { title: "Circular Mindset", desc: "Everything we do must benefit the planet and the community.", icon: <Globe size={20} /> },
                            { title: "Global Impact", desc: "From New York to Tokyo, we're sharing wardrobes across borders.", icon: <Briefcase size={20} /> }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-off-white flex items-center justify-center mb-10 group-hover:bg-sage transition-all group-hover:text-white">
                                    {item.icon}
                                </div>
                                <h4 className="font-serif text-xl mb-4">{item.title}</h4>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles Mock Table */}
            <section className="py-32 px-6 lg:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14">
                        <span className="text-gray-300 font-bold text-xs uppercase tracking-[0.3em] mb-3 block">Opportunities</span>
                        <h3 className="text-4xl lg:text-5xl font-serif">Open <span className="italic">Positions.</span></h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { role: "Senior Product Designer", dept: "Design", type: "Remote/London", salary: "£85k-£110k" },
                            { role: "Sustainability Lead", dept: "Strategy", type: "London", salary: "£70k-£95k" },
                            { role: "Senior Data Scientist (Recommender Systems)", dept: "Engineering", type: "Remote", salary: "£90k-130k" },
                            { role: "Brand Partnership Manager", dept: "Marketing", type: "Paris/Hybrid", salary: "€65k-€80k" }
                        ].map((job, i) => (
                            <Link
                                key={job.role}
                                href="#"
                                className="group flex items-center gap-6 bg-off-white hover:bg-black rounded-2xl p-6 lg:p-10 transition-all duration-500 border border-transparent hover:border-black"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <span className="font-serif text-2xl group-hover:text-white transition-colors">{job.role}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-sage bg-sage/10 px-2 py-0.5 rounded-full">Hiring</span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 group-hover:text-white/50 font-medium mt-2 transition-colors uppercase tracking-[0.2em]">{job.dept} · {job.type}</div>
                                </div>
                                <div className="hidden md:block text-right flex-shrink-0">
                                    <div className="text-sm font-black group-hover:text-white transition-colors">{job.salary}</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-white/40 transition-colors">Per Annum</div>
                                </div>
                                <ArrowRight size={18} className="flex-shrink-0 text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer onShowPopup={() => setShowAppPopup(true)} />
        </main>
    );
}
