'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

const DESIGNER_DATA = {
    'jacquemus': {
        name: 'JACQUEMUS',
        logo: '/jacquemus-logo.avif',
        tagline: 'Sun-soaked Minimalism from the South of France.',
        founded: '2009',
        origin: 'Marseille, France',
        desc: 'Simon Porte Jacquemus creates playful, sensual clothes rooted in his Provençal upbringing. From the iconic Le Chiquito micro-bag to flowing bias-cut dresses, every piece is an event.',
        hero: 'https://images.unsplash.com/photo-1541339907198-e087563f3f3b?q=80&w=1600&auto=format&fit=crop',
    },
    'alaia': {
        name: 'ALAIA',
        tagline: 'The Couturier of the Body.',
        founded: '1964',
        origin: 'Paris, France',
        desc: 'Azzedine Alaïa was revered for his sculptural, body-conscious designs that celebrated the female form. The house continues to produce some of the most coveted knitwear and leather pieces.',
        hero: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1600&auto=format&fit=crop',
    },
    'bottega-veneta': {
        name: 'BOTTEGA VENETA',
        tagline: 'When your own initials are enough.',
        founded: '1966',
        origin: 'Vicenza, Italy',
        desc: 'The house of quiet luxury. Bottega Veneta is celebrated for its signature intrecciato weave, discreet logoless branding, and exquisite Italian craftsmanship.',
        hero: 'https://images.unsplash.com/photo-1590736704728-f4730bb3c3af?q=80&w=1600&auto=format&fit=crop',
    },
    'chanel': {
        name: 'CHANEL',
        tagline: 'A woman needs ropes and ropes of pearls. — Coco Chanel',
        founded: '1910',
        origin: 'Paris, France',
        desc: 'The eternal Parisian icon. Chanel defined modern femininity through the little black dress, the 2.55 bag, and the iconic tweed jacket. Renting Chanel is the ultimate luxury.',
        hero: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1600&auto=format&fit=crop',
    },
    'loewe': {
        name: 'LOEWE',
        tagline: 'The Art of Craft.',
        founded: '1846',
        origin: 'Madrid, Spain',
        desc: 'Under Jonathan Anderson, Loewe is one of fashion\'s most exciting houses. The Puzzle bag, the Hammock, and the Elephant tee are community obsessions.',
        hero: 'https://images.unsplash.com/photo-1594938384824-023687803362?q=80&w=1600&auto=format&fit=crop',
    },
    'reformation': {
        name: 'REFORMATION',
        tagline: 'Being naked is the #1 most sustainable option. Reformation is #2.',
        founded: '2009',
        origin: 'Los Angeles, USA',
        desc: 'Reformation makes effortlessly cool, sustainable clothing for women. Their vintage-inspired silhouettes have become wardrobe staples for the sustainability-conscious fashionista.',
        hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    },
    'zimmermann': {
        name: 'ZIMMERMANN',
        tagline: 'Australian Femininity Elevated.',
        founded: '1991',
        origin: 'Sydney, Australia',
        desc: 'Zimmermann is synonymous with vacation dressing done luxuriously. Their ruffled linens, broderie anglaise and floral prints are perennial community favourites.',
        hero: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=1600&auto=format&fit=crop',
    },
    'aje': {
        name: 'AJE',
        tagline: 'Raw Elegance. Australian Heritage.',
        founded: '2009',
        origin: 'Sydney, Australia',
        desc: 'Aje creates directional, powerful clothing inspired by the duality of natural landscapes and urban environments. Their structured silhouettes and earthy palettes are instantly recognisable.',
        hero: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    },
};

const COMMUNITY_PICKS = [
    { id: 1, designer: 'JACQUEMUS', name: 'Le Chiquito Long', size: 'OS', price: 15, rrp: 450, img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop', lender: '/Foued.jpg', tag: 'Trending' },
    { id: 2, designer: '', name: 'Silk Slip Dress', size: 'UK 8', price: 85, rrp: 1200, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=2' },
    { id: 5, designer: '', name: 'Nylon Cleo Bag', size: 'OS', price: 40, rrp: 1800, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', lender: '/Foued.jpg', tag: 'Top Pick' },
    { id: 4, designer: '', name: 'Floral Midi Dress', size: 'UK 12', price: 25, rrp: 248, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=4' },
];

export default function DesignerPage() {
    const params = useParams();
    const slug = params?.designer || 'jacquemus';
    const designer = DESIGNER_DATA[slug] || DESIGNER_DATA['jacquemus'];

    return (
        <main className="min-h-screen bg-white">
            {/* Nav */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center px-6 lg:px-12 z-50">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} /> Discover
                </Link>
                <div className="mx-auto font-black tracking-tighter text-xl">ARCHIV</div>
                <div className="w-24" />
            </nav>

            {/* Designer Hero */}
            <header className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <img src={designer.hero} className="w-full h-full object-cover" alt={designer.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Brand logo badge — top right, only when logo exists */}
                {designer.logo && (
                    <div className="absolute top-8 right-8 lg:top-10 lg:right-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
                        <img
                            src={designer.logo}
                            alt={`${designer.name} logo`}
                            className="h-10 lg:h-14 w-auto object-contain brightness-0 invert"
                        />
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-0 left-0 p-8 lg:p-16 max-w-3xl"
                >
                    <div className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Est. {designer.founded} · {designer.origin}</div>
                    <h1 className="text-5xl lg:text-8xl font-serif font-black text-white leading-none mb-4">{designer.name}</h1>
                    <p className="text-white/80 text-lg font-medium italic leading-relaxed">&quot;{designer.tagline}&quot;</p>
                </motion.div>
            </header>

            {/* Designer Bio */}
            <section className="py-16 px-6 lg:px-12 max-w-5xl mx-auto border-b border-gray-100">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-brilliant-rose font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">About the House</span>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed">{designer.desc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { label: 'Community Rentals', val: '2,400+' },
                            { label: 'Active Pieces', val: '340+' },
                            { label: 'Avg. Daily Rate', val: '£45' },
                            { label: 'Community Rating', val: '4.9 ★' },
                        ].map(stat => (
                            <div key={stat.label} className="bg-off-white rounded-xl p-6 border border-gray-100">
                                <div className="text-2xl font-serif italic font-black mb-1">{stat.val}</div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Community Picks */}
            <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] block mb-2">Community Favourites</span>
                        <h2 className="text-4xl font-serif">Rent {designer.name}</h2>
                    </div>
                    <Link href="/collections/all" className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:text-brilliant-rose hover:border-brilliant-rose transition-all">
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
                    {COMMUNITY_PICKS.map(item => (
                        <Link key={item.id} href={`/product/${item.id}`} className="group">
                            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
                                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} />
                                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-brilliant-rose hover:text-white">
                                    <Heart size={16} />
                                </button>
                                {item.tag && (
                                    <div className="absolute top-4 left-4 h-6 px-3 bg-white/90 backdrop-blur rounded-full text-[9px] font-black uppercase tracking-tight flex items-center">
                                        {item.tag}
                                    </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 w-10 h-10 p-0.5 bg-white rounded-full shadow-md z-10">
                                    <img src={item.lender} className="w-full h-full rounded-full object-cover" alt="Lender" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                                </div>
                            </div>
                            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1">{designer.name}</h4>
                            <p className="text-[12px] text-gray-500 font-medium mb-1 truncate">{item.name}</p>
                            <span className="text-sm font-bold">£{item.price}/day</span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
