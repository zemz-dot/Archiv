'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    X,
    Plus,
    Info,
    Camera,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Tag,
    DollarSign,
    Sparkles,
    ShieldCheck,
    Smartphone,
    Search,
    Globe,
    Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Navbar, Footer, AnnouncementBar, AppPopup, CookiePopup, SearchModal } from '../../components/layout/SharedComponents';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function LendPage() {
    const [step, setStep] = useState(1);
    const [images, setImages] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        designer: 'Jacquemus',
        category: 'Dresses',
        size: 'UK 10',
        rrp: '',
        price: '',
        description: ''
    });
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const s = localStorage.getItem('archiv-user');
        if (s) setUser(JSON.parse(s));
    }, []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9),
            isPrimary: false
        }));

        if (images.length === 0 && newImages.length > 0) {
            newImages[0].isPrimary = true;
        }

        setImages([...images, ...newImages]);
    };

    const removeImage = (id) => {
        setImages(images.filter(img => img.id !== id));
    };

    const setPrimaryImage = (id) => {
        setImages(images.map(img => ({
            ...img,
            isPrimary: img.id === id
        })));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 3));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <main className="min-h-screen bg-off-white font-sans text-charcoal">
            <AnnouncementBar onShowPopup={() => setIsPopupVisible(true)} />
            <Navbar onSearch={() => setShowSearch(true)} />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left: Form Content */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <header className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <span className="bg-charcoal text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Protocol v4.2</span>
                                <div className="h-[1px] w-12 bg-charcoal/10" />
                                <span className="text-sage text-[10px] font-black uppercase tracking-widest">Step {step} of 3</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl lg:text-7xl font-serif font-black tracking-tighter leading-[0.9] mb-6"
                            >
                                {step === 1 && <>Visual Asset <br /><span className="italic text-charcoal/30">Identification.</span></>}
                                {step === 2 && <>Archive <br /><span className="italic text-charcoal/30">Specification.</span></>}
                                {step === 3 && <>Protocol <br /><span className="italic text-charcoal/30">Valuation.</span></>}
                            </motion.h1>
                        </header>

                        {/* Progress Bar */}
                        <div className="flex gap-2 mb-16 max-w-md">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex-1 h-1.5 rounded-full bg-charcoal/5 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-brilliant-rose"
                                        initial={false}
                                        animate={{
                                            x: step >= s ? '0%' : '-100%'
                                        }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Images */}
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.section
                                    key="step1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Upload Card */}
                                        <div className="col-span-1 md:col-span-2">
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={handleImageUpload}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    accept="image/*"
                                                />
                                                <div className="aspect-[4/3] border-2 border-dashed border-charcoal/10 rounded-[2.5rem] flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-sm group-hover:border-brilliant-rose group-hover:bg-brilliant-rose/[0.02] transition-all duration-500">
                                                    <div className="w-20 h-20 rounded-full bg-charcoal/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                        <Plus className="text-charcoal/40 group-hover:text-brilliant-rose" size={32} />
                                                    </div>
                                                    <h3 className="text-xl font-bold mb-2">Drop archive images here</h3>
                                                    <p className="text-charcoal/40 text-sm font-medium">Original photography preferred. Min 3 shots.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Upload Guidelines */}
                                        <div className="bg-charcoal text-cream rounded-[2.5rem] p-8 flex flex-col justify-between">
                                            <div>
                                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
                                                    <ShieldCheck size={20} className="text-brilliant-rose" />
                                                </div>
                                                <h4 className="text-lg font-bold mb-4">Environmentally Validated Standards</h4>
                                                <ul className="space-y-4">
                                                    {[
                                                        "Clear, high-fidelity resolution",
                                                        "Natural light source preferred",
                                                        "Display brand authenticity tags",
                                                        "Include existing wear detail"
                                                    ].map((point, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-xs font-bold uppercase tracking-widest opacity-60">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-brilliant-rose mt-1" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="mt-8 pt-8 border-t border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <img src="/Foued.jpg" className="w-10 h-10 rounded-full object-cover grayscale" />
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Authenticated By</div>
                                                        <div className="text-xs font-bold text-sage">CEO Foued Mensi</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gallery Preview */}
                                    {images.length > 0 && (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-xs font-black uppercase tracking-widest text-charcoal/40">Visual Cache ({images.length})</h4>
                                                <div className="text-xs text-brilliant-rose font-bold">Select primary asset</div>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                                                {images.map((img) => (
                                                    <motion.div
                                                        layout
                                                        key={img.id}
                                                        className={cn(
                                                            "relative aspect-square rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500",
                                                            img.isPrimary ? "ring-4 ring-brilliant-rose ring-offset-4 ring-offset-off-white" : "hover:brightness-90 opacity-80 hover:opacity-100"
                                                        )}
                                                        onClick={() => setPrimaryImage(img.id)}
                                                    >
                                                        <img src={img.url} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeImage(img.id);
                                                            }}
                                                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                        {img.isPrimary && (
                                                            <div className="absolute inset-0 bg-brilliant-rose/10 pointer-events-none" />
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-12 flex justify-end">
                                        <button
                                            onClick={nextStep}
                                            disabled={images.length === 0}
                                            className="h-20 px-12 bg-charcoal text-white rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brilliant-rose transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
                                        >
                                            Continue Protocol
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.section>
                            )}

                            {step === 2 && (
                                <motion.section
                                    key="step2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Item Identity</label>
                                            <input
                                                className="w-full h-20 bg-white border border-charcoal/5 rounded-3xl px-8 font-bold focus:border-brilliant-rose outline-none transition-all placeholder:text-charcoal/10"
                                                placeholder="e.g. La Robe Saudade Dress"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Designer Archive</label>
                                            <select
                                                className="w-full h-20 bg-white border border-charcoal/5 rounded-3xl px-8 font-bold focus:border-brilliant-rose outline-none appearance-none cursor-pointer"
                                                value={formData.designer}
                                                onChange={e => setFormData({ ...formData, designer: e.target.value })}
                                            >
                                                {['Aje', 'Alaia', 'Bottega Veneta', 'Chanel', 'Jacquemus', 'Loewe', 'Reformation', 'Zimmermann'].map(d => (
                                                    <option key={d}>{d}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Category Section</label>
                                            <select
                                                className="w-full h-20 bg-white border border-charcoal/5 rounded-3xl px-8 font-bold focus:border-brilliant-rose outline-none appearance-none cursor-pointer"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                {['Dresses', 'Bags', 'Outerwear', 'Accessories', 'Suits'].map(c => (
                                                    <option key={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Archive Size</label>
                                            <select
                                                className="w-full h-20 bg-white border border-charcoal/5 rounded-3xl px-8 font-bold focus:border-brilliant-rose outline-none appearance-none cursor-pointer"
                                                value={formData.size}
                                                onChange={e => setFormData({ ...formData, size: e.target.value })}
                                            >
                                                {['UK 6', 'UK 8', 'UK 10', 'UK 12', 'One Size'].map(s => (
                                                    <option key={s}>{s}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Condition & Fit Analysis</label>
                                        <textarea
                                            rows={5}
                                            className="w-full bg-white border border-charcoal/5 rounded-[2.5rem] p-8 font-bold focus:border-brilliant-rose outline-none transition-all placeholder:text-charcoal/10 resize-none"
                                            placeholder="Describe the condition, the fit (true to size etc), and any specific styling notes..."
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-12 flex justify-between">
                                        <button
                                            onClick={prevStep}
                                            className="h-20 px-8 border border-charcoal/10 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-charcoal hover:text-white transition-all group"
                                        >
                                            <ChevronLeft size={16} />
                                            Visuals
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            className="h-20 px-12 bg-charcoal text-white rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-brilliant-rose transition-all group"
                                        >
                                            Valuation Entry
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.section>
                            )}

                            {step === 3 && (
                                <motion.section
                                    key="step3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-12"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                        <div className="space-y-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Original Retail (RRP)</label>
                                                <div className="relative">
                                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-charcoal/30">£</div>
                                                    <input
                                                        type="number"
                                                        className="w-full h-24 bg-white border border-charcoal/5 rounded-[2rem] pl-14 pr-8 text-3xl font-serif italic font-black focus:border-brilliant-rose outline-none transition-all"
                                                        placeholder="0"
                                                        value={formData.rrp}
                                                        onChange={e => setFormData({ ...formData, rrp: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-4">Rental Protocol Price (per day)</label>
                                                <div className="relative">
                                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 font-black text-brilliant-rose/50">£</div>
                                                    <input
                                                        type="number"
                                                        className="w-full h-24 bg-charcoal text-cream border border-charcoal/5 rounded-[2rem] pl-14 pr-8 text-3xl font-serif italic font-black focus:border-white/20 outline-none transition-all"
                                                        placeholder="0"
                                                        value={formData.price}
                                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                    />
                                                </div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-sage mt-2 ml-4 flex items-center gap-2">
                                                    <Sparkles size={12} /> Sugessted range: £35 — £55
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-sage/10 rounded-[3rem] p-10 space-y-8">
                                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Archive Potential</h4>

                                            <div className="space-y-6">
                                                <div className="flex justify-between items-end border-b border-sage/10 pb-4">
                                                    <div className="text-gray-500 font-bold text-sm leading-none">Est. Monthly Earnings</div>
                                                    <div className="text-3xl font-serif italic font-black text-charcoal leading-none">£480.00</div>
                                                </div>
                                                <div className="flex justify-between items-end border-b border-sage/10 pb-4 text-xs">
                                                    <div className="text-gray-500 font-bold leading-none">Protocol Fee (15%)</div>
                                                    <div className="text-charcoal font-black leading-none">- £72.00</div>
                                                </div>
                                                <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm">
                                                    <div className="text-xs font-black uppercase tracking-widest">Net Revenue</div>
                                                    <div className="text-3xl font-serif italic font-black text-sage">£408.00</div>
                                                </div>
                                            </div>

                                            <div className="p-6 bg-charcoal rounded-3xl text-cream flex items-start gap-4">
                                                <Zap className="text-brilliant-rose shrink-0 mt-1" size={18} />
                                                <div className="text-[11px] font-medium leading-relaxed">
                                                    Based on current demand for <span className="text-brilliant-rose font-black italic">high-fidelity archives</span>, your item could be fully amortized in <span className="text-cream font-black">4 rotations</span>.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-12 flex justify-between items-center">
                                        <button
                                            onClick={prevStep}
                                            className="h-20 px-8 border border-charcoal/10 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:bg-charcoal hover:text-white transition-all group"
                                        >
                                            <ChevronLeft size={16} />
                                            Specification
                                        </button>

                                        <div className="flex items-center gap-8">
                                            <p className="hidden md:block text-[10px] font-black uppercase tracking-widest text-charcoal/40 text-right">
                                                By submitting you agree to the <br />
                                                <Link href="#" className="text-charcoal underline">Lender Security Protocol</Link>
                                            </p>
                                            <button
                                                onClick={async () => {
                                                    if (!user) { router.push('/auth/sign-in'); return; }
                                                    const handle = (user.handle || 'default').replace('@', '');
                                                    const storedItems = JSON.parse(localStorage.getItem(`archiv-items-${handle}`) || '[]');
                                                    const newItem = {
                                                        id: Date.now(),
                                                        name: formData.title,
                                                        designer: formData.designer,
                                                        category: formData.category,
                                                        price: Number(formData.price),
                                                        earn: 0,
                                                        status: 'active',
                                                        rentals: 0,
                                                        occupancy: 0,
                                                        img: images.find(img => img.isPrimary)?.url || images[0]?.url || 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=400&auto=format&fit=crop'
                                                    };
                                                    localStorage.setItem(`archiv-items-${handle}`, JSON.stringify([...storedItems, newItem]));
                                                    // Add an activity for the new item
                                                    const storedActivities = JSON.parse(localStorage.getItem(`archiv-activities-${handle}`) || '[]');
                                                    localStorage.setItem(`archiv-activities-${handle}`, JSON.stringify([
                                                        { id: Date.now(), type: 'system', text: `New item listed: ${formData.title}`, time: 'Just now', icon: '✨' },
                                                        ...storedActivities
                                                    ]));
                                                    router.push('/dashboard');
                                                }}
                                                className="h-20 px-16 bg-brilliant-rose text-white rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-brilliant-rose/20"
                                            >
                                                Finalize Submission
                                                <Zap size={16} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Sidebar Info (Fixed on desktop) */}
                    <div className="hidden xl:block lg:col-span-4 self-start sticky top-40">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white p-10 rounded-[3rem] border border-charcoal/5 shadow-2xl space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-charcoal/40">Active Audit</h4>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 rounded-full bg-sage/20" />)}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors", step >= 1 ? "bg-sage border-sage text-white" : "border-gray-100")}>
                                            {step > 1 ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />}
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black uppercase tracking-widest mb-1">Optical Verification</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Standard baseline for image analysis.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors", step >= 2 ? "bg-sage border-sage text-white" : "border-gray-100")}>
                                            {step > 2 ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />}
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black uppercase tracking-widest mb-1">Archive Metadata</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Categorization and size consistency check.</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors", step >= 3 ? "bg-sage border-sage text-white" : "border-gray-100")}>
                                            {step > 3 ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />}
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black uppercase tracking-widest mb-1">Earnings Elasticity</div>
                                            <div className="text-[10px] text-gray-400 font-medium">Algorithmic pricing sugesstions.</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-brilliant-rose/10 p-10 rounded-[3rem] space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <Sparkles className="text-brilliant-rose" size={20} />
                                    <h5 className="text-[11px] font-black uppercase tracking-widest">Protocol Tip</h5>
                                </div>
                                <p className="text-xs font-bold leading-relaxed text-brilliant-rose/80">
                                    Items with <span className="text-brilliant-rose font-black italic underline decoration-2 underline-offset-4">branded packaging shots</span> receive 42% more inquiries in their first 48 hours.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <AnimatePresence>
                {isPopupVisible && <AppPopup onClose={() => setIsPopupVisible(false)} />}
                {showCookie && <CookiePopup onAccept={() => setShowCookie(false)} />}
                {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
            </AnimatePresence>
        </main>
    );
}
