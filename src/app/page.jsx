'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Search,
    Heart,
    User,
    ChevronDown,
    ArrowRight,
    Menu,
    X,
    MessageCircle,
    MessageSquare,
    Globe,
    CheckCircle2,
    Instagram,
    Facebook,
    Twitter,
    QrCode,
    Apple,
    Smartphone,
    Send
} from 'lucide-react';
import { Navbar, Footer, AnnouncementBar, AppPopup, CookiePopup, SearchModal } from '../components/layout/SharedComponents';

const XIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
    </svg>
);

const Pinterest = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.622 0 11.988-5.365 11.988-11.988C23.987 5.367 18.622 0 12.017 0z" />
    </svg>
);
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

import Link from 'next/link';

// --- Mock Data ---

const OCCASIONS = [
    { name: 'Trending', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=400&auto=format&fit=crop' },
    { name: 'Weekend', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=400&auto=format&fit=crop' },
    { name: 'Black Tie', img: 'https://images.unsplash.com/photo-1588117260148-b47818741c74?q=80&w=400&auto=format&fit=crop' },
    { name: 'Bridal', img: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=400&auto=format&fit=crop' },
    { name: 'Sun & Beach', img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=400&auto=format&fit=crop' },
    { name: 'Going Out', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop' },
    { name: 'Cultural', img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=400&auto=format&fit=crop' },
    { name: 'Birthday', img: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=400&auto=format&fit=crop' },
    { name: 'Modest', img: 'https://images.unsplash.com/photo-1609902726285-00668009f004?q=80&w=400&auto=format&fit=crop' },
    { name: 'Ski', img: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=400&auto=format&fit=crop' },
    { name: 'Vintage', img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=400&auto=format&fit=crop' },
];

const DESIGNERS = ['Aje', 'Alaia', 'Bottega Veneta', 'Chanel', 'Jacquemus', 'Loewe', 'Reformation', 'Zimmermann'];

const PRODUCTS = [
    {
        id: 1,
        designer: 'JACQUEMUS',
        name: 'La Robe Saudade Dress',
        size: 'UK 8',
        price: 55,
        rrp: 620,
        img: '/1.avif',
        images: ['/1.avif', '/2.avif', '/3.avif'],
        lender: '/Foued.jpg',
        tag: 'Top Lender',
        category: 'Dresses'
    },
    {
        id: 2,
        designer: 'SAINT LAURENT',
        name: 'Vintage Silk Slip Dress',
        size: 'UK 8',
        price: 85,
        rrp: 1200,
        img: '/4.avif',
        images: ['/4.avif', '/5.avif', '/6.avif'],
        lender: 'https://i.pravatar.cc/150?u=2',
        tag: 'Trending',
        category: 'Dresses'
    },
    {
        id: 3,
        designer: 'ARCHIV',
        name: 'Signature Archive Bag',
        size: 'OS',
        price: 35,
        rrp: 1800,
        img: '/bag1.avif',
        images: ['/bag1.avif', '/bag2.avif', '/bag3.avif'],
        lender: '/Foued.jpg',
        tag: 'New Arrival',
        category: 'Bags'
    },
    {
        id: 4,
        designer: 'ZIMMERMANN',
        name: 'Matchmaker Lace Dress',
        size: 'UK 10',
        price: 48,
        rrp: 595,
        img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
        lender: '/Foued.jpg',
        tag: 'Top Lender',
        category: 'Dresses'
    },
    {
        id: 5,
        designer: 'ARCHIV',
        name: 'Sculptural Archive Bag',
        size: 'OS',
        price: 42,
        rrp: 2100,
        img: '/bag2-1.avif',
        images: ['/bag2-1.avif', '/bag2-2.avif', '/bag2-3.avif', '/bag2-4.avif', '/bag2-5.avif'],
        lender: '/Foued.jpg',
        tag: 'Trending',
        category: 'Bags'
    },
    {
        id: 6,
        designer: 'REFORMATION',
        name: 'Karina Mini Dress',
        size: 'UK 12',
        price: 28,
        rrp: 268,
        img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=6',
        tag: 'New Arrival',
        category: 'Dresses'
    },
    {
        id: 7,
        designer: 'ALAIA',
        name: 'Knit Bodycon Dress',
        size: 'UK 8',
        price: 95,
        rrp: 1450,
        img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=7',
        tag: 'Top Lender',
        category: 'Dresses'
    },
    {
        id: 8,
        designer: 'ARCHIV',
        name: 'Archive Edition Shoes',
        size: 'UK 6',
        price: 28,
        rrp: 890,
        img: '/shoes1.avif',
        images: ['/shoes1.avif', '/shoes2.avif', '/shoes3.avif'],
        lender: '/Foued.jpg',
        tag: 'Trending',
        category: 'Shoes'
    },
    {
        id: 9,
        designer: 'ARCHIV',
        name: 'Archive Leather Coat',
        size: 'UK 10',
        price: 60,
        rrp: 3200,
        img: '/df1a394b-b28c-4796-8637-5bf014e97016.avif',
        images: ['/df1a394b-b28c-4796-8637-5bf014e97016.avif', '/6f44b5c1-e8b7-42af-be3c-06a01a6dc96f.avif', '/98427216-62b8-4b66-8383-3c0b7095be8d.avif'],
        lender: '/Foued.jpg',
        tag: 'Rare Find',
        category: 'Outerwear'
    },
    {
        id: 10,
        designer: 'AJE',
        name: 'Contour Midi Dress',
        size: 'UK 10',
        price: 38,
        rrp: 420,
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=10',
        category: 'Dresses'
    },
    {
        id: 11,
        designer: 'GANNI',
        name: 'Seersucker Minidress',
        size: 'UK 8',
        price: 22,
        rrp: 215,
        img: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=11',
        tag: 'New Arrival',
        category: 'Dresses'
    },
    {
        id: 12,
        designer: 'GUCCI',
        name: 'Horsebit 1955 Shoulder Bag',
        size: 'OS',
        price: 58,
        rrp: 1550,
        img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=12',
        tag: 'Trending',
        category: 'Bags'
    },
    {
        id: 13,
        designer: 'JACQUEMUS',
        name: 'La Bomba Shirt Dress',
        size: 'UK 10',
        price: 45,
        rrp: 480,
        img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=13',
        category: 'Dresses'
    },
    {
        id: 14,
        designer: 'ARCHIV',
        name: 'Signature Archive Jacket',
        size: 'UK 12',
        price: 45,
        rrp: 1200,
        img: '/Jacket1.avif',
        images: ['/Jacket1.avif', '/jacket2.avif', '/jacket3.avif', '/jacket4.avif', '/jacket5.avif', '/jacket6.avif', '/jacket7.avif', '/jacket8.avif'],
        lender: '/Foued.jpg',
        tag: 'Top Lender',
        category: 'Outerwear'
    },
    {
        id: 15,
        designer: 'VIVIENNE WESTWOOD',
        name: 'Orb Pearl Necklace',
        size: 'OS',
        price: 18,
        rrp: 320,
        img: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=15',
        tag: 'Trending',
        category: 'Accessories'
    },
    {
        id: 16,
        designer: 'ROTATE',
        name: 'Birger Christensen Mini Dress',
        size: 'UK 8',
        price: 35,
        rrp: 290,
        img: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=800&auto=format&fit=crop',
        lender: 'https://i.pravatar.cc/150?u=16',
        tag: 'New Arrival',
        category: 'Dresses'
    },
];

const TOP_LENDERS = [
    {
        handle: '@sarahstyle',
        name: 'Sarah M.',
        rating: '5.0',
        rentals: 210,
        specialty: 'Designer Bags',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
        topItems: ['/bag1.avif', '/bag2.avif', '/bag3.avif'],
        joined: '2023'
    },
    {
        handle: '@archive_queen',
        name: 'Isabelle R.',
        rating: '4.9',
        rentals: 185,
        specialty: 'Evening Wear',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1200&auto=format&fit=crop',
        topItems: ['/1.avif', '/4.avif', '/6.avif'],
        joined: '2022'
    },
    {
        handle: '@minimalist_luxe',
        name: 'Priya K.',
        rating: '5.0',
        rentals: 310,
        specialty: 'Occasionwear',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop',
        topItems: ['/2.avif', '/5.avif', '/bag2-1.avif'],
        joined: '2021'
    },
    {
        handle: '@fashionlover',
        name: 'Emma T.',
        rating: '4.8',
        rentals: 142,
        specialty: 'Vintage Finds',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop',
        topItems: ['/shoes1.avif', '/Jacket1.avif', '/1.avif'],
        joined: '2023'
    },
    {
        handle: '@luxe_closet',
        name: 'Amara D.',
        rating: '4.9',
        rentals: 98,
        specialty: 'Bridal & Formal',
        avatar: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        topItems: ['/4.avif', '/bag1.avif', '/5.avif'],
        joined: '2024'
    },
];


const DESIGNER_CARDS = [
    { name: 'Jacquemus', slug: 'jacquemus', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop', items: '340+', size: 'large', color: '#F7E7CE' },
    { name: 'Alaia', slug: 'alaia', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop', items: '120+', size: 'medium', color: '#1A1A1A' },
    { name: 'Bottega Veneta', slug: 'bottega-veneta', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop', items: '210+', size: 'medium', color: '#004A26' },
    { name: 'Chanel', slug: 'chanel', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop', items: '95+', size: 'tall', color: '#000000' },
    { name: 'Loewe', slug: 'loewe', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', items: '180+', size: 'medium', color: '#7B3F00' },
    { name: 'Reformation', slug: 'reformation', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop', items: '260+', size: 'large', color: '#E5D3B3' },
    { name: 'Zimmermann', slug: 'zimmermann', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop', items: '195+', size: 'tall', color: '#B08D57' },
    { name: 'Aje', slug: 'aje', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop', items: '150+', size: 'medium', color: '#F5F5F5' },
];

// --- Components ---



const Hero = () => {
    return (
        <section className="relative px-6 lg:px-12 py-20 lg:py-32 bg-white overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brilliant-rose/5 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sage/5 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/3" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10 w-full">
                <div className="lg:col-span-6">
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1 }}
                        className="h-[1px] w-24 bg-brilliant-rose mb-12 origin-left"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[clamp(4rem,8vw,8rem)] leading-[0.85] text-charcoal font-serif mb-12 tracking-[-0.04em] relative"
                    >
                        Design <br />
                        <span className="italic text-charcoal/20">The Future</span> <br />
                        Of Fashion.
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-xl text-gray-400 mb-16 max-w-md font-serif italic leading-relaxed">
                            Access the world’s most coveted archives. Rent, rotate, and monetize your wardrobe with high-fidelity circularity.
                        </p>

                        <div className="flex flex-wrap gap-8 items-center">
                            <Link href="/collections/all" className="group relative h-20 px-12 bg-charcoal text-white rounded-full font-black text-xs uppercase tracking-[0.3em] overflow-hidden flex items-center justify-center shadow-2xl hover:bg-brilliant-rose transition-all duration-700">
                                <span className="relative z-10">Start Your Rotation</span>
                                <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-white/10 transition-all duration-700" />
                            </Link>

                            <div className="flex items-center gap-6">
                                <div className="h-12 w-[1px] bg-gray-100" />
                                <div>
                                    <div className="text-2xl font-serif italic text-charcoal">£2.4M+</div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">Community Revenue</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-6 relative">
                    <div className="grid grid-cols-2 gap-6 h-[720px] relative">
                        {/* Main Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[3rem] overflow-hidden shadow-2xl h-[90%] self-end group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                                alt="Editorial 01"
                            />
                        </motion.div>

                        {/* Secondary Image */}
                        <motion.div
                            initial={{ opacity: 0, y: -60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="rounded-[3rem] overflow-hidden shadow-2xl h-[90%] self-start relative group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                alt="Editorial 02"
                            />
                            <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 group-hover:bg-white group-hover:scale-105 transition-all duration-700">
                                <div className="text-white group-hover:text-charcoal text-xs font-black uppercase tracking-widest mb-1 opacity-80">Protocol</div>
                                <div className="text-white group-hover:text-charcoal text-2xl font-serif italic font-black leading-none uppercase tracking-tighter">Verified</div>
                            </div>
                        </motion.div>

                        {/* Floating Micro-Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-50 flex items-center gap-6 min-w-[320px] hover:-translate-y-2 transition-transform cursor-default"
                        >
                            <div className="w-16 h-16 rounded-full bg-sage flex items-center justify-center text-white shadow-lg">
                                <Globe size={28} />
                            </div>
                            <div>
                                <div className="text-2xl font-serif italic font-black text-charcoal">120k+</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Active Archives Rotating</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-20 -right-20 text-[200px] font-serif italic text-charcoal/[0.02] pointer-events-none select-none -z-10">
                        SS26
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({ product }) => {
    return (
        <div className="group block relative">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-gray-100 mb-4 transition-all duration-500 transform border border-gray-50">
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                </Link>

                {/* Overlay Controls - Not nested in Link */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button className="p-2 bg-white rounded-full shadow-sm hover:scale-110 hover:bg-brilliant-rose hover:text-white transition-all">
                        <Heart size={16} strokeWidth={1.5} />
                    </button>
                    <Link href="/messages" className="p-2 bg-white rounded-full shadow-sm hover:scale-110 hover:bg-brilliant-rose hover:text-white transition-all">
                        <MessageCircle size={16} strokeWidth={1.5} />
                    </Link>
                </div>

                {product.tag && (
                    <div className="absolute top-4 left-4 h-6 px-3 bg-white/90 backdrop-blur rounded-full flex items-center shadow-sm z-10 pointer-events-none">
                        <span className="text-[9px] font-black uppercase tracking-tighter text-black">{product.tag}</span>
                    </div>
                )}

                <Link
                    href={`/lender/${product.id}`}
                    className="absolute -bottom-1 -right-1 w-10 h-10 p-0.5 bg-white rounded-full shadow-md z-20 transition-transform duration-300 group-hover:scale-110"
                >
                    <img src={product.lender} className="w-full h-full rounded-full object-cover" alt="Lender" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </Link>
            </div>

            <Link href={`/product/${product.id}`} className="space-y-1 pr-4 block">
                <h4 className="text-[13px] font-black tracking-tight text-charcoal uppercase">{product.designer}</h4>
                <p className="text-[12px] text-gray-500 font-medium truncate">{product.name}, {product.size}</p>
                <div className="pt-2 flex items-baseline gap-3">
                    <span className="text-sm font-bold text-charcoal">Rent from £{product.price}/day</span>
                    <span className="text-[11px] text-gray-400 line-through font-medium">RRP £{product.rrp}</span>
                </div>
            </Link>
        </div>
    );
};

const DashboardCTA = () => {
    return (
        <section className="py-24 px-6 lg:px-12 bg-charcoal overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brilliant-rose/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sage/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left: Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brilliant-rose/30 bg-brilliant-rose/5 text-brilliant-rose mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brilliant-rose opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brilliant-rose"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Circular Economy</span>
                        </div>

                        <h2 className="text-white text-5xl lg:text-7xl font-serif leading-[1] mb-8">
                            Join the <br />
                            <span className="italic text-white/40">Revolution.</span>
                        </h2>

                        <p className="text-white/60 text-lg font-medium leading-relaxed mb-12 max-w-lg">
                            Ditch the buy-wear-waste cycle. ARCHIV empowers you to monetize your wardrobe while accessing the world's most coveted archives.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: 'Lend & Earn', desc: 'Monetize your high-end pieces. Our lenders earn an average of £450/month by sharing their archives.' },
                                { title: 'Rent & Access', desc: 'Secure the season\'s best for a fraction of RRP. 120,000+ items available for instant rotation.' },
                                { title: 'Pure Circulation', desc: 'Use your rental earnings directly to fund your next checkout. No withdrawals, just pure style flow.' }
                            ].map((pillar, i) => (
                                <div key={pillar.title} className="flex gap-6 group">
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brilliant-rose group-hover:border-brilliant-rose transition-all duration-500">
                                        <span className="text-white text-xs font-black italic">0{i + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-2">{pillar.title}</h4>
                                        <p className="text-white/40 text-[13px] leading-relaxed max-w-sm">{pillar.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 flex flex-wrap gap-6 items-center">
                            <Link href="/collections/all" className="h-16 px-10 bg-white text-black font-black text-xs uppercase tracking-widest rounded-md hover:bg-brilliant-rose hover:text-white transition-all shadow-2xl flex items-center">
                                Start Your Rotation
                            </Link>
                            <div className="flex items-center gap-4 text-white/40">
                                <div className="h-10 w-px bg-white/10 hidden sm:block" />
                                <div className="flex flex-col">
                                    <span className="text-white font-black text-lg">£2.4M+</span>
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Community Revenue</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Immersive Visual */}
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden relative shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1200&auto=format&fit=crop"
                                className="w-full h-full object-cover saturate-0 hover:saturate-100 transition-all duration-1000"
                                alt="Shared Wardrobe"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                            {/* Stats Overlay */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-400" />
                                            <span className="text-white font-bold text-[10px] uppercase tracking-widest">Live Rotation Protocol</span>
                                        </div>
                                        <Globe size={16} className="text-white/40" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <div className="text-white text-2xl font-serif italic font-black">21,432</div>
                                            <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-1">Active Deliveries</div>
                                        </div>
                                        <div>
                                            <div className="text-white text-2xl font-serif italic font-black">99.8%</div>
                                            <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mt-1">Circulation Rate</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-10 -right-10 bg-white p-6 rounded-2xl shadow-2xl hidden xl:block animate-bounce-slow">
                            <div className="text-black font-black text-2xl leading-none italic mb-1">Save 85%</div>
                            <div className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Off Retail Price</div>
                        </div>
                        <div className="absolute top-1/2 -left-12 bg-brilliant-rose p-6 rounded-2xl shadow-2xl hidden xl:block">
                            <div className="text-white font-black text-2xl leading-none italic mb-1">6 tons</div>
                            <div className="text-white/60 text-[9px] font-bold uppercase tracking-widest">Carbon Offset monthly</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Page Export ---

export default function HighFidelityHome() {
    const [scrolled, setScrolled] = useState(false);
    const [showAppPopup, setShowAppPopup] = useState(false);
    const [showCookiePopup, setShowCookiePopup] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Items');
    const [activeCurator, setActiveCurator] = useState(0);

    // Parallax values for Section 03
    const { scrollYProgress } = useScroll();
    const bgTextX = useTransform(scrollYProgress, [0.3, 0.6], ["20%", "-20%"]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        // Persistent Cookie Consent
        const hasConsented = localStorage.getItem('archiv-cookie-consent');
        if (!hasConsented) {
            setShowCookiePopup(true);
        }

        // Keyboard shortcut: Cmd/Ctrl+K to open search
        const handleKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
            if (e.key === 'Escape') {
                setShowSearch(false);
                setShowAppPopup(false);
            }
        };
        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKey);
        };
    }, []);

    return (
        <main className="min-h-screen bg-cream selection:bg-brilliant-rose selection:text-white pb-20 lg:pb-0 text-charcoal">
            <AnimatePresence>
                {showAppPopup && <AppPopup onClose={() => setShowAppPopup(false)} />}
                {showCookiePopup && <CookiePopup onAccept={() => setShowCookiePopup(false)} />}
                {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
            </AnimatePresence>

            <AnnouncementBar onShowPopup={() => setShowAppPopup(true)} />
            <Navbar onSearch={() => setShowSearch(true)} />

            {/* Hero */}
            <Hero />

            {/* Social Proof editorial Marquee - Redesigned for High-End Feel */}
            <div id="how-it-works" className="relative w-full py-10 bg-off-white/30 border-y border-gray-100/50 overflow-hidden scroll-mt-24">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:block">
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-gray-300 vertical-text whitespace-nowrap">Featured In</span>
                </div>

                <div className="flex gap-16 lg:gap-32 items-center">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: '-50%' }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex gap-16 lg:gap-32 items-center flex-nowrap whitespace-nowrap"
                    >
                        {/* Double the array for seamless infinite scroll */}
                        {[...['VOGUE', 'ELLE', 'BAZAAR', 'NY TIMES', 'FORBES', 'WWD', 'DAZED', 'GRAZIA'], ...['VOGUE', 'ELLE', 'BAZAAR', 'NY TIMES', 'FORBES', 'WWD', 'DAZED', 'GRAZIA']].map((press, i) => (
                            <span
                                key={i}
                                className="font-black text-xl lg:text-4xl tracking-tighter opacity-20 hover:opacity-100 hover:text-brilliant-rose transition-all duration-700 cursor-default select-none group"
                            >
                                {press}
                            </span>
                        ))}
                    </motion.div>
                </div>

                <style jsx>{`
                    .vertical-text {
                        writing-mode: vertical-rl;
                        transform: rotate(180deg);
                    }
                `}</style>
            </div>

            {/* Rent by Occasion */}
            <section id="collections" className="pt-24 pb-12 px-6 lg:px-12 overflow-hidden scroll-mt-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[11px] font-black uppercase text-gray-300 tracking-[0.4em] mb-4 block italic">Protocol 01 // Categorization</span>
                        <h3 className="text-4xl font-serif text-black">Rent by Occasion</h3>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 border border-gray-100 rounded-full hover:border-black transition-all">
                            <ArrowRight size={20} className="rotate-180" />
                        </button>
                        <button className="p-3 border border-gray-100 rounded-full hover:border-black transition-all">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8">
                    {OCCASIONS.map((occ) => (
                        <Link href={`/collections/${occ.name.toLowerCase().replace(/\s+/g, '-')}`} key={occ.name} className="flex-shrink-0 group cursor-pointer block">
                            <div className="w-32 h-32 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2 border-transparent group-hover:border-brilliant-rose p-1 transition-all duration-500">
                                <img src={occ.img} className="w-full h-full rounded-full object-cover saturate-[0.8] group-hover:saturate-100 transition-all duration-700" alt={occ.name} />
                            </div>
                            <p className="text-center mt-6 text-xs font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-colors">{occ.name}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Redesigned The Current Rotation */}
            <section className="pt-32 pb-32 px-6 lg:px-12 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="h-1 w-20 bg-brilliant-rose mb-8 origin-left"
                            />
                            <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Archive Feed // Curated</span>
                            <h3 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter">
                                The Current <br />
                                <span className="italic">Rotation.</span>
                            </h3>
                        </div>

                        {/* Functional Filter Bar */}
                        <div className="flex flex-wrap gap-2 lg:gap-3 bg-off-white/50 p-2 rounded-full border border-gray-100">
                            {['All Items', 'Dresses', 'Bags', 'Outerwear', 'Accessories'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={cn(
                                        "px-6 lg:px-8 h-12 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500",
                                        selectedCategory === cat
                                            ? "bg-black text-white shadow-xl shadow-black/20"
                                            : "text-gray-400 hover:text-black hover:bg-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
                    >
                        <AnimatePresence mode="popLayout">
                            {PRODUCTS
                                .filter(p => selectedCategory === 'All Items' || p.category === selectedCategory)
                                .map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))
                            }
                        </AnimatePresence>
                    </motion.div>

                    <div className="mt-32 text-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Link href="/collections/all" className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b-2 border-black pb-4 hover:border-brilliant-rose hover:text-brilliant-rose transition-all">
                                View Entire Archive Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trending Designers Grid — editorial card layout */}
            <section id="trending-designers" className="py-32 px-6 lg:px-12 bg-off-white scroll-mt-20 relative overflow-hidden">
                {/* Decorative background text */}
                <motion.div
                    style={{ x: bgTextX }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-serif italic text-charcoal/[0.03] whitespace-nowrap pointer-events-none select-none z-0"
                >
                    ARCHIVE DESIGN COLLECTION — CURATED BY THE LOOP
                </motion.div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-brilliant-rose font-black text-[10px] uppercase tracking-[0.4em] block mb-4">Protocol 03 // Selection</span>
                            <h3 className="text-6xl lg:text-8xl font-serif leading-[0.85] tracking-tighter">
                                Trending <br />
                                <span className="italic">Labels.</span>
                            </h3>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="max-w-xs"
                        >
                            <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                                The most coveted designers in our shared wardrobe. Curated by the community, authenticated by us.
                            </p>
                            <div className="h-[1px] w-24 bg-black/10 mb-6" />
                            <Link href="/collections/all" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:text-brilliant-rose transition-colors">
                                Explore All Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[250px]">
                        {DESIGNER_CARDS.map((d, i) => (
                            <motion.div
                                key={d.slug}
                                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "relative group cursor-pointer overflow-hidden rounded-[2rem]",
                                    d.size === 'large' ? "md:col-span-6 md:row-span-2" :
                                        d.size === 'tall' ? "md:col-span-3 md:row-span-2" :
                                            "md:col-span-3 md:row-span-1"
                                )}
                            >
                                <Link href={`/designer/${d.slug}`} className="block h-full w-full relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700 z-10" />
                                    <img
                                        src={d.img}
                                        alt={d.name}
                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                    />

                                    {/* Glassmorphism Badge */}
                                    <div className="absolute top-6 right-6 z-20">
                                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{d.items} items</span>
                                        </div>
                                    </div>

                                    {/* Content Info */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                                        <div className="overflow-hidden mb-2">
                                            <motion.div
                                                initial={{ y: "100%" }}
                                                whileInView={{ y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                                className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]"
                                            >
                                                Rank 0{i + 1} // Archive
                                            </motion.div>
                                        </div>
                                        <div className="flex items-end justify-between">
                                            <h4 className="text-white text-3xl font-serif italic font-black leading-none group-hover:text-brilliant-rose transition-colors duration-300">
                                                {d.name}
                                            </h4>
                                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                <ArrowRight size={20} className="text-white -rotate-45" />
                                            </div>
                                        </div>

                                        {/* Dynamic Bar */}
                                        <div className="mt-6 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-brilliant-rose to-transparent transition-all duration-1000 ease-out" />
                                    </div>

                                    {/* Aura */}
                                    <div
                                        className="absolute -inset-2 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-1000 pointer-events-none"
                                        style={{ backgroundColor: d.color }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Refined Sustainability Section — High-Contrast Premium Dark Sage */}
            <section className="relative py-24 lg:py-40 bg-charcoal overflow-hidden group/sustainability">
                {/* Deep Atmospheric Glows */}
                <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-sage/10 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sage/5 rounded-full blur-[140px] -translate-x-1/2 translate-y-1/2 opacity-40" />

                {/* Refined Grid Pattern — Subtle technical layer */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '48px 48px' }}
                />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-3 mb-12 py-2.5 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sage"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Protocol 02 // Circularity</span>
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-6xl lg:text-9xl font-serif text-white leading-[0.85] mb-12 tracking-tighter"
                            >
                                Conscious <br />
                                <span className="italic text-sage/30">Circulation.</span>
                            </motion.h2>

                            <blockquote className="text-white/60 text-xl lg:text-3xl font-serif italic leading-relaxed mb-16 relative">
                                <span className="absolute -top-14 -left-14 text-sage/5 text-[220px] font-serif select-none pointer-events-none">&ldquo;</span>
                                &ldquo;Our mission is to prove that luxury and circularity are not just compatible, but essential partners in the future of fashion. Every rotation is a vote for the planet.&rdquo;
                            </blockquote>

                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl">
                                        <img src="/Foued.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Foued Mensi" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-sage rounded-full border-4 border-charcoal flex items-center justify-center shadow-sm">
                                        <CheckCircle2 size={10} className="text-charcoal" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-white font-black text-sm uppercase tracking-widest">Foued Mensi</div>
                                    <div className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Founder & CEO // ARCHIV Protcol</div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-6 md:gap-8">
                                {[
                                    { val: '6.4 tons', label: 'Carbon Offset', icon: Globe },
                                    { val: '120k+', label: 'Items Saved', icon: Heart },
                                    { val: '98%', label: 'Loop Efficiency', icon: CheckCircle2 },
                                    { val: '2026', label: 'Net Zero Goal', icon: ArrowRight }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1 * i }}
                                        className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 group/card hover:bg-white/10 transition-all duration-700 hover:-translate-y-2"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="text-3xl font-serif italic font-black text-sage group-hover/card:text-white transition-colors duration-500">
                                                {stat.val}
                                            </div>
                                            <stat.icon size={16} className="text-white/20 group-hover/card:text-sage transition-colors duration-500" />
                                        </div>
                                        <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] group-hover/card:text-white/50 transition-colors">
                                            {stat.label}
                                        </div>
                                        <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-sage/20 to-transparent group-hover/card:from-sage transition-all duration-700" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Center Ambient Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sage/10 rounded-full blur-[100px] pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Archive Icons — Premium Community Leaderboard */}
            <section className="py-40 px-6 lg:px-12 bg-[#FAF9F6] relative overflow-hidden group/leaderboard">
                {/* Background Textures */}
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brilliant-rose/5 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2 opacity-60" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sage/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header: More Direct Leaderboard Style */}
                    <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12 border-b border-charcoal/5 pb-16">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="h-px w-24 bg-brilliant-rose mb-8 origin-left"
                            />
                            <h3 className="text-7xl lg:text-9xl font-serif tracking-tighter leading-[0.8] text-charcoal">
                                Archive <br />
                                <span className="italic text-charcoal/20">Leaderboard.</span>
                            </h3>
                        </div>
                        <div className="max-w-sm lg:text-right">
                            <p className="text-charcoal/40 text-[13px] font-black uppercase tracking-[0.4em] mb-4 italic">Community Choice // Protocol 05</p>
                            <p className="text-gray-400 text-sm font-medium leading-relaxed font-serif italic mb-8">
                                Meet the stewards of high-fidelity circularity. Rated by the community, authenticated by ARCHIV.
                            </p>
                            <Link href="/collections/all" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-charcoal hover:text-brilliant-rose transition-all duration-500 group/link">
                                View Full Rankings <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Leaderboard List — High-End Styled Table */}
                    <div className="space-y-4">
                        {/* Table Header (Hidden on Mobile) */}
                        <div className="hidden lg:grid grid-cols-12 px-12 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">
                            <div className="col-span-1">Rank</div>
                            <div className="col-span-4">Curator // Icon</div>
                            <div className="col-span-2 text-center">Specialty</div>
                            <div className="col-span-2 text-center">Archive Size</div>
                            <div className="col-span-2 text-center">Market Trust</div>
                            <div className="col-span-1 text-right">View</div>
                        </div>

                        {/* Leaderboard Rows */}
                        {TOP_LENDERS.map((lender, i) => (
                            <motion.div
                                key={lender.handle}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link
                                    href={`/lender/${lender.handle.replace('@', '')}`}
                                    className={cn(
                                        "group block relative bg-white/40 border border-charcoal/5 backdrop-blur-sm rounded-[2rem] lg:rounded-full overflow-hidden transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-charcoal/5 hover:-translate-y-1",
                                        i === 0 ? "border-brilliant-rose/20 bg-white/80" : ""
                                    )}
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center px-8 lg:px-12 py-6 lg:py-4 gap-6 lg:gap-0">
                                        {/* Rank Number */}
                                        <div className="col-span-1 flex items-center justify-center lg:justify-start">
                                            <span className={cn(
                                                "text-4xl lg:text-5xl font-serif italic font-black leading-none",
                                                i === 0 ? "text-brilliant-rose" : "text-charcoal/10 group-hover:text-charcoal transition-colors duration-500"
                                            )}>
                                                0{i + 1}
                                            </span>
                                        </div>

                                        {/* Curator Info */}
                                        <div className="col-span-1 lg:col-span-4 flex items-center gap-6 lg:gap-8 justify-center lg:justify-start">
                                            <div className="relative flex-shrink-0">
                                                <div className={cn(
                                                    "w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 p-1 overflow-hidden transition-all duration-700",
                                                    i === 0 ? "border-brilliant-rose" : "border-charcoal/5 group-hover:border-charcoal"
                                                )}>
                                                    <img
                                                        src={lender.avatar}
                                                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                        alt={lender.name}
                                                    />
                                                </div>
                                                {i === 0 && (
                                                    <div className="absolute -bottom-1 -right-1 bg-brilliant-rose text-white p-1.5 rounded-full shadow-lg">
                                                        <CheckCircle2 size={12} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-center lg:text-left">
                                                <h4 className="text-xl lg:text-2xl font-serif italic font-black text-charcoal group-hover:text-brilliant-rose transition-colors">{lender.name}</h4>
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mt-1 block">{lender.handle}</span>
                                            </div>
                                        </div>

                                        {/* Specialty (Desktop) */}
                                        <div className="hidden lg:flex col-span-2 justify-center">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{lender.specialty}</span>
                                        </div>

                                        {/* Archive Size / Rentals */}
                                        <div className="col-span-1 lg:col-span-2 flex lg:flex-col items-center justify-between lg:justify-center gap-4 lg:gap-1 text-center border-t lg:border-t-0 border-charcoal/5 pt-6 lg:pt-0">
                                            <span className="lg:hidden text-[9px] font-bold text-gray-300 uppercase tracking-widest">Archive Size</span>
                                            <div className="text-2xl lg:text-3xl font-serif italic font-black text-charcoal">
                                                {lender.rentals + (i * 24)}+
                                            </div>
                                            <span className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-gray-300">Total Items Curated</span>
                                        </div>

                                        {/* Market Trust / Rating */}
                                        <div className="col-span-1 lg:col-span-2 flex lg:flex-col items-center justify-between lg:justify-center gap-4 lg:gap-1 text-center">
                                            <span className="lg:hidden text-[9px] font-bold text-gray-300 uppercase tracking-widest">Market Trust</span>
                                            <div className="flex items-center gap-2">
                                                <div className="text-2xl lg:text-3xl font-serif italic font-black text-brilliant-rose">{lender.rating}</div>
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <div key={star} className={cn(
                                                            "w-1 h-3 lg:w-1.5 lg:h-5 rounded-full",
                                                            star <= Math.floor(lender.rating) ? "bg-brilliant-rose" : "bg-charcoal/5"
                                                        )} />
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-gray-300">Community Score</span>
                                        </div>

                                        {/* Action Icon */}
                                        <div className="col-span-1 flex justify-center lg:justify-end">
                                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-charcoal/5 flex items-center justify-center text-charcoal/20 group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all duration-500">
                                                <ArrowRight size={22} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Subtle Ambient Hover Bar */}
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brilliant-rose to-transparent transition-all duration-1000 group-hover:w-full" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA for the Leaderboard */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-24 pt-16 border-t border-charcoal/5 flex flex-col md:flex-row items-center justify-between gap-12"
                    >
                        <div className="flex items-center gap-8">
                            <div className="flex -space-x-4">
                                {TOP_LENDERS.slice(0, 3).map((l, i) => (
                                    <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg shadow-black/5">
                                        <img src={l.avatar} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Curator" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-lg font-serif italic font-black text-charcoal tracking-tight leading-none mb-1">Join 12,432 curators.</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Monetize your archive starting today.</div>
                            </div>
                        </div>
                        <Link href="/lend" className="h-16 px-12 bg-charcoal text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center hover:bg-brilliant-rose transition-all duration-500 shadow-2xl">
                            Start Lending Your Closet
                        </Link>
                    </motion.div>
                </div>

                {/* Vertical Decorative Marquee — Softer for the Leaderboard */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-full overflow-hidden pointer-events-none select-none opacity-5 hidden xl:block">
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: '-50%' }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="text-[12rem] font-black uppercase tracking-tighter vertical-text whitespace-nowrap leading-none py-10"
                    >
                        THE ARCHIV INDEX • CURATED PROTOCOLS • GLOBAL RANKINGS • THE ARCHIV INDEX • CURATED PROTOCOLS •
                    </motion.div>
                </div>

                <style jsx>{`
                    .vertical-text {
                        writing-mode: vertical-rl;
                        transform: rotate(180deg);
                    }
                `}</style>
            </section>









            {/* Dashboard CTA */}
            <DashboardCTA />

            {/* Redesigned Premium Editorial Footer */}
            <footer className="bg-cream pt-32 pb-12 px-6 lg:px-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    {/* Top Section: Brand & Subscription */}
                    <div className="grid lg:grid-cols-12 gap-16 mb-32 items-start">
                        <div className="lg:col-span-5 space-y-12">
                            <h2 className="text-7xl lg:text-9xl font-serif tracking-tighter text-charcoal leading-[0.8]">
                                ARCHIV <br />
                                <span className="italic text-charcoal/20">Archive.</span>
                            </h2>
                            <p className="text-lg text-gray-400 font-medium leading-relaxed max-w-sm">
                                Curating the world&apos;s most coveted wardrobes for a sustainable, circular future in fashion.
                            </p>

                            {/* App Download Badges (Softer style) */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button onClick={() => setShowAppPopup(true)} className="group flex items-center gap-4 bg-charcoal text-cream px-8 py-4 rounded-full hover:bg-brilliant-rose transition-all duration-500 shadow-xl shadow-black/10">
                                    <Apple size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">iOS Store</span>
                                </button>
                                <button onClick={() => setShowAppPopup(true)} className="group flex items-center gap-4 border border-charcoal/10 px-8 py-4 rounded-full hover:border-charcoal transition-all duration-500">
                                    <Smartphone size={20} className="text-charcoal" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal">Android</span>
                                </button>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            {/* Empty spacer for editorial layout */}
                        </div>

                        <div className="lg:col-span-4 space-y-10">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/40 block">Inside The Loop</span>
                                <h4 className="text-3xl font-serif italic text-charcoal leading-tight">
                                    Subscribe for early access & seasonal curation.
                                </h4>
                            </div>

                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-transparent border-b-2 border-charcoal/10 py-6 text-xl font-serif italic focus:outline-none focus:border-brilliant-rose transition-all placeholder:text-gray-200"
                                />
                                <button className="absolute right-0 bottom-6 text-charcoal hover:text-brilliant-rose transition-colors">
                                    <ArrowRight size={24} />
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                By joining, you agree to our <Link href="#" className="text-charcoal underline underline-offset-4">Privacy Policy</Link>. No noise, just style.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 pb-32 border-b border-gray-100/50">
                        {[
                            {
                                title: 'Curation',
                                links: [
                                    { name: 'How It Works', path: '/support/how-it-works' },
                                    { name: 'All Designers', path: '/collections/all' },
                                    { name: 'Trending Items', path: '/collections/all' },
                                    { name: 'Vintage Archives', path: '/collections/all' }
                                ]
                            },
                            {
                                title: 'Lending',
                                links: [
                                    { name: 'Lend Your Closet', path: '/lend' },
                                    { name: 'Lender Benefits', path: '/support/how-it-works' },
                                    { name: 'Seller Protection', path: '/support/faq' },
                                    { name: 'Logistics', path: '/support/shipping-returns' }
                                ]
                            },
                            {
                                title: 'Company',
                                links: [
                                    { name: 'The Vision', path: '/company/vision' },
                                    { name: 'Careers', path: '/company/careers' },
                                    { name: 'Sustainability', path: '/company/sustainability' },
                                    { name: 'Press & Media', path: '/company/press' }
                                ]
                            },
                            {
                                title: 'Dialogue',
                                links: [
                                    { name: 'Instagram', path: 'https://instagram.com/z.0day' },
                                    { name: 'X', path: 'https://x.com/z.0day' },
                                    { name: 'Pinterest', path: 'https://pinterest.com/z.0day' },
                                    { name: 'Contact Support', path: '/support/contact' },
                                    { name: 'FAQ Hub', path: '/support/faq' }
                                ]
                            },
                            {
                                title: 'Legal',
                                links: [
                                    { name: 'Terms of Service', path: '/support/terms-of-service' },
                                    { name: 'Privacy Policy', path: '/support/privacy-policy' },
                                    { name: 'Cookie Policy', path: '/support/cookie-policy' },
                                    { name: 'Accessibility', path: '#' }
                                ]
                            },
                        ].map((section) => (
                            <div key={section.title} className="space-y-8">
                                <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal">{section.title}</h5>
                                <ul className="space-y-4">
                                    {section.links.map(link => (
                                        <li key={link.name}>
                                            <Link href={link.path} className="text-[13px] text-gray-400 font-bold hover:text-charcoal transition-all inline-block group">
                                                {link.name}
                                                <span className="block h-[1px] w-0 bg-brilliant-rose transition-all group-hover:w-full mt-1" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">
                            <span>© 2026 ARCHIV — REVOLUTIONIZING FASHION CONSUMPTION.</span>
                            <span className="hidden md:block opacity-20 text-charcoal">/</span>
                            <Link href="https://github.com/z3mz" className="group flex items-center gap-2 hover:text-charcoal transition-colors">
                                <span>HANDCRAFTED WITH SOUL BY</span>
                                <span className="font-serif italic lowercase tracking-tight text-lg group-hover:text-brilliant-rose transition-colors -mt-1 underline underline-offset-4 decoration-current/10 group-hover:decoration-brilliant-rose/30">z3mz</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-10">
                            <a href="https://instagram.com/z.0day" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                                <div className="p-2 rounded-full border border-gray-100 group-hover:border-charcoal transition-all">
                                    <Instagram size={14} className="text-gray-400 group-hover:text-charcoal transition-colors" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 group-hover:text-charcoal transition-colors">IG</span>
                            </a>
                            <a href="https://x.com/z.0day" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                                <div className="p-2 rounded-full border border-gray-100 group-hover:border-charcoal transition-all">
                                    <XIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-charcoal transition-colors" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 group-hover:text-charcoal transition-colors">X</span>
                            </a>
                            <a href="https://pinterest.com/z.0day" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                                <div className="p-2 rounded-full border border-gray-100 group-hover:border-charcoal transition-all">
                                    <Pinterest size={14} className="text-gray-400 group-hover:text-charcoal transition-colors" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 group-hover:text-charcoal transition-colors">PIN</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Chat Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-24 right-8 z-[100] hidden lg:block"
            >
                <Link href="/messages" className="w-16 h-16 bg-charcoal text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-brilliant-rose hover:scale-110 transition-all group relative border-4 border-white">
                    <MessageSquare size={24} />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-brilliant-rose text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">2</div>
                </Link>
            </motion.div>

            {/* Mobile Bottom Tab Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] h-20 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around px-4 lg:hidden">
                <Link href="/" className="flex flex-col items-center gap-1 text-black">
                    <Search size={22} strokeWidth={2.5} />
                </Link>
                <Link href="/collections/all" className="flex flex-col items-center gap-1 text-gray-400">
                    <Heart size={22} strokeWidth={2.5} />
                </Link>
                <div className="flex flex-col items-center justify-center p-3 bg-black text-white rounded-full shadow-lg -mt-10 border-4 border-white">
                    <QrCode size={24} />
                </div>
                <Link href="/messages" className="flex flex-col items-center gap-1 text-gray-400 relative">
                    <MessageCircle size={22} strokeWidth={2.5} />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brilliant-rose rounded-full border-2 border-white" />
                </Link>
                <Link href="/auth/sign-in" className="flex flex-col items-center gap-1 text-gray-400">
                    <User size={22} strokeWidth={2.5} />
                </Link>
            </div>
            {/* Modals & Overlays */}
            <AnimatePresence>
                {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
                {showAppPopup && <AppPopup onClose={() => setShowAppPopup(false)} />}
                {showCookiePopup && <CookiePopup onAccept={() => setShowCookiePopup(false)} />}
            </AnimatePresence>
        </main>
    );
}
