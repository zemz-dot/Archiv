'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MessageCircle, Star, ShieldCheck, MapPin, Grid, Heart, X, Settings, Share2, Camera, Play, Plus, Copy, Check, Wallet } from 'lucide-react';
import { useParams } from 'next/navigation';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LENDER_DATA } from '@/data/mockData';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const DEFAULT_AVATAR = '/Foued.jpg';

// Generate a lender profile from stored user data
function buildProfileFromUser(userData) {
    return {
        name: userData.name,
        handle: userData.handle,
        avatar: userData.avatar,
        bio: userData.bio || 'Fashion enthusiast sharing their wardrobe on ARCHIV.',
        location: userData.location || 'Earth',
        rating: 4.9,
        reviews: 0,
        rentals: 0,
        reliability: '100%',
        followers: userData.followers || 0,
        following: userData.following || 0,
        items: [],
        reviewsData: [],
        highlights: []
    };
}

export default function LenderProfile() {
    const params = useParams();
    const handle = decodeURIComponent(params?.handle || '@foued');

    const [lender, setLender] = useState(LENDER_DATA[handle] || LENDER_DATA['@foued']);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showHighlightModal, setShowHighlightModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [activeHighlight, setActiveHighlight] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const [editForm, setEditForm] = useState({
        name: lender.name,
        bio: lender.bio,
        location: lender.location,
        avatar: lender.avatar
    });
    const editAvatarRef = useRef(null);

    const handleEditAvatar = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return;
        const reader = new FileReader();
        reader.onload = (ev) => setEditForm(prev => ({ ...prev, avatar: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const [highlightForm, setHighlightForm] = useState({
        title: '',
        img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop'
    });

    useEffect(() => {
        const stored = localStorage.getItem('archiv-user');
        let currentUser = null;
        if (stored) {
            currentUser = JSON.parse(stored);
            setLoggedInUser(currentUser);
        }

        // Determine the lender to display
        let currentLender;
        if (currentUser && currentUser.handle === handle) {
            // Viewing own profile — build from account data
            currentLender = {
                ...(LENDER_DATA[handle] || buildProfileFromUser(currentUser)),
                name: currentUser.name,
                handle: currentUser.handle,
                avatar: currentUser.avatar,
                bio: currentUser.bio || LENDER_DATA[handle]?.bio || 'Fashion enthusiast sharing their wardrobe on ARCHIV.',
                location: currentUser.location || LENDER_DATA[handle]?.location || 'Earth',
            };
        } else {
            currentLender = LENDER_DATA[handle] || (currentUser ? buildProfileFromUser({ name: handle.replace('@', ''), handle, avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(handle.replace('@', ''))}&background=E8115B&color=fff&bold=true&size=200` }) : LENDER_DATA['@foued']);
        }

        setLender(currentLender);
        setEditForm({
            name: currentLender.name,
            bio: currentLender.bio,
            location: currentLender.location,
            avatar: currentLender.avatar
        });
    }, [handle]);

    const isOwnProfile = loggedInUser?.handle === lender.handle;

    const handleMessage = () => {
        setShowMessageModal(true);
    };

    const handleShare = () => {
        setShowShareModal(true);
    };

    const copyToClipboard = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setLender(prev => ({
            ...prev,
            ...editForm
        }));
        // Persist to localStorage so dashboard stays in sync
        if (isOwnProfile) {
            const stored = localStorage.getItem('archiv-user');
            if (stored) {
                const userData = JSON.parse(stored);
                const updated = {
                    ...userData,
                    name: editForm.name,
                    avatar: editForm.avatar,
                    bio: editForm.bio,
                    location: editForm.location
                };
                localStorage.setItem('archiv-user', JSON.stringify(updated));
                setLoggedInUser(updated);
            }
        }
        setShowEditModal(false);
    };

    const handleAddHighlight = (e) => {
        e.preventDefault();
        const newHighlight = {
            id: Date.now(),
            ...highlightForm
        };
        setLender(prev => ({
            ...prev,
            highlights: [...(prev.highlights || []), newHighlight]
        }));
        setShowHighlightModal(false);
        setHighlightForm({ title: '', img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop' });
    };

    const sendMessage = () => {
        if (!messageContent.trim()) return;
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setMessageSent(true);
            setShowMessageModal(false);
            setMessageContent('');
            setTimeout(() => setMessageSent(false), 3000);
        }, 1500);
    };

    // Story Progress Logic
    useEffect(() => {
        let interval;
        if (activeHighlight && !isPaused) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        handleNextHighlight();
                        return 100;
                    }
                    return prev + 0.5; // Smoother progress
                });
            }, 30); // ~6 seconds total
        }
        return () => clearInterval(interval);
    }, [activeHighlight, isPaused, lender.highlights]);

    const handleNextHighlight = () => {
        const currentIndex = lender.highlights.findIndex(h => h.id === activeHighlight?.id);
        if (currentIndex < lender.highlights.length - 1) {
            setProgress(0);
            setActiveHighlight(lender.highlights[currentIndex + 1]);
        } else {
            setActiveHighlight(null);
        }
    };

    const handlePrevHighlight = () => {
        const currentIndex = lender.highlights.findIndex(h => h.id === activeHighlight?.id);
        if (currentIndex > 0) {
            setProgress(0);
            setActiveHighlight(lender.highlights[currentIndex - 1]);
        } else {
            setProgress(0); // Restart current
        }
    };

    useEffect(() => {
        if (activeHighlight) {
            setProgress(0);
            setIsPaused(false);
        }
    }, [activeHighlight?.id]);

    return (
        <main className="min-h-screen bg-white pb-24 lg:pb-0">
            {/* Header Nav */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center px-6 lg:px-12 z-50">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} /> Discover
                </Link>
                <div className="mx-auto font-black tracking-tighter text-xl">ARCHIV</div>
                <div className="flex-1 flex justify-end items-center gap-4">
                    {loggedInUser && (
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-sage/5 rounded-full border border-sage/10">
                            <Wallet size={12} className="text-sage" />
                            <span className="text-[10px] font-black text-sage uppercase tracking-widest">£{loggedInUser.credits || 540} Credits</span>
                        </div>
                    )}
                    <Link href={`/lender/${loggedInUser?.handle || '@foued'}`} className="p-1 hover:bg-gray-50 rounded-full transition-colors border border-gray-100 shadow-sm">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img src={loggedInUser?.avatar || '/Foued.jpg'} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </Link>
                </div>
            </nav>

            {/* Profile Intro */}
            <header className="pt-32 pb-16 px-6 lg:px-12 bg-off-white">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-32 h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0"
                    >
                        <img src={lender.avatar} className="w-full h-full object-cover" alt={lender.handle} />
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-4xl lg:text-6xl font-serif font-black italic mb-2">{lender.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6">
                                <span className="text-brilliant-rose font-black text-xs uppercase tracking-widest">{lender.handle}</span>
                                <span className="flex items-center gap-1 text-xs font-bold text-gray-400 capitalize"><MapPin size={12} /> {lender.location}</span>
                                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1"><ShieldCheck size={12} /> Verified Lender</span>
                            </div>
                            <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-2xl mb-8">
                                "{lender.bio}"
                            </p>
                            <div className="flex justify-center md:justify-start gap-4">
                                {isOwnProfile ? (
                                    <>
                                        <button
                                            onClick={() => setShowEditModal(true)}
                                            className="h-12 px-8 rounded-md bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-brilliant-rose transition-all flex items-center gap-2"
                                        >
                                            <Settings size={16} /> Edit Profile
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="h-12 px-8 rounded-md bg-white text-black border-2 border-black font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2"
                                        >
                                            <Share2 size={16} /> Share
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleMessage}
                                            className={cn(
                                                "h-12 px-8 rounded-md font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 relative overflow-hidden",
                                                messageSent ? "bg-green-600 text-white" : "bg-black text-white hover:bg-brilliant-rose"
                                            )}
                                        >
                                            <AnimatePresence mode="wait">
                                                {messageSent ? (
                                                    <motion.div
                                                        key="sent"
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -20, opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        Message Sent
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="message"
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -20, opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <MessageCircle size={16} /> Message {lender.name.split(' ')[0]}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                        <button
                                            onClick={() => setIsFollowing(!isFollowing)}
                                            className={cn(
                                                "h-12 px-8 rounded-md font-black text-xs uppercase tracking-widest transition-all",
                                                isFollowing ? "bg-gray-100 text-black border border-gray-200" : "bg-white text-black border-2 border-black hover:bg-gray-50"
                                            )}
                                        >
                                            {isFollowing ? 'Following' : 'Follow'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Instagram Style Highlights */}
                <div className="max-w-5xl mx-auto px-0 md:px-32 mt-12">
                    <div className="flex gap-6 lg:gap-10 overflow-x-auto no-scrollbar pb-4 px-4">
                        {isOwnProfile && (
                            <div
                                onClick={() => setShowHighlightModal(true)}
                                className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
                            >
                                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-gray-100 bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                                    <Plus size={24} className="text-gray-400" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">New Archive</span>
                            </div>
                        )}
                        {lender.highlights?.map((highlight) => (
                            <div
                                key={highlight.id}
                                onClick={() => setActiveHighlight(highlight)}
                                className="flex-shrink-0 flex flex-col items-center gap-2 group cursor-pointer"
                            >
                                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-white p-1 ring-2 ring-gray-100 group-hover:ring-brilliant-rose transition-all duration-500 overflow-hidden">
                                    <img src={highlight.img} className="w-full h-full rounded-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" alt={highlight.title} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/60 group-hover:text-brilliant-rose transition-colors">{highlight.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div className="border-y border-gray-100 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-50 lg:divide-x">
                    <div className="py-8 px-6 text-center">
                        <div className="text-2xl font-serif italic mb-1">{lender.rating} ★</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{lender.reviews} Reviews</div>
                    </div>
                    <div className="py-8 px-6 text-center">
                        <div className="text-2xl font-serif italic mb-1">
                            {isFollowing && !isOwnProfile ? (lender.followers || 0) + 1 : (lender.followers || 0)}
                        </div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Followers</div>
                    </div>
                    <div className="py-8 px-6 text-center">
                        <div className="text-2xl font-serif italic mb-1">{lender.following || 0}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Following</div>
                    </div>
                    <div className="py-8 px-6 text-center">
                        <div className="text-2xl font-serif italic mb-1">{lender.rentals}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Rentals</div>
                    </div>
                    <div className="py-8 px-6 text-center border-t border-gray-50 md:border-t-0">
                        <div className="text-2xl font-serif italic mb-1">{lender.reliability}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Reliability Score</div>
                    </div>
                    <div className="py-8 px-6 text-center border-t border-gray-50 lg:border-t-0">
                        <div className="text-2xl font-serif italic mb-1">Top 1%</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Community Rank</div>
                    </div>
                </div>
            </div>

            {/* === EARNINGS DASHBOARD (Own Profile Only) === */}
            {isOwnProfile && (
                <section className="py-20 px-6 lg:px-12 bg-charcoal text-cream relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brilliant-rose/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                    <div className="max-w-5xl mx-auto relative z-10">
                        {/* Section Header */}
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-brilliant-rose font-black text-[9px] uppercase tracking-[0.4em] block mb-3">Your Archive Income</span>
                                <h2 className="text-4xl font-serif italic tracking-tight">Earnings Dashboard</h2>
                            </div>
                            <button className="h-12 px-8 rounded-full bg-brilliant-rose text-white font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-500 shadow-xl shadow-brilliant-rose/20 flex items-center gap-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 7l-5-5-5 5" /></svg>
                                Withdraw Funds
                            </button>
                        </div>

                        {/* Top KPI Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                            {[
                                { label: 'Total Earned', value: '£12,480', sub: 'All time', accent: true },
                                { label: 'This Month', value: '£1,340', sub: '+18% vs last month', accent: false },
                                { label: 'Active Rentals', value: '6', sub: '2 ending this week', accent: false },
                                { label: 'Pending Payout', value: '£420', sub: 'Releases in 3 days', accent: false },
                            ].map((kpi) => (
                                <motion.div
                                    key={kpi.label}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "rounded-3xl p-6 border transition-all duration-300 group hover:-translate-y-1",
                                        kpi.accent
                                            ? "bg-brilliant-rose border-brilliant-rose text-white"
                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                    )}
                                >
                                    <div className={cn("text-[9px] font-black uppercase tracking-[0.3em] mb-3", kpi.accent ? "text-white/70" : "text-cream/40")}>{kpi.label}</div>
                                    <div className="text-3xl font-serif italic mb-2">{kpi.value}</div>
                                    <div className={cn("text-[10px] font-bold", kpi.accent ? "text-white/60" : "text-cream/30")}>{kpi.sub}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
                            {/* Monthly Bar Chart */}
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-cream/40 mb-1">Revenue Trend</div>
                                        <div className="text-lg font-serif italic">Monthly Earnings</div>
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-cream/30 border border-white/10 px-3 py-1.5 rounded-full">2025 — 2026</div>
                                </div>
                                <div className="flex items-end gap-2 h-40">
                                    {[
                                        { month: 'M', val: 55 }, { month: 'A', val: 40 }, { month: 'M', val: 80 },
                                        { month: 'J', val: 100 }, { month: 'J', val: 90 }, { month: 'A', val: 75 },
                                        { month: 'S', val: 85 }, { month: 'O', val: 110 }, { month: 'N', val: 120 },
                                        { month: 'D', val: 145 }, { month: 'J', val: 130 }, { month: 'F', val: 160 },
                                    ].map((bar, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                            <div
                                                className={cn(
                                                    "w-full rounded-lg transition-all duration-500 group-hover:bg-brilliant-rose",
                                                    i === 11 ? "bg-brilliant-rose" : "bg-white/20"
                                                )}
                                                style={{ height: `${bar.val}%` }}
                                            />
                                            <span className="text-[8px] font-black text-cream/30 group-hover:text-cream/60 transition-colors">{bar.month}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Panel: Active Rentals + Payout */}
                            <div className="flex flex-col gap-4">
                                {/* Active Rentals */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex-1">
                                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-cream/40 mb-5">Active Rentals</div>
                                    <div className="space-y-3">
                                        {(lender.rentalsData || [
                                            { item: 'Archive Leather Coat', renter: '@elena.g', days: 3, earn: '£180' },
                                            { item: 'Signature Bag', renter: '@marcust', days: 7, earn: '£245' },
                                        ]).map((rental, i) => (
                                            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                                                <div>
                                                    <div className="text-[11px] font-black text-cream truncate max-w-[120px]">{rental.item}</div>
                                                    <div className="text-[9px] text-cream/30 font-bold mt-0.5">{rental.renter} · {rental.days} days left</div>
                                                </div>
                                                <div className="text-sm font-serif italic text-brilliant-rose">{typeof rental.earn === 'number' ? `£${rental.earn}` : rental.earn}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payout History */}
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-cream/40 mb-5">Recent Payouts</div>
                                    <div className="space-y-3">
                                        {[
                                            { date: '1 Mar 2026', amount: '£960', status: 'Paid' },
                                            { date: '1 Feb 2026', amount: '£1,120', status: 'Paid' },
                                            { date: '1 Jan 2026', amount: '£840', status: 'Paid' },
                                        ].map((payout, i) => (
                                            <div key={i} className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-[11px] font-black text-cream">{payout.amount}</div>
                                                    <div className="text-[9px] text-cream/30 font-bold mt-0.5">{payout.date}</div>
                                                </div>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full border border-green-400/20">{payout.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Lender's Wardrobe */}
            <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-16 underline underline-offset-8 decoration-brilliant-rose decoration-2">
                    <Grid size={18} />
                    <h2 className="text-xl font-black uppercase tracking-widest italic">{lender.name.split(' ')[0]}'s Wardrobe <span className="text-gray-300 font-medium italic normal-case ml-2">({lender.items.length} pieces)</span></h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {lender.items.map((item) => (
                        <Link href={`/product/${item.id}`} key={item.id} className="group cursor-pointer">
                            <div className="aspect-[4/5] rounded-md overflow-hidden bg-gray-50 border border-gray-100 mb-4 relative">
                                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={item.name} />
                                <div className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Heart size={16} />
                                </div>
                            </div>
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-black mb-1">{item.designer}</h4>
                            <p className="text-[12px] text-gray-500 font-medium mb-2 truncate">{item.name}</p>
                            <span className="text-sm font-bold text-black">£{item.price} / day</span>
                        </Link>
                    ))}
                </div>
            </section>
            {/* People Reviews */}
            <section className="py-24 px-6 lg:px-12 bg-off-white border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-16 px-4 md:px-0">
                        <div className="flex items-center gap-3 underline underline-offset-8 decoration-brilliant-rose decoration-2">
                            <Star size={18} className="text-charcoal" />
                            <h2 className="text-xl font-black uppercase tracking-widest italic">Community Reviews</h2>
                        </div>
                        <div className="text-right hidden sm:block">
                            <div className="text-2xl font-serif italic leading-none">{lender.rating} ★</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Global Reputation</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {lender.reviewsData?.map((review, i) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-charcoal/[0.02] transition-all duration-500 group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-off-white group-hover:border-brilliant-rose transition-colors">
                                            <img src={review.avatar} className="w-full h-full object-cover" alt={review.user} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black">{review.user}</div>
                                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, star) => (
                                            <Star key={star} size={10} fill={star < review.rating ? "#FFD700" : "none"} className={star < review.rating ? "text-[#FFD700]" : "text-gray-200"} />
                                        ))}
                                    </div>
                                </div>

                                <blockquote className="text-gray-600 font-medium leading-relaxed mb-6 italic">
                                    &ldquo;{review.comment}&rdquo;
                                </blockquote>

                                <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                                    <div className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Verified Rental</div>
                                    <div className="h-1 w-1 rounded-full bg-gray-200" />
                                    <div className="text-[11px] font-bold text-brilliant-rose italic">{review.item}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {lender.reviews > 3 && (
                        <div className="mt-16 text-center">
                            <button className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-charcoal/10 pb-2 hover:border-brilliant-rose hover:text-brilliant-rose transition-all">
                                Load More Community Feedback
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Message Modal */}
            <AnimatePresence>
                {showMessageModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMessageModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-serif font-black italic">Message {lender.name}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Inquire about items or shipping</p>
                                    </div>
                                    <button
                                        onClick={() => setShowMessageModal(false)}
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-off-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                            <img src={lender.avatar} className="w-full h-full object-cover" alt={lender.name} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Recipient</div>
                                            <div className="text-sm font-bold">{lender.handle}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Message</label>
                                        <textarea
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                            placeholder={`Hi ${lender.name.split(' ')[0]}, I love your Jacquemus bag! Is it available for a 4-day rental next weekend?`}
                                            className="w-full h-40 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        onClick={() => setShowMessageModal(false)}
                                        className="flex-1 h-14 border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-black transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={sendMessage}
                                        disabled={isSending || !messageContent.trim()}
                                        className={cn(
                                            "flex-[2] h-14 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2",
                                            isSending || !messageContent.trim() ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-brilliant-rose shadow-black/10"
                                        )}
                                    >
                                        {isSending ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </div>
                                        ) : (
                                            <>
                                                <MessageCircle size={16} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Simple Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowShareModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-serif font-black italic">Share Profile</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Spread the archive aesthetic</p>
                                    </div>
                                    <button
                                        onClick={() => setShowShareModal(false)}
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-off-white p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-4">
                                        <div className="flex-1 truncate text-sm font-medium text-gray-500">
                                            {typeof window !== 'undefined' ? window.location.href : ''}
                                        </div>
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex-shrink-0 w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center hover:bg-brilliant-rose transition-all"
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="h-14 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:border-black transition-all flex items-center justify-center gap-2">
                                            Instagram
                                        </button>
                                        <button className="h-14 rounded-xl border border-gray-100 text-[10px] font-black uppercase tracking-widest hover:border-black transition-all flex items-center justify-center gap-2">
                                            WhatsApp
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowEditModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <form onSubmit={handleSaveProfile} className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-serif font-black italic">Edit Profile</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Curate your public presence</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-center mb-8 text-center">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 ring-4 ring-white shadow-xl">
                                                <img src={editForm.avatar} className="w-full h-full object-cover" alt="Profile" />
                                            </div>
                                            <button type="button" onClick={() => editAvatarRef.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border-2 border-white group-hover:bg-brilliant-rose transition-colors">
                                                <Camera size={14} />
                                            </button>
                                            <input ref={editAvatarRef} type="file" accept="image/*" onChange={handleEditAvatar} className="hidden" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bio</label>
                                        <textarea
                                            value={editForm.bio}
                                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                            className="w-full h-32 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</label>
                                        <input
                                            type="text"
                                            value={editForm.location}
                                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 h-14 border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-black transition-all"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] h-14 rounded-xl bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-brilliant-rose transition-all shadow-xl shadow-black/10"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add Highlight Modal */}
            <AnimatePresence>
                {showHighlightModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowHighlightModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <form onSubmit={handleAddHighlight} className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-2xl font-serif font-black italic">New Highlight</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Create a new archive collection</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowHighlightModal(false)}
                                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="aspect-square w-32 mx-auto rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-brilliant-rose transition-colors overflow-hidden relative">
                                        <img src={highlightForm.img} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity" alt="" />
                                        <Camera size={24} className="text-gray-300 group-hover:text-brilliant-rose relative z-10" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 relative z-10">Select Image</span>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Collection Title</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Summer '26 Drops"
                                            value={highlightForm.title}
                                            onChange={(e) => setHighlightForm({ ...highlightForm, title: e.target.value })}
                                            className="w-full h-12 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowHighlightModal(false)}
                                        className="flex-1 h-14 border border-gray-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-black transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] h-14 rounded-xl bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-brilliant-rose transition-all shadow-xl shadow-black/10"
                                    >
                                        Create Collection
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Highlight / Story Viewer Modal */}
            <AnimatePresence>
                {activeHighlight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
                    >
                        <div className="relative w-full max-w-sm aspect-[9/16] bg-black overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                            {/* Progress Bar Container */}
                            <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
                                <div className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ ease: "linear" }}
                                    />
                                </div>
                            </div>

                            {/* Story Header */}
                            <div className="absolute top-8 left-4 right-4 z-20 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border border-white/40 overflow-hidden">
                                        <img src={lender.avatar} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <div className="text-white text-[10px] font-black uppercase tracking-widest">{lender.handle}</div>
                                        <div className="text-white/60 text-[8px] font-bold uppercase tracking-tighter">{activeHighlight.title}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveHighlight(null)}
                                    className="p-2 text-white/60 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <img
                                src={activeHighlight.img}
                                className="w-full h-full object-cover select-none"
                                alt=""
                            />

                            {/* Touch Navigation Overlays */}
                            <div className="absolute inset-0 flex">
                                <div
                                    className="w-1/3 h-full cursor-pointer z-30"
                                    onClick={(e) => { e.stopPropagation(); handlePrevHighlight(); }}
                                    onMouseDown={() => setIsPaused(true)}
                                    onMouseUp={() => setIsPaused(false)}
                                    onTouchStart={() => setIsPaused(true)}
                                    onTouchEnd={() => setIsPaused(false)}
                                />
                                <div
                                    className="w-2/3 h-full cursor-pointer z-30"
                                    onClick={(e) => { e.stopPropagation(); handleNextHighlight(); }}
                                    onMouseDown={() => setIsPaused(true)}
                                    onMouseUp={() => setIsPaused(false)}
                                    onTouchStart={() => setIsPaused(true)}
                                    onTouchEnd={() => setIsPaused(false)}
                                />
                            </div>

                            {/* Caption Footer */}
                            <div className="absolute bottom-0 inset-x-0 p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent text-center">
                                <div className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em] mb-4">Inside the Archive</div>
                                <p className="text-white font-medium text-sm leading-relaxed mb-6 italic">
                                    &ldquo;Exclusive preview of the {activeHighlight.title} selection. Part of our Spring/Summer '26 archival drops.&rdquo;
                                </p>
                                <button className="w-full h-12 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-brilliant-rose hover:text-white transition-all rounded-sm">
                                    Reserve this collection
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
