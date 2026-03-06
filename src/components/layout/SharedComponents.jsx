'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, User, ChevronDown, Menu, X, Smartphone, Apple, MessageCircle, CheckCircle2, ArrowRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const AnnouncementBar = ({ onShowPopup }) => {
    return (
        <div
            onClick={onShowPopup}
            className="sticky top-0 z-[60] h-10 w-full bg-brilliant-rose text-white overflow-hidden flex items-center justify-center cursor-pointer group"
        >
            <div className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 relative z-10">
                DOWNLOAD THE APP FOR 15% OFF YOUR FIRST RENTAL
            </div>
        </div>
    );
};

export const Navbar = ({ onSearch }) => {
    const [user, setUser] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const stored = localStorage.getItem('archiv-user');
        if (stored) setUser(JSON.parse(stored));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('archiv-user');
        setUser(null);
        setShowUserMenu(false);
    };

    return (
        <nav className="sticky top-10 z-50 w-full flex flex-col">
            {/* Top Bar: Forest Green */}
            <div className="bg-[#1b3d2f] h-20 px-6 lg:px-12 flex items-center justify-between">
                {/* Left: Search Bar */}
                <div className="flex-1 flex items-center">
                    <div className="relative group w-full max-w-sm hidden lg:block">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" />
                        <input
                            type="text"
                            onFocus={onSearch}
                            placeholder="Search for brand, product type, colour..."
                            className="bg-white h-10 w-full rounded-md pl-11 pr-4 text-xs font-medium text-charcoal outline-none placeholder:text-charcoal/40"
                        />
                    </div>
                    {/* Mobile Search Icon */}
                    <button onClick={onSearch} className="lg:hidden p-2 text-white">
                        <Search size={22} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex-1 flex justify-center">
                    <Link href="/">
                        <h1 className="text-3xl font-serif italic text-white tracking-tight cursor-pointer">
                            Archiv
                        </h1>
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex-1 flex justify-end items-center gap-6">
                    <Link href="/collections/all" className="p-2 text-white hover:text-[#f8b4d9] transition-colors relative">
                        <Heart size={22} strokeWidth={1.5} />
                    </Link>

                    {user ? (
                        <div className="relative">
                            <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center">
                                <div className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-white transition-all overflow-hidden">
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                </div>
                            </button>
                            <AnimatePresence>
                                {showUserMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                                        className="absolute top-14 right-0 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden w-64 z-[100] text-charcoal"
                                    >
                                        <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Account</div>
                                            <div className="font-bold text-sm truncate mt-1">{user.handle}</div>
                                        </div>
                                        <div className="p-2">
                                            {[
                                                { label: 'Wardrobe', href: `/lender/${user.handle.replace('@', '')}` },
                                                { label: 'Dashboard', href: '/dashboard' },
                                                { label: 'Messages', href: '/messages' },
                                                { label: 'Lend Item', href: '/lend' },
                                            ].map(item => (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="block px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-charcoal/60 hover:text-charcoal hover:bg-gray-50 rounded-xl transition-all"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full text-left px-4 py-2.5 text-[11px] font-black uppercase tracking-wider text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border-t border-gray-50 mt-1"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link href="/auth/sign-in" className="text-[11px] font-black uppercase tracking-widest text-white hover:text-[#f8b4d9] transition-colors">
                            Sign In / Join
                        </Link>
                    )}
                </div>
            </div>

            {/* Bottom Bar: Categories */}
            <div className="bg-white h-12 border-b border-gray-100 px-6 lg:px-12 hidden md:flex items-center justify-center gap-10">
                {[
                    'New In', 'Designers', 'Collections', 'Dresses', 'Clothing', 'Accessories', 'Men', 'Resale'
                ].map((cat) => (
                    <Link
                        key={cat}
                        href="/collections/all"
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal hover:text-[#1b3d2f] relative group"
                    >
                        {cat}
                        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1b3d2f] transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export const AppPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl flex z-10"
            >
                <div className="hidden sm:block w-[42%] relative flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Fashion"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden bg-cream">
                    <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 rounded-full bg-off-white flex items-center justify-center hover:bg-gray-200 transition-colors z-10">
                        <X size={16} className="text-charcoal" />
                    </button>
                    <div>
                        <div className="inline-flex items-center gap-2 bg-brilliant-rose/10 text-brilliant-rose px-3 py-1.5 rounded-full mb-6">
                            <Smartphone size={12} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Free App</span>
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-serif font-black leading-tight mb-3">
                            Your Rotating<br />
                            <span className="italic text-brilliant-rose">Journey Starts Here.</span>
                        </h3>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                            Get <span className="text-black font-bold">15% off your first rental</span> when you download.
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4 h-14 bg-black text-white px-6 rounded-2xl cursor-pointer hover:bg-gray-900 transition-all">
                                <Apple size={22} className="fill-white text-white" />
                                <div className="flex-1">
                                    <div className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-none">Download on the</div>
                                    <div className="text-sm font-black leading-tight mt-0.5">App Store</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 h-14 bg-black text-white px-6 rounded-2xl cursor-pointer hover:bg-gray-900 transition-all">
                                <div className="w-[22px] h-[22px] flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.19C19.45,16.63 19.45,17.37 18.66,17.81L13.69,20.68L12.28,19.27L16.81,15.12M12.28,4.73L13.69,3.32L18.66,6.19C19.45,6.63 19.45,7.37 18.66,7.81L16.81,8.88L12.28,4.73M15.4,13.73L4.54,23.5L14,14L15.4,13.73Z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="text-[9px] font-bold opacity-60 uppercase tracking-widest leading-none">Get it on</div>
                                    <div className="text-sm font-black leading-tight mt-0.5">Google Play</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 h-14 bg-charcoal/5 border border-charcoal/10 text-charcoal px-6 rounded-2xl cursor-pointer hover:bg-charcoal/10 transition-all">
                                <Smartphone size={22} strokeWidth={1.5} />
                                <div className="flex-1">
                                    <div className="text-[9px] font-black opacity-40 uppercase tracking-widest leading-none">Direct Download</div>
                                    <div className="text-sm font-black leading-tight mt-0.5">Android APK</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const Footer = ({ onShowPopup }) => {
    return (
        <footer className="bg-cream pt-32 pb-12 px-6 lg:px-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-16 mb-32 items-start">
                    <div className="lg:col-span-5 space-y-12">
                        <h2 className="text-7xl lg:text-9xl font-serif tracking-tighter text-charcoal leading-[0.8]">
                            ARCHIV <br />
                            <span className="italic text-charcoal/20">Archive.</span>
                        </h2>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button onClick={onShowPopup} className="group flex items-center gap-4 bg-charcoal text-cream px-8 py-4 rounded-full hover:bg-brilliant-rose transition-all duration-500">
                                <Apple size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">iOS Store</span>
                            </button>
                            <button onClick={onShowPopup} className="group flex items-center gap-4 bg-charcoal text-cream px-8 py-4 rounded-full hover:bg-brilliant-rose transition-all duration-500">
                                <Smartphone size={20} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Android App</span>
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal mb-8">Company</h5>
                            <ul className="space-y-4">
                                <li><Link href="/company/vision" className="text-[13px] text-gray-400 font-bold hover:text-charcoal transition-all">The Vision</Link></li>
                                <li><Link href="/company/careers" className="text-[13px] text-gray-400 font-bold hover:text-charcoal transition-all">Careers</Link></li>
                                <li><Link href="/company/sustainability" className="text-[13px] text-gray-400 font-bold hover:text-charcoal transition-all">Sustainability</Link></li>
                                <li><Link href="/company/press" className="text-[13px] text-gray-400 font-bold hover:text-charcoal transition-all">Press & Media</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export const CookiePopup = ({ onAccept }) => {
    const [preferences, setPreferences] = useState({
        Necessary: true,
        Functional: false,
        Targeting: false,
        Analytical: false
    });

    const togglePreference = (name) => {
        if (name === 'Necessary') return;
        setPreferences(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const handleAcceptAll = () => {
        setPreferences({ Necessary: true, Functional: true, Targeting: true, Analytical: true });
        localStorage.setItem('archiv-cookie-consent', 'true');
        setTimeout(() => onAccept(), 300);
    };

    const handleSave = () => {
        localStorage.setItem('archiv-cookie-consent', 'true');
        onAccept();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[200] bg-cream/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-4 lg:p-6"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 text-charcoal">
                <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-sm font-black uppercase tracking-tighter mb-1 leading-none">Cookie Preferences</h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed font-medium max-w-2xl">
                        We use cookies to enhance your experience and analyze site traffic. By clicking &quot;Accept All&quot;, you consent to our use of all cookies. <Link href="/support/cookie-policy" className="underline underline-offset-4 decoration-gray-200 hover:text-brilliant-rose inline-block ml-1 font-bold">Privacy Hub</Link>
                    </p>
                </div>

                <div className="hidden md:flex flex-wrap items-center gap-6">
                    {[
                        { name: 'Necessary', mandatory: true },
                        { name: 'Functional', mandatory: false },
                        { name: 'Targeting', mandatory: false },
                        { name: 'Analytical', mandatory: false }
                    ].map((cookie) => (
                        <label key={cookie.name} className="flex items-center gap-2 cursor-pointer group" onClick={() => togglePreference(cookie.name)}>
                            <div className={cn(
                                "w-4 h-4 rounded-full flex items-center justify-center border transition-all",
                                cookie.mandatory ? "bg-charcoal border-charcoal text-cream" :
                                    preferences[cookie.name] ? "bg-charcoal border-charcoal text-cream" : "bg-white border-gray-200 group-hover:border-black text-transparent"
                            )}>
                                <CheckCircle2 size={10} className={cookie.mandatory || preferences[cookie.name] ? "opacity-100" : "opacity-0"} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-charcoal transition-colors">{cookie.name}</span>
                        </label>
                    ))}
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button
                        onClick={handleSave}
                        className="flex-1 lg:flex-none h-12 px-8 border border-gray-100 rounded-md text-[10px] font-black uppercase tracking-widest hover:border-charcoal transition-all font-bold"
                    >
                        Save Settings
                    </button>
                    <button
                        onClick={handleAcceptAll}
                        className="flex-1 lg:flex-none h-12 px-8 bg-charcoal text-cream rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-brilliant-rose transition-all shadow-xl shadow-black/5 font-bold"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export const SearchModal = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const POPULAR = ['Jacquemus', 'Bag', 'Dress', 'Chanel', 'Acne Studios'];

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length > 1) {
                setLoading(true);
                try {
                    const res = await fetch(`/api/listings/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    if (data.success) {
                        setResults(data.listings);
                    }
                } catch (err) {
                    console.error("Search fetch error:", err);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="fixed inset-0 z-[150] flex flex-col">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="relative bg-white shadow-2xl px-6 lg:px-12 py-8 max-h-[85vh] overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 border-b-2 border-black pb-4 mb-8">
                        <Search size={24} strokeWidth={2} className="text-gray-400 flex-shrink-0" />
                        <input
                            autoFocus
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search designers, items, occasions…"
                            className="flex-1 text-2xl font-serif italic outline-none placeholder:text-gray-300"
                        />
                        {loading && <div className="w-5 h-5 border-2 border-black/10 border-t-black rounded-full animate-spin" />}
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2">
                            <X size={20} />
                        </button>
                    </div>

                    {results.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                    <Globe size={12} /> Live Inventory Results ({results.length})
                                </div>
                                {results.map(item => (
                                    <Link key={item.id} href={`/product/${item.id}`} onClick={onClose} className="flex items-center gap-5 group hover:bg-gray-50 p-3 -mx-3 rounded-2xl transition-all">
                                        <div className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                                            <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-brilliant-rose">{item.brand}</div>
                                            <div className="font-serif italic text-lg mt-0.5 group-hover:translate-x-1 transition-transform">{item.brand} {item.category}</div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="text-xs font-black">£{item.price}/day</div>
                                                <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                                                    <Star size={10} className="text-amber-400 fill-amber-400" /> {item.rating} • {item.lenderName}
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} className="text-gray-200 group-hover:text-brilliant-rose transition-colors" />
                                    </Link>
                                ))}
                            </div>

                            <div className="hidden md:block">
                                <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Archive Insights</div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                                            <TrendingUp size={20} className="text-brilliant-rose" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">Trending this week</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Bags are seeing 40% more search volume</div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {['Signature Archive Bag', 'Archive Leather Coat', 'Signature Jacket'].map(t => (
                                            <div key={t} className="flex items-center justify-between text-[11px] font-bold py-2 border-b border-gray-200/50 last:border-0 hover:text-brilliant-rose cursor-pointer transition-colors">
                                                <span>{t}</span>
                                                <ArrowRight size={12} opacity={0.3} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12">
                            {query.length > 1 && !loading ? (
                                <div className="text-center py-10">
                                    <div className="text-2xl font-serif italic mb-2 text-gray-400">No results found for &ldquo;{query}&rdquo;</div>
                                    <p className="text-xs font-medium text-gray-300 tracking-wide uppercase">Try a different designer or category</p>
                                </div>
                            ) : (
                                <>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                        <CheckCircle2 size={12} /> Seasonal Hot Picks
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {POPULAR.map(term => (
                                            <button key={term} onClick={() => setQuery(term)} className="px-8 h-12 border border-gray-200 rounded-full text-[11px] font-black uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all shadow-sm">
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
