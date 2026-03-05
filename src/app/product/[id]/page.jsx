'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share, ShieldCheck, Ruler, Calendar, CheckCircle2, X, MessageCircle, Globe, Wallet, Check, CreditCard, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Mock Data representing a rich product fetch
const PRODUCTS_DB = {
    '1': {
        id: 1,
        designer: 'JACQUEMUS',
        name: 'The Chiquito Long Bag',
        size: 'OS',
        price: 15,
        rrp: 450,
        img: '/1.avif',
        images: ['/1.avif', '/2.avif', '/3.avif'],
        lender: { name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg', rating: '5.0 ★' },
        description: "A signature statement piece. This elongated version of the iconic Chiquito bag in smooth calfskin is perfect for weekend brunches or evening events. Comes with the original dust bag.",
        color: 'Black',
        condition: 'Excellent - Lightly Used',
    },
    '2': {
        id: 2,
        designer: 'SAINT LAURENT',
        name: 'Vintage Silk Slip Dress',
        size: 'UK 8',
        price: 85,
        rrp: 1200,
        img: '/4.avif',
        images: ['/4.avif', '/5.avif', '/6.avif'],
        lender: { name: 'Elena V.', handle: '@vintage_elena', avatar: 'https://i.pravatar.cc/150?u=2', rating: '4.9 ★' },
        description: "An authentic vintage Saint Laurent silk slip dress. Bias cut for a beautifully draped fit. Perfect for weddings or black-tie events.",
        color: 'Champagne',
        condition: 'Vintage - Excellent',
    },
    '3': {
        id: 3,
        designer: 'ARCHIV',
        name: 'Signature Archive Bag',
        size: 'OS',
        price: 35,
        rrp: 1800,
        img: '/bag1.avif',
        images: ['/bag1.avif', '/bag2.avif', '/bag3.avif'],
        lender: { name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg', rating: '5.0 ★' },
        description: "A sculptural masterpiece that blends form and function. This signature archive bag is crafted from premium materials with a focuses on high-fidelity craftsmanship. An essential rotation piece.",
        color: 'Stealth Black',
        condition: 'Excellent',
        category: 'Bags'
    },
    '4': {
        id: 4,
        designer: 'REFORMATION',
        name: 'Floral Midi Dress',
        size: 'UK 12',
        price: 25,
        rrp: 248,
        img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        lender: { name: 'Chloe K.', handle: '@chloek_wardrobe', avatar: 'https://i.pravatar.cc/150?u=4', rating: '4.8 ★' },
        description: "The perfect summer wedding guest dress. Sustainable viscose fabric, thigh slit, and a universally flattering sweetheart neckline.",
        color: 'Blue Floral',
        condition: 'Good',
    },
    '5': {
        id: 5,
        designer: 'ARCHIV',
        name: 'Sculptural Archive Bag',
        size: 'OS',
        price: 42,
        rrp: 2100,
        img: '/bag2-1.avif',
        images: ['/bag2-1.avif', '/bag2-2.avif', '/bag2-3.avif', '/bag2-4.avif', '/bag2-5.avif'],
        lender: { name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg', rating: '5.0 ★' },
        description: "A geometric revolution in leather. This sculptural archive bag features asymmetric lines and internal reinforcements that maintain its striking shape through every rotation.",
        color: 'Ivory / Charcoal',
        condition: 'Mint',
        category: 'Bags'
    },
    '8': {
        id: 8,
        designer: 'ARCHIV',
        name: 'Archive Edition Shoes',
        size: 'UK 6',
        price: 28,
        rrp: 890,
        img: '/shoes1.avif',
        images: ['/shoes1.avif', '/shoes2.avif', '/shoes3.avif'],
        lender: { name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg', rating: '5.0 ★' },
        description: "A statement sole meets archival design. These limited-edition shoes feature hand-finished detailing and a silhouette that bridges heritage craft and modern movement.",
        color: 'Noir',
        condition: 'Mint',
        category: 'Shoes'
    },
    '9': {
        id: 9,
        designer: 'ARCHIV',
        name: 'Archive Leather Coat',
        size: 'UK 10',
        price: 60,
        rrp: 3200,
        img: '/df1a394b-b28c-4796-8637-5bf014e97016.avif',
        images: ['/df1a394b-b28c-4796-8637-5bf014e97016.avif', '/6f44b5c1-e8b7-42af-be3c-06a01a6dc96f.avif', '/98427216-62b8-4b66-8383-3c0b7095be8d.avif'],
        lender: { name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg', rating: '5.0 ★' },
        description: "The centrepiece of any archive. This leather coat is engineered from full-grain hides with a clean-cut silhouette that evolves through every season — structured in the shoulders, fluid through the body.",
        color: 'Deep Brown',
        condition: 'Excellent',
        category: 'Outerwear'
    },
    '14': {
        id: 14,
        designer: 'ARCHIV',
        name: 'Signature Archive Jacket',
        size: 'UK 12',
        price: 45,
        rrp: 1200,
        img: '/Jacket1.avif',
        images: ['/Jacket1.avif', '/jacket2.avif', '/jacket3.avif', '/jacket4.avif', '/jacket5.avif', '/jacket6.avif', '/jacket7.avif', '/jacket8.avif'],
        lender: { name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg', rating: '5.0 ★' },
        description: "A masterwork of engineering and style. This signature archive jacket features waterproof technical fabric, modular pockets, and a silhouette that defines modern high-fidelity fashion. A cornerstone of the Archiv collection.",
        color: 'Onyx Black',
        condition: 'Like New',
        category: 'Outerwear'
    }
};

export default function ProductDetail() {
    const params = useParams();
    const productId = params?.id || '1';

    // In a real app, this would be an SWR or React Query fetch
    const product = PRODUCTS_DB[productId] || PRODUCTS_DB['1'];

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoveredDay, setHoveredDay] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);
    const [showLenderModal, setShowLenderModal] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null); // 'card', 'crypto', or 'credits'
    const [checkoutStep, setCheckoutStep] = useState('selection'); // 'selection', 'details', 'processing', 'success'
    const [userCredits, setUserCredits] = useState(540); // Demo Credits Balance
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Card Form State
    const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
    // Crypto State
    const [walletConnected, setWalletConnected] = useState(false);
    const [isConnectingWallet, setIsConnectingWallet] = useState(false);

    // Image Selection State
    const [activeImage, setActiveImage] = useState(product.images?.[0] || product.img);

    // Update active image when product changes
    useEffect(() => {
        setActiveImage(product.images?.[0] || product.img);
    }, [product]);

    const handleDateClick = (day) => {
        if (!startDate) {
            // First click: Start selection and auto-suggest 3-day minimum
            setStartDate(day);
            const potentialEnd = day + 2;
            setEndDate(potentialEnd <= 30 ? potentialEnd : 30);
        } else {
            if (day === startDate) {
                // Clicking start again: Reset selection
                setStartDate(null);
                setEndDate(null);
            } else if (day < startDate) {
                // Clicking before start: Reset to new start and auto-suggest
                setStartDate(day);
                const potentialEnd = day + 2;
                setEndDate(potentialEnd <= 30 ? potentialEnd : 30);
            } else {
                // Clicking after start: Manually set/extend the end date
                setEndDate(day);
            }
        }
    };

    const isMinimumMet = startDate && endDate && (endDate - startDate + 1) >= 3;
    const duration = startDate && endDate ? endDate - startDate + 1 : 0;

    const handleDateConfirm = () => {
        if (isMinimumMet) {
            setShowCalendar(false);
        }
    };

    const handleRequestBooking = () => {
        setIsSuccess(false);
        setIsProcessing(false);
        setPaymentMethod(null);
        setCheckoutStep('selection');
        setWalletConnected(false);
        setShowPaymentModal(true);
    };

    const handleMethodSelect = (method) => {
        setPaymentMethod(method);
        if (method === 'credits') {
            // Credits skip the details step
            setCheckoutStep('selection');
        } else {
            setCheckoutStep('details');
        }
    };

    const handleConnectWallet = () => {
        setIsConnectingWallet(true);
        setTimeout(() => {
            setIsConnectingWallet(false);
            setWalletConnected(true);
        }, 1500);
    };

    const handleConfirmBooking = () => {
        if (!paymentMethod) return;

        setIsProcessing(true);
        setCheckoutStep('processing');

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setCheckoutStep('success');

            // If using credits, deduct from balance
            if (paymentMethod === 'credits') {
                setUserCredits(prev => prev - (product.price * duration));
            }
        }, 3000);
    };

    const selectedDatesLabel = startDate && endDate
        ? `${startDate}-${endDate} Aug`
        : startDate
            ? `Starts ${startDate} Aug...`
            : 'Select Rental Dates';

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Rent ${product.name} on ARCHIV`,
                url: window.location.href
            }).catch(() => {
                setShowShareToast(true);
                setTimeout(() => setShowShareToast(false), 2000);
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShowShareToast(true);
            setTimeout(() => setShowShareToast(false), 2000);
        }
    };

    return (
        <main className="min-h-screen bg-cream text-charcoal selection:bg-brilliant-rose selection:text-white">
            {/* Minimalist Top Nav */}
            <nav className="fixed top-0 w-full bg-cream/80 backdrop-blur-xl border-b border-gray-100 h-20 flex items-center px-6 lg:px-12 z-50">
                <Link href="/" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back to Archive</span>
                </Link>
                <div className="mx-auto font-bold tracking-tighter text-2xl">ARCHIV</div>
                <div className="flex items-center gap-6">
                    <button className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors">
                        <Globe size={14} /> EN
                    </button>
                    <button className="p-2 bg-white rounded-full border border-charcoal/5 shadow-sm">
                        <Heart size={16} />
                    </button>
                </div>
            </nav>

            <div className="pt-28 px-6 lg:px-12 max-w-[1600px] mx-auto min-h-screen">
                {/* Breadcrumbs */}
                <div className="py-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30">
                    <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
                    <span className="text-charcoal/10">/</span>
                    <Link href="/collections/all" className="hover:text-charcoal transition-colors">{product.category || 'Collection'}</Link>
                    <span className="text-charcoal/10">/</span>
                    <span className="text-charcoal/60">{product.name}</span>
                </div>

                <div className="grid lg:grid-cols-[1fr,480px] gap-12 lg:gap-24 relative pb-24">

                    {/* Left: Imagery */}
                    <div className="flex flex-col gap-6">
                        {/* Main Image View */}
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-3xl shadow-black/[0.1] border border-white relative group cursor-zoom-in"
                        >
                            <img src={activeImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </motion.div>

                        {/* Thumbnail Selector */}
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(image)}
                                        className={cn(
                                            "aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300",
                                            activeImage === image ? "border-brilliant-rose scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={image} alt={`${product.name} thumb ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Mobile Grid View (Scrollable if too many) */}
                        <div className="hidden lg:block space-y-6 pt-12">
                            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20 mb-8 flex items-center gap-4">
                                Full Detail View <div className="h-px flex-1 bg-charcoal/5" />
                            </div>
                            {(product.images || [product.img]).filter(img => img !== activeImage).map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-black/[0.02] border border-white"
                                >
                                    <img src={image} alt={`${product.name} detail ${index + 1}`} className="w-full h-full object-cover" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details & Booking Flow */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col lg:sticky lg:top-32"
                        >
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-charcoal/40 mb-2 block">
                                            {product.designer}
                                        </div>
                                        <h1 className="text-4xl lg:text-5xl font-serif leading-none italic mb-4 tracking-tight">{product.name}</h1>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={handleShare} className="w-10 h-10 rounded-full bg-white border border-charcoal/5 flex items-center justify-center hover:shadow-lg transition-all relative">
                                            <Share size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-sage" />
                                        ))}
                                        <span className="text-[9px] font-black text-charcoal/30 uppercase tracking-[0.2em] ml-2">High Demand Piece</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing and Size */}
                            <div className="py-8 border-y border-charcoal/5 mb-8">
                                <div className="flex items-baseline justify-between mb-8">
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-4xl font-serif italic text-charcoal">£{product.price}<span className="text-xs text-gray-400 not-italic font-medium ml-2 uppercase tracking-widest">/day</span></span>
                                        <span className="text-sm text-gray-300 line-through font-medium">£{product.rrp} RRP</span>
                                    </div>
                                    <div className="px-3 py-1 bg-sage/10 text-sage rounded-full text-[8px] font-black uppercase tracking-widest border border-sage/10">
                                        Verified Authentic
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal">Select Size</span>
                                        <button className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 hover:text-charcoal transition-colors border-b border-charcoal/10 pb-0.5">Size Guide</button>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[product.size, 'UK 10', 'UK 12', 'UK 14'].map((s) => (
                                            <button
                                                key={s}
                                                className={cn(
                                                    "h-12 border rounded-xl text-[10px] font-black uppercase transition-all",
                                                    s === product.size ? "bg-charcoal text-white border-charcoal" : "bg-white border-charcoal/5 text-charcoal/40 hover:border-charcoal hover:text-charcoal"
                                                )}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="space-y-4 mb-10">
                                <button
                                    onClick={() => setShowCalendar(true)}
                                    className={cn(
                                        "w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-between px-8 transition-all duration-700 group",
                                        isMinimumMet ? "bg-white border-2 border-charcoal text-charcoal" : "bg-white border border-charcoal/5 text-charcoal/60 hover:shadow-xl"
                                    )}>
                                    <div className="flex items-center gap-4">
                                        <Calendar size={18} className="text-charcoal/20" />
                                        <span>{selectedDatesLabel}</span>
                                    </div>
                                    <ChevronDown size={14} className="opacity-20 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleRequestBooking}
                                    disabled={!isMinimumMet}
                                    className={cn(
                                        "w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-500 shadow-xl",
                                        isMinimumMet
                                            ? "bg-charcoal text-white hover:bg-brilliant-rose shadow-charcoal/20"
                                            : "bg-charcoal/5 text-charcoal/20 cursor-not-allowed"
                                    )}
                                >
                                    {isMinimumMet ? `Request for £${product.price * duration}` : "Select Rental Dates"}
                                </motion.button>

                                <div className="flex items-center justify-center gap-6 pt-4">
                                    <div className="flex items-center gap-2 opacity-30">
                                        <ShieldCheck size={14} />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal">Secure Cover</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-30">
                                        <Globe size={14} />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-charcoal">Global Shipping</span>
                                    </div>
                                </div>
                            </div>

                            {/* Information Items */}
                            <div className="border-t border-charcoal/5 pt-8 space-y-8">
                                {/* Accordion Style Details */}
                                <div className="group cursor-default">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal">The Details</h4>
                                        <div className="h-px flex-1 bg-charcoal/5 mx-6" />
                                    </div>
                                    <p className="text-sm text-gray-400 leading-relaxed font-serif italic mb-6">
                                        {product.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/60 rounded-xl border border-white">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/20 block mb-1">Color</span>
                                            <span className="text-xs font-serif italic text-charcoal">{product.color}</span>
                                        </div>
                                        <div className="p-4 bg-white/60 rounded-xl border border-white">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/20 block mb-1">Condition</span>
                                            <span className="text-xs font-serif italic text-charcoal">{product.condition}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="group cursor-default pt-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-charcoal">Meet the Lender</h4>
                                        <div className="h-px flex-1 bg-charcoal/5 mx-6" />
                                    </div>
                                    <div
                                        onClick={() => setShowLenderModal(true)}
                                        className="p-5 rounded-2xl border border-white bg-white/80 flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-charcoal/5">
                                                <img src={product.lender.avatar} className="w-full h-full object-cover" alt={product.lender.name} />
                                            </div>
                                            <div>
                                                <div className="font-serif italic text-lg leading-tight">{product.lender.handle}</div>
                                                <div className="text-[8px] font-black text-sage uppercase tracking-widest flex items-center gap-1">
                                                    <CheckCircle2 size={10} /> Verified Expert
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronDown size={14} className="-rotate-90 text-charcoal/20" />
                                    </div>
                                </div>

                                {/* Trust badges like checkout */}
                                <div className="pt-8">
                                    <div className="p-6 rounded-3xl bg-charcoal text-cream relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                            <ShieldCheck size={48} />
                                        </div>
                                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-brilliant-rose">Archiv Protection</h5>
                                        <p className="text-[11px] font-serif italic text-cream/60 leading-relaxed max-w-[80%]">
                                            Your peace of mind is our priority. Every rental includes premium dry cleaning and damage protection.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Product Suggestions marquee / grid */}
                <div className="py-32 border-t border-charcoal/5 mt-24">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-brilliant-rose font-black text-[9px] uppercase tracking-[0.4em] block mb-4">You May Also Like</span>
                            <h3 className="text-5xl font-serif leading-none italic tracking-tight">Expand the Archive.</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Real Suggestions */}
                        {Object.values(PRODUCTS_DB).filter(p => p.id !== product.id).slice(0, 4).map(suggestion => (
                            <Link key={suggestion.id} href={`/product/${suggestion.id}`} className="group cursor-pointer">
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white mb-6 relative shadow-sm border border-charcoal/5">
                                    <img
                                        src={suggestion.img}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        alt={suggestion.name}
                                    />
                                    <div className="absolute top-4 right-4 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                        <Heart size={14} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-charcoal">{suggestion.designer}</div>
                                    <div className="text-sm font-serif italic text-charcoal/60 truncate">{suggestion.name}</div>
                                    <div className="pt-2 text-xs font-black">£{suggestion.price}/day</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Lender Profile Modal */}
                <AnimatePresence>
                    {showLenderModal && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-charcoal/40 backdrop-blur-md"
                                onClick={() => setShowLenderModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-cream w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl p-12 text-center border border-white"
                            >
                                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-8 border-4 border-white shadow-xl">
                                    <img src={product.lender.avatar} className="w-full h-full object-cover" alt={product.lender.name} />
                                </div>
                                <h3 className="text-3xl font-serif italic mb-2 tracking-tighter">{product.lender.name}</h3>
                                <p className="text-brilliant-rose font-black text-[10px] uppercase tracking-[0.4em] mb-10">{product.lender.handle}</p>

                                <div className="grid grid-cols-3 gap-0 mb-10 border-y border-charcoal/5 py-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-serif italic">120+</div>
                                        <div className="text-[8px] font-black text-charcoal/30 uppercase tracking-[0.2em] mt-2">Rentals</div>
                                    </div>
                                    <div className="text-center border-x border-charcoal/5">
                                        <div className="text-2xl font-serif italic">100%</div>
                                        <div className="text-[8px] font-black text-charcoal/30 uppercase tracking-[0.2em] mt-2">Trust</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-serif italic">5.0 ★</div>
                                        <div className="text-[8px] font-black text-charcoal/30 uppercase tracking-[0.2em] mt-2">Rating</div>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-400 font-serif italic leading-relaxed mb-10 px-4">
                                    "I love sharing my archive with the community. These pieces deserve to be explored."
                                </p>

                                <Link
                                    href={`/lender/${product.lender.handle}`}
                                    className="w-full h-16 bg-charcoal text-cream rounded-full font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center hover:bg-brilliant-rose transition-all duration-700 shadow-xl shadow-black/10"
                                >
                                    Enter Wardrobe
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Payment Modal */}
                <AnimatePresence>
                    {showPaymentModal && (
                        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 lg:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-charcoal/40 backdrop-blur-[20px]"
                                onClick={() => checkoutStep !== 'processing' && checkoutStep !== 'success' && setShowPaymentModal(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                                className="relative bg-[#F8F7F2]/90 w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] border border-white/50 min-h-[700px] flex flex-col"
                            >
                                <AnimatePresence mode="wait">
                                    {checkoutStep === 'selection' && (
                                        <motion.div
                                            key="selection"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="p-16 flex-1 flex flex-col"
                                        >
                                            <div className="text-center mb-16">
                                                <div className="inline-flex items-center gap-3 mb-8 py-2.5 px-6 rounded-full border border-charcoal/5 bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-md">
                                                    <div className="flex gap-1">
                                                        <span className="w-1 h-1 rounded-full bg-charcoal/20" />
                                                        <span className="w-1 h-1 rounded-full bg-charcoal/40" />
                                                        <span className="w-1 h-1 rounded-full bg-brilliant-rose animate-pulse" />
                                                    </div>
                                                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-charcoal/40">Secure Settlement</span>
                                                </div>
                                                <h3 className="text-5xl font-serif italic mb-3 tracking-tighter text-charcoal">Confirm Booking</h3>
                                                <div className="h-[1px] w-12 bg-brilliant-rose/30 mx-auto" />
                                            </div>

                                            <div className="space-y-5">
                                                {[
                                                    { id: 'card', title: 'Credit / Debit', sub: 'Visa, Amex, Mastercard', icon: <CreditCard size={24} />, color: 'charcoal' },
                                                    { id: 'crypto', title: 'Crypto Pay', sub: 'ETH, SOL, USDC', icon: <Globe size={24} />, color: 'brilliant-rose' },
                                                    { id: 'credits', title: 'Free Credits', sub: `Balance: £${userCredits}`, icon: <Wallet size={24} />, color: 'sage', badge: 'Loyalty' }
                                                ].map((method) => (
                                                    <button
                                                        key={method.id}
                                                        disabled={method.id === 'credits' && userCredits < (product.price * duration)}
                                                        onClick={() => handleMethodSelect(method.id)}
                                                        className={cn(
                                                            "w-full p-8 rounded-[3rem] border-2 transition-all duration-500 flex items-center justify-between group relative overflow-hidden",
                                                            paymentMethod === method.id
                                                                ? "bg-white border-charcoal shadow-[0_20px_48px_-12px_rgba(0,0,0,0.1)] scale-[1.02]"
                                                                : "bg-white/40 border-transparent hover:bg-white/60 hover:border-charcoal/5",
                                                            (method.id === 'credits' && userCredits < (product.price * duration)) && "opacity-40 grayscale cursor-not-allowed"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-8">
                                                            <div className={cn(
                                                                "w-16 h-16 rounded-[1.75rem] flex items-center justify-center transition-all duration-500",
                                                                paymentMethod === method.id ? `bg-${method.color} text-white` : `bg-${method.color}/5 text-${method.color}`
                                                            )}>
                                                                {method.icon}
                                                            </div>
                                                            <div className="text-left">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-xl font-serif italic text-charcoal">{method.title}</span>
                                                                    {method.badge && (
                                                                        <span className="text-[8px] font-black uppercase tracking-widest bg-sage/10 text-sage px-2 py-0.5 rounded-full">New</span>
                                                                    )}
                                                                </div>
                                                                <div className="text-[10px] font-bold text-charcoal/20 uppercase tracking-widest mt-1.5">{method.sub}</div>
                                                            </div>
                                                        </div>
                                                        <div className={cn(
                                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500",
                                                            paymentMethod === method.id ? "bg-charcoal border-charcoal" : "border-charcoal/5"
                                                        )}>
                                                            {paymentMethod === method.id && <Check size={14} className="text-white" />}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="mt-auto pt-12">
                                                <div className="flex justify-between items-center mb-8 px-8">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">Total Settlement</span>
                                                    <span className="text-3xl font-serif italic text-charcoal tracking-tight">£{product.price * duration}</span>
                                                </div>
                                                <button
                                                    disabled={!paymentMethod}
                                                    onClick={() => paymentMethod === 'credits' ? handleConfirmBooking() : setCheckoutStep('details')}
                                                    className={cn(
                                                        "w-full h-24 rounded-full font-black text-xs uppercase tracking-[0.5em] transition-all duration-700 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.15)]",
                                                        paymentMethod
                                                            ? "bg-charcoal text-white hover:bg-brilliant-rose hover:shadow-brilliant-rose/20 active:scale-[0.98]"
                                                            : "bg-charcoal/5 text-charcoal/20 cursor-not-allowed"
                                                    )}
                                                >
                                                    Proceed to Payment
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {checkoutStep === 'details' && paymentMethod === 'card' && (
                                        <motion.div
                                            key="card-details"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="p-16 flex-1 flex flex-col"
                                        >
                                            <button onClick={() => setCheckoutStep('selection')} className="self-start flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/30 mb-12 hover:text-charcoal transition-colors group">
                                                <div className="p-2 rounded-full border border-charcoal/5 group-hover:bg-charcoal group-hover:text-white transition-all shadow-sm">
                                                    <ArrowLeft size={14} />
                                                </div>
                                                Change Method
                                            </button>

                                            {/* Virtual Card Preview */}
                                            <div className="relative h-56 w-full mb-12 group perspective-1000">
                                                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between overflow-hidden">
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-brilliant-rose/10 rounded-full -ml-24 -mb-24 blur-3xl" />

                                                    <div className="flex justify-between items-start relative z-10">
                                                        <div className="w-12 h-10 bg-white/10 rounded-md backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                                            <div className="w-8 h-6 bg-gradient-to-r from-yellow-500/80 to-yellow-600/80 rounded-[3px]" />
                                                        </div>
                                                        <div className="flex gap-1.5 opacity-60">
                                                            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                                                            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                                        </div>
                                                    </div>

                                                    <div className="relative z-10">
                                                        <div className="text-2xl font-serif text-white tracking-[0.2em] mb-6 min-h-[1.5em] leading-none">
                                                            {cardDetails.number || "•••• •••• •••• ••••"}
                                                        </div>
                                                        <div className="flex justify-between items-end">
                                                            <div>
                                                                <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Card Holder</div>
                                                                <div className="text-xs font-black uppercase text-white tracking-widest min-h-[1em]">
                                                                    {cardDetails.name || "YOUR NAME"}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">Expires</div>
                                                                <div className="text-xs font-black text-white tracking-widest">
                                                                    {cardDetails.expiry || "MM/YY"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        maxLength="19"
                                                        placeholder="CARD NUMBER"
                                                        value={cardDetails.number}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                                                            setCardDetails({ ...cardDetails, number: val });
                                                        }}
                                                        className="w-full h-20 bg-white border border-charcoal/5 rounded-[1.5rem] px-8 text-xs font-black tracking-[0.3em] focus:outline-none focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all shadow-sm"
                                                    />
                                                    <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-1 items-center opacity-20">
                                                        <CreditCard size={18} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="text"
                                                        maxLength="5"
                                                        placeholder="MM / YY"
                                                        value={cardDetails.expiry}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim();
                                                            setCardDetails({ ...cardDetails, expiry: val });
                                                        }}
                                                        className="w-full h-20 bg-white border border-charcoal/5 rounded-[1.5rem] px-8 text-xs font-black tracking-[0.3em] focus:outline-none focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all shadow-sm"
                                                    />
                                                    <input
                                                        type="password"
                                                        maxLength="4"
                                                        placeholder="CVC"
                                                        className="w-full h-20 bg-white border border-charcoal/5 rounded-[1.5rem] px-8 text-xs font-black tracking-[0.3em] focus:outline-none focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all shadow-sm"
                                                    />
                                                </div>

                                                <input
                                                    type="text"
                                                    placeholder="CARDHOLDER NAME"
                                                    value={cardDetails.name}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                                                    className="w-full h-20 bg-white border border-charcoal/5 rounded-[1.5rem] px-8 text-xs font-black tracking-[0.3em] uppercase focus:outline-none focus:border-charcoal focus:ring-4 focus:ring-charcoal/5 transition-all shadow-sm"
                                                />
                                            </div>

                                            <button
                                                onClick={handleConfirmBooking}
                                                disabled={!cardDetails.number || !cardDetails.expiry || cardDetails.number.length < 16}
                                                className="w-full h-24 bg-charcoal text-white rounded-full mt-auto font-black text-xs uppercase tracking-[0.5em] hover:bg-brilliant-rose disabled:opacity-20 disabled:grayscale transition-all duration-700 shadow-xl"
                                            >
                                                Complete Settlement
                                            </button>
                                        </motion.div>
                                    )}

                                    {checkoutStep === 'details' && paymentMethod === 'crypto' && (
                                        <motion.div
                                            key="crypto-details"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="p-16 flex-1 flex flex-col items-center text-center"
                                        >
                                            <button onClick={() => setCheckoutStep('selection')} className="self-start flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/30 mb-8 hover:text-charcoal transition-colors group">
                                                <div className="p-2 rounded-full border border-charcoal/5 group-hover:bg-charcoal group-hover:text-white transition-all shadow-sm">
                                                    <ArrowLeft size={14} />
                                                </div>
                                                Change Method
                                            </button>

                                            <div className="w-32 h-32 rounded-[3.5rem] bg-white shadow-2xl flex items-center justify-center text-charcoal mb-10 relative group border border-charcoal/5">
                                                <Globe size={48} className="group-hover:scale-110 transition-transform duration-500" />
                                                <motion.div
                                                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0, 0.1] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="absolute -inset-4 rounded-full border border-charcoal -z-10"
                                                />
                                            </div>

                                            <h3 className="text-4xl font-serif italic mb-4 tracking-tighter text-charcoal">Web3 Authentication</h3>
                                            <p className="text-charcoal/40 text-sm font-medium mb-12 max-w-xs leading-relaxed">
                                                Authorize this archival acquisition through your decentralized vault.
                                            </p>

                                            {!walletConnected ? (
                                                <div className="w-full space-y-4">
                                                    {[
                                                        {
                                                            name: 'MetaMask',
                                                            icon: (
                                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M28.7 4.1L17.5 14.2l-2.5-6.6-2.7 10.8-6.5-2.3-3.6 2.3 13.5 19.2 2.1-8.6 2.1 8.6 13.5-19.2-5.1 3.7-6.5 2.3-2.7-10.8-2.5 6.6L4.4 4.1" fill="#E2761B" stroke="#E2761B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            ),
                                                            bg: 'orange'
                                                        },
                                                        {
                                                            name: 'Phantom',
                                                            icon: (
                                                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 21c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" fill="#AB9FF2" />
                                                                    <circle cx="16" cy="18" r="2" fill="white" />
                                                                </svg>
                                                            ),
                                                            bg: 'indigo'
                                                        },
                                                        {
                                                            name: 'WalletConnect',
                                                            icon: <Globe size={24} className="text-blue-500" />,
                                                            bg: 'blue'
                                                        }
                                                    ].map((wallet) => (
                                                        <button
                                                            key={wallet.name}
                                                            onClick={handleConnectWallet}
                                                            disabled={isConnectingWallet}
                                                            className="w-full h-24 bg-white border-2 border-transparent hover:border-charcoal hover:shadow-xl rounded-[2.5rem] px-8 flex items-center justify-between group transition-all duration-500"
                                                        >
                                                            <div className="flex items-center gap-6">
                                                                <div className="w-14 h-14 rounded-2xl bg-off-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                    {typeof wallet.icon === 'string' ? (
                                                                        <img src={wallet.icon} className="w-8 h-8 object-contain" alt={wallet.name} />
                                                                    ) : wallet.icon}
                                                                </div>
                                                                <span className="font-serif italic text-2xl text-charcoal">{wallet.name}</span>
                                                            </div>
                                                            {isConnectingWallet ? (
                                                                <div className="w-5 h-5 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <div className="w-10 h-10 rounded-full border border-charcoal/5 flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all shadow-sm">
                                                                    <ArrowLeft style={{ transform: 'rotate(180deg)' }} size={16} />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="w-full mt-auto"
                                                >
                                                    <div className="p-8 rounded-[3rem] bg-white shadow-xl border border-sage/20 flex items-center justify-between mb-12">
                                                        <div className="flex items-center gap-6 text-left">
                                                            <div className="w-14 h-14 rounded-full bg-sage text-white flex items-center justify-center scale-110 shadow-lg shadow-sage/20">
                                                                <Check size={28} />
                                                            </div>
                                                            <div>
                                                                <div className="text-[10px] font-black text-sage uppercase tracking-[0.3em] mb-1">Vault Linked</div>
                                                                <div className="text-xl font-serif italic text-charcoal">0x71C...492E</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleConfirmBooking}
                                                        className="w-full h-24 bg-charcoal text-white rounded-full font-black text-xs uppercase tracking-[0.5em] shadow-[0_20px_48px_rgba(0,0,0,0.1)] hover:bg-brilliant-rose transition-all duration-700"
                                                    >
                                                        Authorize Extraction
                                                    </button>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    )}

                                    {checkoutStep === 'processing' && (
                                        <motion.div
                                            key="processing"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex-1 flex flex-col items-center justify-center p-20 text-center"
                                        >
                                            <div className="relative w-48 h-48 mb-16">
                                                <svg className="w-full h-full p-2" viewBox="0 0 100 100">
                                                    <motion.circle
                                                        cx="50" cy="50" r="46"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        fill="none"
                                                        className="text-charcoal/5"
                                                    />
                                                    <motion.circle
                                                        cx="50" cy="50" r="46"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        fill="none"
                                                        strokeDasharray="290"
                                                        strokeLinecap="round"
                                                        className="text-brilliant-rose"
                                                        initial={{ strokeDashoffset: 290 }}
                                                        animate={{ strokeDashoffset: [290, 0, -290] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        <h1 className="text-2xl font-black tracking-tighter text-charcoal/10">ARCHIV</h1>
                                                    </motion.div>
                                                </div>
                                            </div>
                                            <h3 className="text-4xl font-serif italic mb-4 text-charcoal">Processing Settlement</h3>
                                            <div className="flex items-center gap-3 justify-center">
                                                <span className="w-1.5 h-1.5 bg-brilliant-rose rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <span className="w-1.5 h-1.5 bg-brilliant-rose rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <span className="w-1.5 h-1.5 bg-brilliant-rose rounded-full animate-bounce" />
                                            </div>
                                            <p className="mt-12 text-charcoal/30 text-[9px] font-black uppercase tracking-[0.5em]">Synchronizing Ledger Assets...</p>
                                        </motion.div>
                                    )}

                                    {checkoutStep === 'success' && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-20 text-center flex-1 flex flex-col items-center justify-center"
                                        >
                                            <div className="w-40 h-40 rounded-full bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] text-sage flex items-center justify-center mb-16 relative group border border-sage/5">
                                                <div className="p-8 rounded-full bg-sage/5 border border-sage/10 group-hover:scale-110 transition-transform duration-700">
                                                    <CheckCircle2 size={72} strokeWidth={1} />
                                                </div>
                                                <motion.div
                                                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                    className="absolute inset-0 rounded-full border-2 border-sage"
                                                />
                                            </div>

                                            <h3 className="text-6xl font-serif italic mb-6 tracking-tighter text-charcoal">Acquisition Secured</h3>
                                            <p className="text-charcoal/40 text-xl font-serif italic mb-16 max-w-sm leading-relaxed">
                                                Transitioning the {product.designer} piece to your private collection.
                                            </p>

                                            <div className="w-full space-y-3 mb-16 px-8">
                                                {[
                                                    { label: 'Reference', value: `#${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
                                                    { label: 'Status', value: 'Verified', color: 'text-sage' },
                                                    { label: 'Settlement', value: `£${product.price * duration}` }
                                                ].map((item) => (
                                                    <div key={item.label} className="flex justify-between items-center py-4 border-b border-charcoal/5 last:border-0 hover:bg-black/[0.01] transition-colors rounded-xl px-4">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20">{item.label}</span>
                                                        <span className={cn("text-xs font-black uppercase tracking-widest text-charcoal", item.color)}>{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => setShowPaymentModal(false)}
                                                className="w-full h-24 bg-charcoal text-white rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-black active:scale-[0.98] transition-all shadow-2xl"
                                            >
                                                Return to Archive
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Date Selection Modal */}
                <AnimatePresence>
                    {showCalendar && (
                        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-charcoal/30 backdrop-blur-md"
                                onClick={() => setShowCalendar(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-cream w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl p-10 border border-white"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <h5 className="text-3xl font-serif italic mb-1 tracking-tighter">Select Dates</h5>
                                        <p className="text-[9px] text-charcoal/30 font-black uppercase tracking-[0.3em] mt-1">3 Days Minimum</p>
                                    </div>
                                    <button onClick={() => setShowCalendar(false)} className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:shadow-xl transition-all">
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="mb-10 flex justify-between items-center py-5 px-8 bg-charcoal rounded-[2rem] shadow-xl shadow-black/10">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-cream/30 uppercase tracking-[0.4em] mb-1 leading-none">Archival Window</span>
                                        <span className="text-[14px] font-serif italic text-cream leading-none">{startDate ? `${startDate} Aug` : '-'} — {endDate ? `${endDate} Aug` : '-'}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[8px] font-black text-cream/30 uppercase tracking-[0.4em] mb-1 leading-none">Days</span>
                                        <span className={cn("text-[14px] font-serif italic", isMinimumMet ? "text-brilliant-rose" : "text-white")}>{duration}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-1 text-center mb-10">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                                        <span key={`${d}-${i}`} className="text-[9px] font-black text-charcoal/20 mb-3">{d}</span>
                                    ))}
                                    {[...Array(30)].map((_, i) => {
                                        const day = i + 1;
                                        const isSelected = (startDate && day === startDate) || (endDate && day === endDate);

                                        // Range calculations
                                        const isExactEdge = isSelected;
                                        const isMiddle = startDate && endDate && day > startDate && day < endDate;

                                        // Hover Logic
                                        const isHoverPreview = startDate && !endDate && hoveredDay && (
                                            (day > startDate && day <= hoveredDay) || (day < startDate && day >= hoveredDay)
                                        );

                                        const isFirstDay = startDate && day === startDate;
                                        const isLastDay = endDate && day === endDate;

                                        return (
                                            <button
                                                key={i}
                                                onClick={() => handleDateClick(day)}
                                                onMouseEnter={() => setHoveredDay(day)}
                                                onMouseLeave={() => setHoveredDay(null)}
                                                className={cn(
                                                    "h-10 text-[11px] font-black transition-all relative flex items-center justify-center",
                                                    isSelected ? "z-20 scale-100" : "z-10",
                                                    (isMiddle || isHoverPreview) && "bg-white/60 text-charcoal"
                                                )}
                                            >
                                                <span className={cn(
                                                    "w-8 h-8 flex items-center justify-center transition-all duration-500 rounded-full",
                                                    isSelected ? "bg-charcoal text-cream shadow-lg" :
                                                        isMiddle || isHoverPreview ? "bg-white text-brilliant-rose" :
                                                            "hover:bg-white text-charcoal/80"
                                                )}>
                                                    {day}
                                                </span>

                                                {/* Connecting range visualization */}
                                                {isMiddle && (
                                                    <div className="absolute inset-y-2 inset-x-0 bg-white/40 -z-10" />
                                                )}
                                                {isFirstDay && endDate && (
                                                    <div className="absolute inset-y-2 right-0 left-1/2 bg-white/40 -z-10" />
                                                )}
                                                {isLastDay && (
                                                    <div className="absolute inset-y-2 left-0 right-1/2 bg-white/40 -z-10" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={handleDateConfirm}
                                    disabled={!isMinimumMet}
                                    className={cn(
                                        "w-full h-16 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all duration-700 flex items-center justify-center shadow-xl",
                                        isMinimumMet ? "bg-charcoal text-cream hover:bg-brilliant-rose shadow-black/5" : "bg-white text-charcoal/20 cursor-not-allowed border border-charcoal/5"
                                    )}
                                >
                                    {startDate && endDate && !isMinimumMet ? 'Min. 3 Days Required' : 'Archive Selection'}
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
