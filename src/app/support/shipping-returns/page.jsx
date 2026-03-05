'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, Truck, Replace } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShippingReturns() {
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
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Logistics Protocol</span>
                    </div>

                    <h1 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter mb-16">
                        Delivery & <br />
                        <span className="italic text-charcoal/20">The Return.</span>
                    </h1>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    {[
                        {
                            title: 'Global Priority',
                            desc: 'Tracked priority shipping is our standard. Items are dispatched to arrive 24-48 hours before your booking start date.',
                            icon: <Truck size={24} />,
                            color: 'brilliant-rose'
                        },
                        {
                            title: 'Zero Waste Circ',
                            desc: 'We use 100% compostable, reusable mailers. Return your piece in the same packaging to close the production loop.',
                            icon: <Package size={24} />,
                            color: 'sage'
                        },
                        {
                            title: 'Seamless Return',
                            desc: 'Return labels are generated automatically. Simply attach to your parcel and drop at any verified location.',
                            icon: <Replace size={24} />,
                            color: 'charcoal'
                        }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 * idx }}
                            className="group bg-white/40 backdrop-blur-xl border border-white p-10 h-full rounded-[2.5rem] shadow-xl shadow-black/[0.02] hover:shadow-black/[0.05] transition-all duration-700"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 shadow-sm border border-charcoal/[0.02] bg-white group-hover:scale-110 group-hover:bg-charcoal group-hover:text-cream transition-all duration-500`}>
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-serif italic mb-4 text-charcoal">{item.title}</h3>
                            <p className="text-sm text-gray-400 font-medium leading-[1.8]">
                                {item.desc}
                            </p>
                            <div className="mt-8 h-[1px] w-0 group-hover:w-full bg-brilliant-rose/20 transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-32 p-12 bg-charcoal rounded-[3rem] text-center overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brilliant-rose/10 rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-sage/10 rounded-full blur-[60px]" />
                    <h3 className="text-3xl font-serif italic text-cream mb-6 relative z-10">Need express assistance?</h3>
                    <p className="text-cream/50 text-sm font-medium mb-10 max-w-sm mx-auto relative z-10">Our logistics team handles peer-to-peer flows across the globe, ensuring your archive piece is always secure.</p>
                    <Link href="/support/contact" className="relative z-10 inline-block px-10 py-4 bg-cream text-charcoal rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-brilliant-rose hover:text-white transition-all duration-500">
                        Message Dispatch
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
