'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Community Charter</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter mb-16">
                        Terms of <br />
                        <span className="italic text-charcoal/20">Service.</span>
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
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">Acceptance</h2>
                        </div>
                        <p className="pl-12 border-l border-charcoal/5">
                            By accessing or using the ARCHIV platform, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services. Your use signifies your alignment with our circular mission.
                        </p>
                    </section>

                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">02</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">The Marketplace</h2>
                        </div>
                        <p className="pl-12 border-l border-charcoal/5">
                            ARCHIV is a community-driven marketplace that facilitates peer-to-peer clothing rental. We do not own the items listed on the platform. The contract for the rental is directly between the Lender and the Renter, mediated by our secure archival protocols.
                        </p>
                    </section>

                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">03</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">User Obligations</h2>
                        </div>
                        <div className="pl-12 border-l border-charcoal/5 space-y-4">
                            {[
                                'Lenders must provide accurate descriptions and archival-quality images.',
                                'Renters must treat items with the utmost care as shared heritage.',
                                'Users are responsible for maintaining the confidentiality of their digital archive keys.'
                            ].map((task, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-1 h-1 rounded-full bg-charcoal/20 mt-2.5 shrink-0" />
                                    <p className="text-sm">{task}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="group">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">04</span>
                            <h2 className="text-xl font-serif italic text-charcoal group-hover:text-brilliant-rose transition-colors duration-500">Asset Liability</h2>
                        </div>
                        <p className="pl-12 border-l border-charcoal/5">
                            In the event of damage or loss of an archival piece, the Renter may be liable for repair or replacement costs up to the RRP. Lenders are encouraged to maintain appropriate coverage for their collections.
                        </p>
                    </section>

                    <footer className="pt-24 border-t border-charcoal/5 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">Edition: 2026.01</p>
                        <p className="mt-4 text-sm font-serif italic">Need further clarification? <Link href="/support/contact" className="text-charcoal underline underline-offset-4 decoration-brilliant-rose/30">Connect with Counsel</Link></p>
                    </footer>
                </motion.div>
            </div>
        </main>
    );
}
