'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Heart, Menu, MessageCircle, User, SlidersHorizontal } from 'lucide-react';
import { useParams } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Reuse the ProductCard Component locally for the feed
const ProductCard = ({ product }) => {
    return (
        <Link href={`/product/${product.id}`} className="group cursor-pointer block">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-gray-100 mb-4 transition-all duration-500 transform border border-gray-50">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Heart size={16} strokeWidth={1.5} />
                </div>
                {product.tag && (
                    <div className="absolute top-4 left-4 h-6 px-3 bg-white/90 backdrop-blur rounded-full flex items-center shadow-sm">
                        <span className="text-[9px] font-black uppercase tracking-tighter text-black">{product.tag}</span>
                    </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-10 h-10 p-0.5 bg-white rounded-full shadow-md z-10 transition-transform duration-300 group-hover:scale-110">
                    <img src={product.lender} className="w-full h-full rounded-full object-cover" alt="Lender" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </div>
            </div>

            <div className="space-y-1 pr-4">
                <h4 className="text-[13px] font-black tracking-tight text-gray-900 uppercase">{product.designer}</h4>
                <p className="text-[12px] text-gray-500 font-medium truncate">{product.name}, {product.size}</p>
                <div className="pt-2 flex items-baseline gap-3">
                    <span className="text-sm font-bold text-black">Rent from £{product.price}/day</span>
                    <span className="text-[11px] text-gray-400 line-through font-medium">RRP £{product.rrp}</span>
                </div>
            </div>
        </Link>
    );
};

// Mock product data for the collection feed
const COLLECTION_PRODUCTS = [
    { id: 1, designer: 'JACQUEMUS', name: 'La Robe Saudade', size: 'UK 8', price: 55, rrp: 620, tag: 'Trending', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, designer: 'SAINT LAURENT', name: 'Silk Slip Dress', size: 'UK 8', price: 85, rrp: 1200, tag: 'Top Lender', img: 'https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, designer: 'BOTTEGA VENETA', name: 'Cassette Bag', size: 'OS', price: 65, rrp: 2200, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, designer: 'ZIMMERMANN', name: 'Matchmaker Lace Dress', size: 'UK 10', price: 48, rrp: 595, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, designer: 'PRADA', name: 'Re-Edition Nylon Bag', size: 'OS', price: 40, rrp: 1800, tag: 'Trending', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=5' },
    { id: 6, designer: 'REFORMATION', name: 'Karina Mini Dress', size: 'UK 12', price: 28, rrp: 268, img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=6' },
    { id: 7, designer: 'ALAIA', name: 'Knit Bodycon Dress', size: 'UK 8', price: 95, rrp: 1450, tag: 'Top Lender', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=7' },
    { id: 8, designer: 'LOEWE', name: 'Puzzle Small Bag', size: 'OS', price: 75, rrp: 2650, tag: 'Top Lender', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=8' },
    { id: 9, designer: 'CHANEL', name: 'Classic Double Flap Bag', size: 'OS', price: 120, rrp: 8500, tag: 'Rare Find', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=9' },
    { id: 10, designer: 'AJE', name: 'Contour Midi Dress', size: 'UK 10', price: 38, rrp: 420, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=10' },
    { id: 11, designer: 'GANNI', name: 'Seersucker Minidress', size: 'UK 8', price: 22, rrp: 215, img: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=11' },
    { id: 12, designer: 'GUCCI', name: 'Horsebit 1955 Bag', size: 'OS', price: 58, rrp: 1550, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop', lender: 'https://i.pravatar.cc/150?u=12' },
];

export default function CollectionPage() {
    const params = useParams();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Format the URL parameter (e.g., 'going-out' -> 'Going Out')
    const categorySlug = params?.category || 'all';
    const rawName = categorySlug.replace(/-/g, ' ');
    const collectionName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    return (
        <main className="min-h-screen bg-white pb-24 lg:pb-0">
            {/* Navbar (Minimalist state) */}
            <nav className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                scrolled ? "bg-white/80 backdrop-blur-xl border-gray-100 h-16" : "bg-white border-transparent h-20"
            )}>
                <div className="h-full px-6 lg:px-12 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-bold hover:text-brilliant-rose transition-colors">
                        <ArrowLeft size={16} /> Home
                    </Link>
                    <Link href="/" className="text-xl font-black tracking-tighter">ARCHIV</Link>
                    <div className="flex items-center gap-6">
                        <Search size={20} strokeWidth={2} className="cursor-pointer hover:text-brilliant-rose transition-colors" />
                        <Heart size={20} strokeWidth={2} className="cursor-pointer hover:text-brilliant-rose transition-colors hidden lg:block" />
                    </div>
                </div>
            </nav>

            {/* Collection Header */}
            <header className="pt-32 pb-16 px-6 lg:px-12 bg-off-white mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-brilliant-rose font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">The Curated Edit</span>
                        <h1 className="text-5xl lg:text-7xl font-serif text-black leading-tight mb-6 capitalize">{collectionName}</h1>
                        <p className="text-gray-500 max-w-xl mx-auto font-medium">
                            Discover our community-sourced selection of pieces perfectly suited for your {rawName} occasions. Rent it, wear it, rotate it.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Filters Toolbar */}
            <div className="px-6 lg:px-12 mb-8 sticky top-16 z-40 bg-white/95 backdrop-blur py-4 border-b border-gray-50 flex items-center justify-between">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{COLLECTION_PRODUCTS.length} Items Found</div>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 h-10 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest hover:border-black transition-colors">
                        <span>Filter</span>
                        <SlidersHorizontal size={14} />
                    </button>
                    <select className="px-4 h-10 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest appearance-none bg-transparent cursor-pointer hover:border-black transition-colors focus:outline-none hidden md:block">
                        <option>Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {/* Product Feed Grid */}
            <section className="px-6 lg:px-12 max-w-[1800px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-12 lg:gap-x-8">
                    {COLLECTION_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Mobile Bottom Tab Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-[100] h-20 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around px-4 lg:hidden">
                <button className="flex flex-col items-center gap-1 text-black">
                    <div className="w-10 h-1 rounded-full bg-brilliant-rose mb-1" />
                    <Search size={22} strokeWidth={2.5} />
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-300">
                    <Heart size={22} strokeWidth={2.5} />
                </button>
                <Link href="/" className="flex flex-col items-center justify-center p-3 bg-black text-white rounded-full shadow-lg -mt-10 border-4 border-white">
                    <Menu size={24} />
                </Link>
                <button className="flex flex-col items-center gap-1 text-gray-300">
                    <MessageCircle size={22} strokeWidth={2.5} />
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-300">
                    <User size={22} strokeWidth={2.5} />
                </button>
            </div>
        </main>
    );
}
