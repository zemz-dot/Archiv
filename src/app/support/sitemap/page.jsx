'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sitemap() {
    const sitemapData = [
        {
            title: 'The Archive',
            links: [
                { name: 'Home Hub', path: '/' },
                { name: 'How It Works', path: '/support/how-it-works' },
                { name: 'Collections Feed', path: '/collections/all' },
                { name: 'Trending Designers', path: '/#trending-designers' },
            ]
        },
        {
            title: 'Curated Categories',
            links: [
                { name: 'All Archival Items', path: '/collections/all' },
                { name: 'Designer Dresses', path: '/collections/all' },
                { name: 'Archival Bags', path: '/collections/all' },
                { name: 'Structured Outerwear', path: '/collections/all' },
                { name: 'Last Minute Drops', path: '/collections/all' },
                { name: 'Compostable Mailer Shop', path: '/shop/mailer-bags' },
            ]
        },
        {
            title: 'The Occasions',
            links: [
                { name: 'Trending Now', path: '/collections/all' },
                { name: 'Weekend Escape', path: '/collections/all' },
                { name: 'Black Tie Gala', path: '/collections/all' },
                { name: 'Bridal Archive', path: '/collections/all' },
                { name: 'Sunset & Shore', path: '/collections/all' },
                { name: 'Midnight Out', path: '/collections/all' },
                { name: 'Cultural Heritage', path: '/collections/all' },
            ]
        },
        {
            title: 'Concierge & Help',
            links: [
                { name: 'Platform Guide', path: '/support/how-it-works' },
                { name: 'Support FAQ', path: '/support/faq' },
                { name: 'Connect with Us', path: '/support/contact' },
                { name: 'Shipping & Returns', path: '/support/shipping-returns' },
            ]
        },
        {
            title: 'Legal Protocols',
            links: [
                { name: 'Privacy Protocol', path: '/support/privacy-policy' },
                { name: 'Terms of Sale', path: '/support/terms-of-service' },
                { name: 'Cookie Governance', path: '/support/cookie-policy' },
                { name: 'Accessibility Standard', path: '/support/accessibility' },
            ]
        }
    ];

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
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/60">Navigation Hub</span>
                    </div>

                    <h1 className="text-6xl lg:text-9xl font-serif leading-[0.85] tracking-tighter">
                        Platform <br />
                        <span className="italic text-charcoal/20">Sitemap.</span>
                    </h1>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-24">
                    {sitemapData.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                        >
                            <h2 className="text-[10px] font-black text-charcoal uppercase tracking-[0.4em] mb-10 pb-4 border-b border-charcoal/10">{section.title}</h2>
                            <ul className="space-y-6">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.path}
                                            className="group flex items-center justify-between text-lg font-serif italic text-gray-400 hover:text-charcoal transition-all duration-500"
                                        >
                                            <span>{link.name}</span>
                                            <ChevronRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-brilliant-rose" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
