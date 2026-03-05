'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Package, Clock, Wallet, ArrowUpRight, Star, ShieldCheck, BarChart2, Download, Bell, X, ChevronRight, ChevronDown, CheckCircle2, AlertCircle, Plus, Edit2, ToggleLeft, ToggleRight, MessageCircle, RefreshCw, Target, Award, Zap, Calendar, Users, DollarSign, PieChart, Settings, HelpCircle, LogOut, Home, Tag, CreditCard, Check, Trash2, ChevronLeft, Search, Menu, Send, AlertTriangle, Filter, Moon, Sun, PanelLeftClose, PanelLeftOpen, MapPin, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...i) { return twMerge(clsx(i)); }
import { LENDER_DATA, INITIAL_DASHBOARD_DATA } from '@/data/mockData';

// Animated counter hook
function useCounter(target, duration = 1200) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (target === 0) { setVal(0); return; }
        let start = 0; const step = target / (duration / 16);
        const timer = setInterval(() => { start += step; if (start >= target) { setVal(target); clearInterval(timer); } else setVal(Math.round(start)); }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return val;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const MONTHS = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
const MONTHLY_VALS = [480, 380, 720, 940, 830, 690, 780, 1040, 1110, 1340, 1210, 1510];
const MAX_VAL = Math.max(...MONTHLY_VALS);

const ITEMS = [
    { id: 1, name: 'Archive Leather Coat', img: '/df1a394b-b28c-4796-8637-5bf014e97016.avif', price: 60, category: 'Outerwear', occupancy: 82, earn: 2160, rentals: 36, status: 'active' },
    { id: 2, name: 'Signature Archive Bag', img: '/bag1.avif', price: 35, category: 'Bags', occupancy: 74, earn: 1540, rentals: 44, status: 'active' },
    { id: 3, name: 'Sculptural Archive Bag', img: '/bag2-1.avif', price: 42, category: 'Bags', occupancy: 68, earn: 1134, rentals: 27, status: 'active' },
    { id: 4, name: 'Archive Edition Shoes', img: '/shoes1.avif', price: 28, category: 'Shoes', occupancy: 55, earn: 616, rentals: 22, status: 'paused' },
    { id: 5, name: 'Signature Archive Jacket', img: '/Jacket1.avif', price: 45, category: 'Outerwear', occupancy: 90, earn: 3150, rentals: 70, status: 'active' },
];

const RENTALS = [
    { id: 1, item: 'Archive Leather Coat', img: '/df1a394b-b28c-4796-8637-5bf014e97016.avif', renter: '@elena.g', avatar: 'https://i.pravatar.cc/150?u=12', end: '6 Mar', days: 3, earn: 180, status: 'active' },
    { id: 2, item: 'Signature Archive Bag', img: '/bag1.avif', renter: '@marcust', avatar: 'https://i.pravatar.cc/150?u=13', end: '8 Mar', days: 7, earn: 245, status: 'active' },
    { id: 3, item: 'Signature Archive Jacket', img: '/Jacket1.avif', renter: '@sophie.l', avatar: 'https://i.pravatar.cc/150?u=14', end: '10 Mar', days: 7, earn: 315, status: 'pending' },
    { id: 4, item: 'Sculptural Archive Bag', img: '/bag2-1.avif', renter: '@amara.d', avatar: 'https://i.pravatar.cc/150?u=15', end: '9 Mar', days: 4, earn: 168, status: 'active' },
];

const REQUESTS = [
    { id: 1, item: 'Archive Leather Coat', img: '/df1a394b-b28c-4796-8637-5bf014e97016.avif', renter: '@alexk', avatar: 'https://i.pravatar.cc/150?u=20', dates: '12–16 Mar', earn: 240, status: 'pending' },
    { id: 2, item: 'Signature Archive Jacket', img: '/Jacket1.avif', renter: '@zara.m', avatar: 'https://i.pravatar.cc/150?u=21', dates: '14–18 Mar', earn: 180, status: 'pending' },
];

const PAYOUTS = [
    { date: '1 Mar 2026', gross: 1066, fee: 106, net: 960, ref: 'PAY-2026-03' },
    { date: '1 Feb 2026', gross: 1244, fee: 124, net: 1120, ref: 'PAY-2026-02' },
    { date: '1 Jan 2026', gross: 933, fee: 93, net: 840, ref: 'PAY-2026-01' },
    { date: '1 Dec 2025', gross: 1489, fee: 149, net: 1340, ref: 'PAY-2025-12' },
];

const REVIEWS = [
    { id: 1, user: 'Elena G.', avatar: 'https://i.pravatar.cc/150?u=12', rating: 5, item: 'Leather Coat', comment: 'Pristine condition. Foued is the best lender on the platform!', date: '4 Mar 2026' },
    { id: 2, user: 'Marcus T.', avatar: 'https://i.pravatar.cc/150?u=13', rating: 5, item: 'Archive Bag', comment: 'Arrived on time, beautifully packaged. Will rent again.', date: '2 Mar 2026' },
    { id: 3, user: 'Sophie L.', avatar: 'https://i.pravatar.cc/150?u=14', rating: 4, item: 'Archive Jacket', comment: 'Loved the jacket, great communication from the lender.', date: '28 Feb 2026' },
];

const ACTIVITY = [
    { id: 1, type: 'booking', text: 'New booking request from @alexk for Leather Coat', time: '2h ago', icon: '📦' },
    { id: 2, type: 'review', text: '@elena.g left a 5★ review for Archive Leather Coat', time: '5h ago', icon: '⭐' },
    { id: 3, type: 'return', text: 'Sculptural Bag returned by @amara.d — inspect item', time: '1d ago', icon: '✅' },
    { id: 4, type: 'payout', text: 'Payout of £960 sent to your bank account', time: '5d ago', icon: '💸' },
    { id: 5, type: 'message', text: '@zara.m sent you a message about sizing', time: '6d ago', icon: '💬' },
];

const TOP_RENTERS = [
    { handle: '@elena.g', avatar: 'https://i.pravatar.cc/150?u=12', rentals: 8, spend: 1440 },
    { handle: '@marcust', avatar: 'https://i.pravatar.cc/150?u=13', rentals: 6, spend: 920 },
    { handle: '@sophie.l', avatar: 'https://i.pravatar.cc/150?u=14', rentals: 5, spend: 750 },
];

const CAL_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const INIT_BOOKED = [1, 2, 3, 6, 7, 8, 12, 13, 14, 15, 18, 19, 20, 21, 22, 25, 26];

const INIT_NOTIFS = [
    { key: 'bookings', label: 'New Booking Requests', sub: 'Notify when a renter requests your item', on: true },
    { key: 'returns', label: 'Rental Returns', sub: 'Alert when an item is due back', on: true },
    { key: 'reviews', label: 'New Reviews', sub: 'Get notified of new community feedback', on: true },
    { key: 'payouts', label: 'Payout Sent', sub: 'Confirmation when funds are transferred', on: true },
    { key: 'messages', label: 'New Messages', sub: 'Notify on incoming messages', on: false },
    { key: 'digest', label: 'Weekly Earnings Summary', sub: 'Email digest every Monday', on: true },
];

const NAV = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'items', label: 'My Items', icon: Package },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'reputation', label: 'Reputation', icon: Star },
    { id: 'activity', label: 'Activity', icon: Bell },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'faq', label: 'FAQ & Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [tab, setTab] = useState('overview');
    const [hoveredBar, setHoveredBar] = useState(null);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [wStep, setWStep] = useState('form');
    const [wAmount, setWAmount] = useState('420');
    const [items, setItems] = useState([]);
    const [requests, setRequests] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [userKey, setUserKey] = useState(null);
    const [activities, setActivities] = useState([]);
    const [goalAmount, setGoalAmount] = useState(2000);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [bookedDays, setBookedDays] = useState(INIT_BOOKED);
    const [notifs, setNotifs] = useState(INIT_NOTIFS);
    const [balance, setBalance] = useState(0);
    const [pendingPayout, setPendingPayout] = useState(0);
    const [editingPrice, setEditingPrice] = useState(null);
    const [priceInput, setPriceInput] = useState('');
    const [toastMsg, setToastMsg] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [cardNumber, setCardNumber] = useState('4829');
    const [cardExpiry, setCardExpiry] = useState('09/28');
    const [cardType, setCardType] = useState('VISA');
    const [calMonth, setCalMonth] = useState(2); // 0=Jan, 2=Mar
    const [calYear, setCalYear] = useState(2026);
    const [itemSearch, setItemSearch] = useState('');
    const [itemFilter, setItemFilter] = useState('all');
    const [reviewReplies, setReviewReplies] = useState({});
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [showDamageModal, setShowDamageModal] = useState(null);
    const [damageNote, setDamageNote] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [faqSearch, setFaqSearch] = useState('');


    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const firstDayOfWeek = (new Date(calYear, calMonth, 1).getDay() + 6) % 7;
    const calDaysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Computed KPIs
    const totalEarned = items.reduce((s, it) => s + it.earn, 0);
    const activeRentals = rentals.filter(r => r.status === 'active').length;
    const thisMonth = MONTHLY_VALS[MONTHLY_VALS.length - 1];
    const lastMonth = MONTHLY_VALS[MONTHLY_VALS.length - 2];
    const monthPct = lastMonth ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0;
    const avgOccupancy = items.length ? Math.round(items.reduce((s, it) => s + it.occupancy, 0) / items.length) : 0;
    const totalRentals = items.reduce((s, it) => s + it.rentals, 0);
    const avgEarnPerRental = totalRentals ? (totalEarned / totalRentals).toFixed(2) : '0';
    const earned = thisMonth;
    const goalPct = Math.min(100, Math.round((earned / goalAmount) * 100));
    const unreadCount = activities.length;
    const filteredItems = items.filter(it => {
        const matchSearch = it.name.toLowerCase().includes(itemSearch.toLowerCase());
        const matchFilter = itemFilter === 'all' || it.category.toLowerCase() === itemFilter.toLowerCase() || it.status === itemFilter;
        return matchSearch && matchFilter;
    });

    // Animated counter values
    const animTotal = useCounter(totalEarned);
    const animMonth = useCounter(thisMonth);
    const animBalance = useCounter(balance, 600);
    const animPending = useCounter(pendingPayout, 800);

    const showToast = useCallback((msg) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); }, []);

    // Load persisted data & auth check — per-user sync
    useEffect(() => {
        const s = localStorage.getItem('archiv-user');
        if (!s) { router.push('/auth/sign-in'); return; }
        const parsed = JSON.parse(s);
        setUser(parsed);
        const handle = (parsed.handle || parsed.email || 'default');
        const userSlug = handle.replace('@', '');
        setUserKey(userSlug);

        // ── Per-user Data Initialization ──────────────────────────
        // Check if this user is one of our featured lenders in mockData
        const featuredData = LENDER_DATA[handle];

        const storedItems = localStorage.getItem(`archiv-items-${userSlug}`);
        if (storedItems) {
            setItems(JSON.parse(storedItems));
        } else {
            setItems(featuredData?.items || INITIAL_DASHBOARD_DATA.items);
        }

        const storedRentals = localStorage.getItem(`archiv-rentals-${userSlug}`);
        if (storedRentals) {
            setRentals(JSON.parse(storedRentals));
        } else {
            setRentals(featuredData?.rentalsData || INITIAL_DASHBOARD_DATA.rentals);
        }

        const storedRequests = localStorage.getItem(`archiv-requests-${userSlug}`);
        if (storedRequests) {
            setRequests(JSON.parse(storedRequests));
        } else {
            setRequests(INITIAL_DASHBOARD_DATA.requests);
        }

        const storedActivities = localStorage.getItem(`archiv-activities-${userSlug}`);
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities));
        } else {
            setActivities(INITIAL_DASHBOARD_DATA.activities);
        }

        const storedBalance = localStorage.getItem(`archiv-balance-${userSlug}`);
        if (storedBalance !== null) {
            setBalance(Number(storedBalance));
        } else {
            setBalance(featuredData?.balance || INITIAL_DASHBOARD_DATA.balance);
        }

        const storedPending = localStorage.getItem(`archiv-pending-${userSlug}`);
        if (storedPending !== null) {
            setPendingPayout(Number(storedPending));
        } else {
            setPendingPayout(featuredData?.pendingPayout || 0);
        }

        // ── Shared Preferences ──────────────────────────────────────
        const g = localStorage.getItem(`archiv-goal-${userSlug}`);
        if (g) setGoalAmount(Number(g));
        const n = localStorage.getItem(`archiv-notifs-${userSlug}`);
        if (n) setNotifs(JSON.parse(n));
        const b = localStorage.getItem(`archiv-booked-${userSlug}`);
        if (b) setBookedDays(JSON.parse(b));
        const rr = localStorage.getItem(`archiv-replies-${userSlug}`);
        if (rr) setReviewReplies(JSON.parse(rr));
        const dm = localStorage.getItem('archiv-dark');
        if (dm) setDarkMode(dm === 'true');
        setTimeout(() => setLoaded(true), 300);
    }, [router]);

    // Persist — per-user keys (only once userKey is set)
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-items-${userKey}`, JSON.stringify(items)); }, [items, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-rentals-${userKey}`, JSON.stringify(rentals)); }, [rentals, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-requests-${userKey}`, JSON.stringify(requests)); }, [requests, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-activities-${userKey}`, JSON.stringify(activities)); }, [activities, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-balance-${userKey}`, String(balance)); }, [balance, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-goal-${userKey}`, String(goalAmount)); }, [goalAmount, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-notifs-${userKey}`, JSON.stringify(notifs)); }, [notifs, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-booked-${userKey}`, JSON.stringify(bookedDays)); }, [bookedDays, userKey]);
    useEffect(() => { if (userKey) localStorage.setItem(`archiv-replies-${userKey}`, JSON.stringify(reviewReplies)); }, [reviewReplies, userKey]);
    useEffect(() => { localStorage.setItem('archiv-dark', String(darkMode)); }, [darkMode]);
    useEffect(() => { setMobileMenuOpen(false); }, [tab]);

    // Keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            if (e.key === 'Escape') { setShowWithdraw(false); setShowPaymentModal(false); setShowDamageModal(null); }
            const idx = Number(e.key);
            if (idx >= 1 && idx <= NAV.length) setTab(NAV[idx - 1].id);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const toggleItem = (id) => { setItems(prev => prev.map(it => it.id === id ? { ...it, status: it.status === 'active' ? 'paused' : 'active' } : it)); const it = items.find(x => x.id === id); showToast(`${it?.name} ${it?.status === 'active' ? 'paused' : 'activated'}`); };
    const deleteItem = (id) => { const it = items.find(x => x.id === id); setItems(prev => prev.filter(x => x.id !== id)); setShowDeleteConfirm(null); showToast(`${it?.name} removed`); };
    const handleRequest = (id, action) => { setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r)); showToast(`Request ${action}`); if (action === 'approved') { const req = requests.find(r => r.id === id); if (req) setRentals(prev => [...prev, { id: Date.now(), item: req.item, img: req.img, renter: req.renter, avatar: req.avatar, end: req.dates.split('–')[1]?.trim() || '20 Mar', days: 4, earn: req.earn, status: 'active' }]); } };
    const markReturned = (id) => { setRentals(prev => prev.map(r => r.id === id ? { ...r, status: 'returned' } : r)); setActivities(prev => [{ id: Date.now(), type: 'return', text: `Item marked as returned`, time: 'Just now', icon: '✅' }, ...prev]); showToast('Item marked as returned'); };
    const reportDamage = (id) => { setRentals(prev => prev.map(r => r.id === id ? { ...r, status: 'damaged' } : r)); setActivities(prev => [{ id: Date.now(), type: 'dispute', text: `Damage reported: ${damageNote || 'No details'}`, time: 'Just now', icon: '⚠️' }, ...prev]); setShowDamageModal(null); setDamageNote(''); showToast('Damage report filed'); };
    const handleWithdraw = () => { const amt = Math.min(Number(wAmount), balance); if (amt <= 0) return; setBalance(prev => Math.max(0, prev - amt)); setWStep('success'); setActivities(prev => [{ id: Date.now(), type: 'payout', text: `Withdrawal of £${amt} initiated`, time: 'Just now', icon: '💸' }, ...prev]); setTimeout(() => { setShowWithdraw(false); setWStep('form'); }, 3000); };
    const savePaymentMethod = () => { if (cardNumber.length < 4) return; setShowPaymentModal(false); showToast('Payment method updated'); };
    const toggleCalDay = (d) => setBookedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    const toggleNotif = (key) => setNotifs(prev => prev.map(n => n.key === key ? { ...n, on: !n.on } : n));
    const dismissActivity = (id) => setActivities(prev => prev.filter(a => a.id !== id));
    const updatePrice = (id) => { const val = Number(priceInput); if (val > 0) { setItems(prev => prev.map(it => it.id === id ? { ...it, price: val } : it)); showToast('Price updated'); } setEditingPrice(null); };
    const submitReply = (reviewId) => { if (!replyText.trim()) return; setReviewReplies(prev => ({ ...prev, [reviewId]: replyText })); setReplyingTo(null); setReplyText(''); showToast('Reply sent'); };
    const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
    const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };
    const handleSignOut = () => {
        // Only remove the session token — per-user data stays for next sign-in
        localStorage.removeItem('archiv-user');
        localStorage.removeItem('archiv-dark');
        router.push('/');
    };
    const downloadTaxReport = () => { const csv = 'Date,Gross,Fee,Net,Reference\n' + PAYOUTS.map(p => `${p.date},${p.gross},${p.fee},${p.net},${p.ref}`).join('\n'); const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'archiv-tax-report.csv'; a.click(); URL.revokeObjectURL(url); showToast('Tax report downloaded'); };
    const applyPriceSuggestion = () => { setItems(prev => prev.map(it => it.id === 4 ? { ...it, price: 23 } : it)); showToast('Price updated to £23/day for Archive Edition Shoes'); };

    // Computed category breakdown
    const catData = (() => {
        const cats = {};
        items.forEach(it => { cats[it.category] = (cats[it.category] || 0) + it.earn; });
        const total = Object.values(cats).reduce((s, v) => s + v, 0) || 1;
        return Object.entries(cats).map(([cat, earn]) => ({ cat, earn, pct: Math.round((earn / total) * 100) })).sort((a, b) => b.earn - a.earn);
    })();

    // Skeleton
    const Skeleton = ({ w = 'w-full', h = 'h-6' }) => <div className={cn('rounded-xl animate-pulse', w, h, darkMode ? 'bg-white/10' : 'bg-charcoal/10')} />;

    const Stat = ({ label, value, sub, icon: Icon, accent }) => (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={cn('rounded-3xl p-6 border transition-all hover:-translate-y-0.5 cursor-default', accent ? 'bg-charcoal text-cream border-charcoal shadow-xl' : darkMode ? 'bg-white/5 border-white/10 hover:shadow-lg' : 'bg-white border-charcoal/5 hover:shadow-lg')}>
            <div className="flex items-center justify-between mb-4">
                <div className={cn('text-[9px] font-black uppercase tracking-[0.3em]', accent ? 'text-cream/40' : darkMode ? 'text-white/30' : 'text-charcoal/30')}>{label}</div>
                {Icon && <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', accent ? 'bg-white/10' : darkMode ? 'bg-white/5' : 'bg-charcoal/5')}><Icon size={14} className={accent ? 'text-cream/60' : darkMode ? 'text-white/40' : 'text-charcoal/40'} /></div>}
            </div>
            <div className={cn('text-3xl font-serif italic mb-1', accent ? 'text-cream' : darkMode ? 'text-white' : 'text-charcoal')}>{value}</div>
            {sub && <div className={cn('text-[10px] font-bold', accent ? 'text-cream/30' : darkMode ? 'text-white/20' : 'text-charcoal/30')}>{sub}</div>}
        </motion.div>
    );

    // ── Sections ──────────────────────────────────────────────────────────────
    const Overview = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Total Earned" value={`£${animTotal.toLocaleString()}`} sub="All time" icon={TrendingUp} accent />
                <Stat label="This Month" value={`£${animMonth.toLocaleString()}`} sub={`${monthPct >= 0 ? '+' : ''}${monthPct}% vs last month`} icon={BarChart2} />
                <Stat label="Active Rentals" value={String(activeRentals)} sub={`${rentals.filter(r => r.status === 'active' && r.days <= 3).length} ending this week`} icon={Package} />
                <Stat label="Pending Payout" value={`£${animPending.toLocaleString()}`} sub="Processing next batch" icon={Clock} />
            </div>
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl font-serif italic">Monthly Earnings</div>
                    <div className="text-brilliant-rose font-serif italic text-2xl">£{totalEarned.toLocaleString()} <span className="text-[9px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full ml-2">+{monthPct}%</span></div>
                </div>
                <div className="flex items-end gap-1.5 h-36 relative">
                    {MONTHLY_VALS.map((v, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer" onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                            {hoveredBar === i && <div className="absolute -top-8 bg-charcoal text-cream text-[9px] font-black px-2 py-1 rounded-lg" style={{ left: `${(i / MONTHLY_VALS.length) * 100}%`, transform: 'translateX(-50%)' }}> £{v}</div>}
                            <motion.div initial={{ height: 0 }} animate={{ height: `${(v / MAX_VAL) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }} className={cn('w-full rounded-xl', i === 11 ? 'bg-brilliant-rose' : hoveredBar === i ? 'bg-charcoal' : 'bg-charcoal/10')} />
                            <span className={cn('text-[8px] font-black', i === 11 ? 'text-brilliant-rose' : 'text-charcoal/25')}>{MONTHS[i]}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Quick: recent rentals + activity */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border border-charcoal/5 rounded-3xl p-6">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-4">Active Rentals</div>
                    {rentals.filter(r => r.status === 'active').slice(0, 3).map(r => (
                        <div key={r.id} className="flex items-center gap-4 py-3 border-b border-charcoal/5 last:border-0">
                            <img src={r.img} alt="" className="w-12 h-12 rounded-xl object-cover" />
                            <div className="flex-1 min-w-0"><div className="text-xs font-black truncate">{r.item}</div><div className="text-[10px] text-charcoal/40 font-bold">{r.renter} · ends {r.end}</div></div>
                            <div className="text-sm font-serif italic text-brilliant-rose">£{r.earn}</div>
                        </div>
                    ))}
                </div>
                <div className="bg-white border border-charcoal/5 rounded-3xl p-6">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-4">Activity Feed</div>
                    {activities.slice(0, 4).map(a => (
                        <div key={a.id} className="flex items-start gap-3 py-2.5 border-b border-charcoal/5 last:border-0 group">
                            <span className="text-lg leading-none mt-0.5">{a.icon}</span>
                            <div className="flex-1 min-w-0"><div className="text-[11px] font-bold text-charcoal leading-snug">{a.text}</div><div className="text-[9px] text-charcoal/30 font-bold mt-1">{a.time}</div></div>
                            <button onClick={() => dismissActivity(a.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-charcoal/5 rounded-lg"><X size={12} className="text-charcoal/30" /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const Analytics = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Stat label="Avg Earning/Rental" value={`£${avgEarnPerRental}`} icon={TrendingUp} />
                <Stat label="Avg Duration" value="5.2 Days" icon={Calendar} />
                <Stat label="Repeat Renters" value="68%" icon={Users} />
                <Stat label="Occupancy Rate" value={`${avgOccupancy}%`} sub="Across all items" icon={PieChart} accent />
            </div>
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Item Performance</div>
                <div className="space-y-4">
                    {[...items].sort((a, b) => b.earn - a.earn).map((it, i) => (
                        <div key={it.id} className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-charcoal/20 w-4">{i + 1}</span>
                            <img src={it.img} alt="" className="w-10 h-10 rounded-xl object-cover" />
                            <div className="flex-1 min-w-0"><div className="text-[11px] font-black truncate">{it.name}</div><div className="text-[9px] text-charcoal/30 font-bold">{it.category} · {it.rentals} rentals</div></div>
                            <div className="text-right mr-4"><div className="text-xs font-black">£{it.earn}</div><div className="text-[9px] text-charcoal/30">{it.occupancy}% occ.</div></div>
                            <div className="w-24 h-2 bg-charcoal/5 rounded-full overflow-hidden"><div className="h-full bg-brilliant-rose rounded-full" style={{ width: `${it.occupancy}%` }} /></div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Category split */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Revenue by Category</div>
                    {catData.map(c => (
                        <div key={c.cat} className="mb-4">
                            <div className="flex justify-between text-xs font-black mb-1.5"><span>{c.cat}</span><span>£{c.earn.toLocaleString()}</span></div>
                            <div className="h-2.5 bg-charcoal/5 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.8 }} className="h-full bg-charcoal rounded-full" /></div>
                        </div>
                    ))}
                </div>
                <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Revenue Forecast</div>
                    <div className="text-5xl font-serif italic mb-2">£1,820</div>
                    <div className="text-[10px] text-charcoal/30 font-bold mb-6">Projected for March 2026 based on confirmed bookings</div>
                    <div className="space-y-2">
                        {[{ label: 'Confirmed bookings', val: '£908' }, { label: 'Pending requests', val: '£420' }, { label: 'Avg tail bookings', val: '£492' }].map(f => (
                            <div key={f.label} className="flex justify-between text-xs"><span className="text-charcoal/40 font-bold">{f.label}</span><span className="font-black">{f.val}</span></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const Bookings = () => (
        <div className="space-y-6">
            {/* Booking requests */}
            {requests.filter(r => r.status === 'pending').length > 0 && (
                <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-brilliant-rose animate-pulse" />
                        <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Booking Requests ({requests.filter(r => r.status === 'pending').length})</div>
                    </div>
                    <div className="space-y-4">
                        {requests.filter(r => r.status === 'pending').map(r => (
                            <div key={r.id} className="flex items-center gap-4 p-4 border border-charcoal/5 rounded-2xl">
                                <img src={r.img} alt="" className="w-14 h-14 rounded-xl object-cover" />
                                <img src={r.avatar} alt="" className="w-8 h-8 rounded-full object-cover -ml-6 mt-6 border-2 border-white" />
                                <div className="flex-1 min-w-0"><div className="text-xs font-black truncate">{r.item}</div><div className="text-[10px] text-charcoal/40 font-bold">{r.renter} · {r.dates}</div></div>
                                <div className="text-sm font-serif italic">£{r.earn}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleRequest(r.id, 'approved')} className="h-9 px-4 bg-charcoal text-cream rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-brilliant-rose transition-all">Accept</button>
                                    <button onClick={() => handleRequest(r.id, 'declined')} className="h-9 px-4 border border-charcoal/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:border-red-300 hover:text-red-400 transition-all">Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Handled requests history */}
            {requests.filter(r => r.status !== 'pending').length > 0 && (
                <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Recent Decisions</div>
                    <div className="space-y-3">
                        {requests.filter(r => r.status !== 'pending').map(r => (
                            <div key={r.id} className="flex items-center gap-4 p-3 rounded-2xl bg-charcoal/[0.02]">
                                <img src={r.img} alt="" className="w-10 h-10 rounded-xl object-cover opacity-60" />
                                <div className="flex-1 min-w-0"><div className="text-[11px] font-bold text-charcoal/50 truncate">{r.item}</div><div className="text-[9px] text-charcoal/30">{r.renter} · {r.dates}</div></div>
                                <span className={cn('text-[8px] font-black uppercase px-3 py-1 rounded-full border', r.status === 'approved' ? 'text-green-600 bg-green-50 border-green-100' : 'text-red-500 bg-red-50 border-red-100')}>{r.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Calendar */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-charcoal/10 flex items-center justify-center hover:bg-charcoal/5 transition-colors"><ChevronLeft size={14} /></button>
                        <div className="text-sm font-black min-w-[140px] text-center">{MONTH_NAMES[calMonth]} {calYear}</div>
                        <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-charcoal/10 flex items-center justify-center hover:bg-charcoal/5 transition-colors"><ChevronRight size={14} /></button>
                    </div>
                    <div className="text-[9px] text-charcoal/40 font-bold">Click days to block/unblock</div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d} className="text-[9px] font-black text-charcoal/30">{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
                    {calDaysArray.map(d => (
                        <div key={d} onClick={() => toggleCalDay(d)} className={cn('aspect-square flex items-center justify-center rounded-xl text-[11px] font-black transition-all cursor-pointer hover:scale-105',
                            bookedDays.includes(d) ? 'bg-brilliant-rose text-white shadow-sm' : 'bg-charcoal/5 text-charcoal/50 hover:bg-charcoal/10'
                        )}>{d}</div>
                    ))}
                </div>
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-charcoal/5">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-brilliant-rose" /><span className="text-[9px] font-black text-charcoal/40">Booked ({bookedDays.length} days)</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-charcoal/10" /><span className="text-[9px] font-black text-charcoal/40">Available ({daysInMonth - bookedDays.length} days)</span></div>
                </div>
            </div>
            {/* Active + upcoming returns */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Active Rentals & Upcoming Returns</div>
                {rentals.filter(r => r.status !== 'returned').length === 0 ? (
                    <div className="text-center py-12 text-charcoal/20"><Package size={32} className="mx-auto mb-3" /><div className="text-sm font-bold">No active rentals</div></div>
                ) : (
                    <div className="space-y-3">
                        {rentals.filter(r => r.status !== 'returned').map(r => (
                            <div key={r.id} className="flex items-center gap-4 p-4 rounded-2xl border border-charcoal/5 hover:bg-charcoal/[0.02] transition-all">
                                <img src={r.img} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0"><div className="text-xs font-black truncate">{r.item}</div><div className="text-[10px] text-charcoal/40 font-bold">{r.renter} · due back {r.end}</div></div>
                                <div className="text-right"><div className="text-sm font-serif italic">£{r.earn}</div><div className="text-[9px] text-charcoal/30">{r.days}d</div></div>
                                <span className={cn('text-[8px] font-black uppercase px-3 py-1 rounded-full border', r.status === 'active' ? 'text-green-600 bg-green-50 border-green-100' : r.status === 'damaged' ? 'text-red-600 bg-red-50 border-red-100' : 'text-amber-600 bg-amber-50 border-amber-100')}>{r.status}</span>
                                {r.status === 'active' && (
                                    <div className="flex gap-1.5 flex-shrink-0">
                                        <button onClick={() => markReturned(r.id)} className="h-8 px-3 rounded-full border border-charcoal/10 text-[8px] font-black uppercase tracking-widest hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all">Returned</button>
                                        <button onClick={() => setShowDamageModal(r.id)} className="h-8 px-3 rounded-full border border-red-100 text-[8px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 hover:border-red-200 transition-all">Damage</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const Items = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-1">Your Catalogue</div>
                    <div className="text-2xl font-serif italic">Listed Items</div>
                </div>
                <Link href="/lend" className="h-11 px-6 rounded-full bg-charcoal text-cream font-black text-[9px] uppercase tracking-widest hover:bg-brilliant-rose transition-all flex items-center gap-2">
                    <Plus size={13} /> Add New Item
                </Link>
            </div>
            {/* Search & Filter */}
            <div className="flex items-center gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
                    <input type="text" value={itemSearch} onChange={e => setItemSearch(e.target.value)} placeholder="Search items..." className="w-full h-11 bg-white border border-charcoal/5 rounded-2xl pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all" />
                </div>
                <div className="flex gap-1.5">
                    {['all', 'Outerwear', 'Bags', 'Shoes', 'active', 'paused'].map(f => (
                        <button key={f} onClick={() => setItemFilter(f)} className={cn('h-9 px-3 rounded-full text-[8px] font-black uppercase tracking-widest border transition-all', itemFilter === f ? 'bg-charcoal text-cream border-charcoal' : 'bg-white border-charcoal/10 text-charcoal/40 hover:border-charcoal/20')}>{f}</button>
                    ))}
                </div>
            </div>
            <div className="bg-white border border-charcoal/5 rounded-3xl p-2 overflow-hidden">
                <table className="w-full">
                    <thead><tr className="border-b border-charcoal/5">
                        {['Item', 'Category', 'Price/day', 'Occupancy', 'Total Earned', 'Status', ''].map(h => <th key={h} className="text-left text-[9px] font-black uppercase tracking-widest text-charcoal/30 px-4 py-3">{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {filteredItems.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-12 text-charcoal/20 text-sm font-bold">No items match your search</td></tr>
                        ) : filteredItems.map(it => (
                            <tr key={it.id} className="border-b border-charcoal/5 last:border-0 hover:bg-charcoal/[0.01] transition-colors">
                                <td className="px-4 py-4"><div className="flex items-center gap-3"><img src={it.img} alt="" className="w-10 h-10 rounded-xl object-cover" /><span className="text-xs font-black max-w-[120px] truncate">{it.name}</span></div></td>
                                <td className="px-4 py-4 text-[10px] font-bold text-charcoal/40">{it.category}</td>
                                <td className="px-4 py-4">
                                    {editingPrice === it.id ? (
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-bold text-charcoal/40">£</span>
                                            <input autoFocus type="number" value={priceInput} onChange={e => setPriceInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && updatePrice(it.id)} className="w-14 h-8 bg-charcoal/5 border border-charcoal/10 rounded-lg px-2 text-xs font-black focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20" />
                                            <button onClick={() => updatePrice(it.id)} className="p-1 hover:bg-green-50 rounded-lg"><Check size={12} className="text-green-500" /></button>
                                            <button onClick={() => setEditingPrice(null)} className="p-1 hover:bg-red-50 rounded-lg"><X size={12} className="text-red-400" /></button>
                                        </div>
                                    ) : (
                                        <button onClick={() => { setEditingPrice(it.id); setPriceInput(String(it.price)); }} className="text-sm font-serif italic hover:text-brilliant-rose transition-colors cursor-pointer">£{it.price}</button>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-2"><div className="w-20 h-1.5 bg-charcoal/5 rounded-full overflow-hidden"><div className="h-full bg-brilliant-rose rounded-full" style={{ width: `${it.occupancy}%` }} /></div><span className="text-[10px] font-black">{it.occupancy}%</span></div>
                                </td>
                                <td className="px-4 py-4 text-xs font-black">£{it.earn}</td>
                                <td className="px-4 py-4">
                                    <span className={cn('text-[8px] font-black uppercase px-2.5 py-1 rounded-full border', it.status === 'active' ? 'text-green-600 bg-green-50 border-green-100' : 'text-charcoal/40 bg-charcoal/5 border-charcoal/10')}>{it.status}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <button onClick={() => toggleItem(it.id)} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors" title={it.status === 'active' ? 'Pause' : 'Activate'}>
                                            {it.status === 'active' ? <ToggleRight size={18} className="text-green-500" /> : <ToggleLeft size={18} className="text-charcoal/30" />}
                                        </button>
                                        <Link href={`/product/${it.id}`} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"><Edit2 size={14} className="text-charcoal/30" /></Link>
                                        {showDeleteConfirm === it.id ? (
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => deleteItem(it.id)} className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"><Check size={14} className="text-red-500" /></button>
                                                <button onClick={() => setShowDeleteConfirm(null)} className="p-2 hover:bg-charcoal/5 rounded-lg transition-colors"><X size={14} className="text-charcoal/30" /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setShowDeleteConfirm(it.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 size={14} className="text-charcoal/15 hover:text-red-400" /></button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pricing suggestions */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
                <div className="flex items-start gap-3">
                    <Zap size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-2">ARCHIV Insights</div>
                        <div className="text-sm font-bold text-amber-900 mb-1">Reduce Archive Edition Shoes by £5 to boost bookings</div>
                        <div className="text-xs text-amber-700/70">Items priced at £23/day in the Shoes category have 40% higher occupancy in your tier.</div>
                    </div>
                    <button onClick={applyPriceSuggestion} className="h-9 px-4 bg-amber-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-amber-700 transition-all flex-shrink-0">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );

    const Financials = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-charcoal text-cream rounded-3xl p-6 lg:col-span-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brilliant-rose/20 blur-2xl rounded-full -translate-y-1/2" />
                    <div className="relative z-10">
                        <div className="text-[9px] font-black uppercase tracking-widest text-cream/40 mb-3">Available to Withdraw</div>
                        <div className="text-4xl font-serif italic mb-1">£{balance}</div>
                        <div className="text-[10px] text-cream/30 font-bold mb-6">{balance > 0 ? 'From completed rentals' : 'No balance available'}</div>
                        <button onClick={() => setShowWithdraw(true)} className="w-full h-11 rounded-full bg-brilliant-rose text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all flex items-center justify-center gap-2">
                            <ArrowUpRight size={13} /> Withdraw Now
                        </button>
                    </div>
                </div>
                <div className="bg-white border border-charcoal/5 rounded-3xl p-6 lg:col-span-2">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-5">Earnings Breakdown (Feb 2026)</div>
                    <div className="space-y-3">
                        {[{ label: 'Gross Rental Income', val: '£1,677', sub: 'Before platform fee' }, { label: 'ARCHIV Platform Fee (10%)', val: '-£167', sub: 'Per rental after completion', neg: true }, { label: 'Net Earnings', val: '£1,510', sub: 'Paid to your account', bold: true }].map(f => (
                            <div key={f.label} className={cn('flex justify-between items-center py-3 border-b border-charcoal/5 last:border-0', f.bold && 'pt-4')}>
                                <div><div className={cn('text-xs font-black', f.neg && 'text-red-500')}>{f.label}</div><div className="text-[9px] text-charcoal/30 font-bold">{f.sub}</div></div>
                                <div className={cn('text-base font-serif italic', f.neg ? 'text-red-500' : f.bold ? 'text-charcoal' : 'text-charcoal/60')}>{f.val}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Payout history */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Payout History</div>
                    <button onClick={downloadTaxReport} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-charcoal/30 hover:text-charcoal transition-colors border border-charcoal/10 px-4 py-2 rounded-full hover:border-charcoal/20">
                        <Download size={12} /> Tax Report
                    </button>
                </div>
                <div className="space-y-0">
                    {PAYOUTS.map((p, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-charcoal/5 last:border-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center"><ShieldCheck size={14} className="text-green-500" /></div>
                                <div><div className="text-xs font-black">£{p.net.toLocaleString()} net</div><div className="text-[9px] text-charcoal/30 font-bold">{p.ref} · gross £{p.gross} · fee £{p.fee}</div></div>
                            </div>
                            <div className="text-right"><div className="text-[10px] font-bold text-charcoal/40">{p.date}</div><span className="text-[8px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100 mt-1 inline-block">Paid</span></div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Payment method */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Payout Method</div>
                    <button onClick={() => setShowPaymentModal(true)} className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 hover:text-brilliant-rose transition-colors">Change</button>
                </div>
                <div className="flex items-center gap-4 p-5 bg-charcoal/5 rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-charcoal flex items-center justify-center"><CreditCard size={20} className="text-cream" /></div>
                    <div><div className="text-sm font-black">•••• •••• •••• {cardNumber}</div><div className="text-[10px] text-charcoal/40 font-bold">{cardType} · Expires {cardExpiry}</div></div>
                    <div className="ml-auto"><span className="text-[8px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">Default</span></div>
                </div>
            </div>
        </div>
    );

    const Reputation = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <Stat label="Overall Rating" value="5.0 ★" sub="248 reviews" icon={Star} accent />
                <Stat label="Followers" value={String(user?.followers || 0)} sub="Total community reach" icon={Users} />
                <Stat label="Following" value={String(user?.following || 0)} sub="Network size" icon={Target} />
                <Stat label="Response Rate" value="100%" sub="Avg 12min reply" icon={MessageCircle} />
                <Stat label="Community Rank" value="Top 1%" sub="Archiv Elite" icon={Award} />
                <Stat label="Trust Score" value="100%" sub="0 disputes" icon={ShieldCheck} />
            </div>
            {/* Star breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Rating Breakdown</div>
                    {[{ stars: 5, pct: 92, count: 228 }, { stars: 4, pct: 6, count: 15 }, { stars: 3, pct: 2, count: 5 }, { stars: 2, pct: 0, count: 0 }, { stars: 1, pct: 0, count: 0 }].map(r => (
                        <div key={r.stars} className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-black w-4">{r.stars}★</span>
                            <div className="flex-1 h-2 bg-charcoal/5 rounded-full overflow-hidden"><div className="h-full bg-brilliant-rose rounded-full" style={{ width: `${r.pct}%` }} /></div>
                            <span className="text-[9px] font-bold text-charcoal/30 w-8">{r.count}</span>
                        </div>
                    ))}
                </div>
                <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                    <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Top Renters</div>
                    {TOP_RENTERS.map((r, i) => (
                        <div key={r.handle} className="flex items-center gap-4 py-3 border-b border-charcoal/5 last:border-0">
                            <span className="text-[10px] font-black text-charcoal/20">{i + 1}</span>
                            <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                            <div className="flex-1"><div className="text-xs font-black">{r.handle}</div><div className="text-[9px] text-charcoal/30 font-bold">{r.rentals} rentals</div></div>
                            <div className="text-sm font-serif italic">£{r.spend}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Recent reviews */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Recent Reviews</div>
                <div className="space-y-4">
                    {REVIEWS.map(r => (
                        <div key={r.id} className="p-5 border border-charcoal/5 rounded-2xl hover:border-charcoal/10 transition-all">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <img src={r.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                                    <div><div className="text-xs font-black">{r.user}</div><div className="text-[9px] text-charcoal/30 font-bold">{r.date} · {r.item}</div></div>
                                </div>
                                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < r.rating ? '#FFD700' : 'none'} className={i < r.rating ? 'text-[#FFD700]' : 'text-charcoal/10'} />)}</div>
                            </div>
                            <p className="text-xs text-charcoal/60 font-medium italic">"{r.comment}"</p>
                            {reviewReplies[r.id] ? (
                                <div className="mt-3 pl-4 border-l-2 border-brilliant-rose/30">
                                    <div className="text-[9px] font-black text-brilliant-rose mb-1">Your Reply</div>
                                    <p className="text-xs text-charcoal/50 font-medium">{reviewReplies[r.id]}</p>
                                </div>
                            ) : replyingTo === r.id ? (
                                <div className="mt-3 flex items-center gap-2">
                                    <input autoFocus type="text" value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitReply(r.id)} placeholder="Write a reply..." className="flex-1 h-10 bg-charcoal/5 border border-charcoal/10 rounded-xl px-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20" />
                                    <button onClick={() => submitReply(r.id)} className="h-10 w-10 rounded-xl bg-charcoal flex items-center justify-center hover:bg-brilliant-rose transition-all"><Send size={12} className="text-cream" /></button>
                                    <button onClick={() => { setReplyingTo(null); setReplyText(''); }} className="h-10 w-10 rounded-xl border border-charcoal/10 flex items-center justify-center hover:bg-charcoal/5 transition-all"><X size={12} /></button>
                                </div>
                            ) : (
                                <button onClick={() => setReplyingTo(r.id)} className="mt-3 text-[9px] font-black uppercase tracking-widest text-charcoal/30 hover:text-brilliant-rose transition-colors">Reply</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const Activity = () => (
        <div className="bg-white border border-charcoal/5 rounded-3xl p-8 space-y-1">
            <div className="flex items-center justify-between mb-6">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Recent Activity</div>
                {activities.length > 0 && <button onClick={() => setActivities([])} className="text-[9px] font-black text-charcoal/30 hover:text-red-400 transition-colors">Clear All</button>}
            </div>
            {activities.length === 0 ? (
                <div className="text-center py-12 text-charcoal/20"><Bell size={32} className="mx-auto mb-3" /><div className="text-sm font-bold">All caught up!</div></div>
            ) : activities.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-charcoal/[0.02] transition-colors border border-transparent hover:border-charcoal/5 group">
                    <div className="w-10 h-10 rounded-2xl bg-charcoal/5 flex items-center justify-center flex-shrink-0 text-lg">{a.icon}</div>
                    <div className="flex-1 min-w-0"><div className="text-sm font-bold text-charcoal leading-snug">{a.text}</div><div className="text-[9px] text-charcoal/30 font-bold mt-1">{a.time}</div></div>
                    <button onClick={() => dismissActivity(a.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg flex-shrink-0" title="Dismiss"><X size={14} className="text-charcoal/30 hover:text-red-400" /></button>
                </motion.div>
            ))}
        </div>
    );

    const Goals = () => (
        <div className="space-y-6">
            {/* Lender tier */}
            <div className="bg-charcoal text-cream rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brilliant-rose/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-cream/40 mb-3">Your Lender Status</div>
                        <div className="text-4xl font-serif italic mb-2">Archive Elite</div>
                        <div className="text-[10px] text-cream/40 font-bold">Top 1% of all lenders on ARCHIV</div>
                    </div>
                    <div className="w-20 h-20 rounded-full border-4 border-brilliant-rose flex items-center justify-center shadow-xl shadow-brilliant-rose/20">
                        <Award size={36} className="text-brilliant-rose" />
                    </div>
                </div>
                <div className="mt-8 relative z-10">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-cream/30 mb-2"><span>Current: Elite</span><span>Next: Archive Legend</span></div>
                    <div className="h-2 bg-white/10 rounded-full"><div className="h-full rounded-full bg-brilliant-rose" style={{ width: '73%' }} /></div>
                    <div className="text-[9px] text-cream/30 font-bold mt-1.5">73% of the way to Archive Legend — 27 more rentals needed</div>
                </div>
            </div>
            {/* Monthly goal */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <div><div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-1">Monthly Earnings Goal</div><div className="text-xl font-serif italic">March 2026</div></div>
                    <div className="text-right"><div className="text-3xl font-serif italic text-brilliant-rose">£{earned}</div><div className="text-[10px] text-charcoal/30 font-bold">of £{goalAmount} target</div></div>
                </div>
                <div className="h-4 bg-charcoal/5 rounded-full overflow-hidden mb-3"><motion.div initial={{ width: 0 }} animate={{ width: `${goalPct}%` }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="h-full bg-brilliant-rose rounded-full" /></div>
                <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-charcoal/40">{goalPct}% of goal reached</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black text-charcoal/30">Target: £</span>
                        <input type="number" value={goalAmount} onChange={e => setGoalAmount(Number(e.target.value))} className="w-20 h-8 bg-charcoal/5 border border-charcoal/10 rounded-lg px-3 text-xs font-black focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20" />
                    </div>
                </div>
            </div>
            {/* Milestones */}
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Milestones</div>
                <div className="space-y-4">
                    {[
                        { label: 'First Rental', done: true, icon: '🎉' },
                        { label: '10 Rentals Completed', done: true, icon: '📦' },
                        { label: '£1,000 Earned', done: true, icon: '💸' },
                        { label: '100 Rentals — Archive Century', done: true, icon: '🏆' },
                        { label: '5-Star Streak (10 reviews)', done: true, icon: '⭐' },
                        { label: '500 Rentals — Archive Legend', done: false, icon: '🔒' },
                        { label: '£50,000 Earned — Elite Vault', done: false, icon: '🔒' },
                    ].map((m, i) => (
                        <div key={i} className={cn('flex items-center gap-4 p-4 rounded-2xl border transition-all', m.done ? 'border-green-100 bg-green-50' : 'border-charcoal/5 bg-charcoal/[0.01] opacity-50')}>
                            <span className="text-xl">{m.icon}</span>
                            <span className="text-xs font-black flex-1">{m.label}</span>
                            {m.done && <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const SettingsPanel = () => (
        <div className="space-y-6">
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Notification Preferences</div>
                <div className="space-y-4">
                    {notifs.map((n) => (
                        <div key={n.key} className="flex items-center justify-between py-3 border-b border-charcoal/5 last:border-0">
                            <div><div className="text-xs font-black">{n.label}</div><div className="text-[10px] text-charcoal/30 font-bold">{n.sub}</div></div>
                            <button onClick={() => toggleNotif(n.key)} className={cn('w-12 h-6 rounded-full transition-all relative', n.on ? 'bg-brilliant-rose' : 'bg-charcoal/15')}>
                                <div className={cn('w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all', n.on ? 'left-6' : 'left-0.5')} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white border border-charcoal/5 rounded-3xl p-8">
                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-6">Account</div>
                <div className="space-y-3">
                    <Link href={`/lender/${user.handle}`} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-charcoal/5 transition-colors"><Settings size={16} className="text-charcoal/40" /><span className="text-sm font-black">Edit Public Profile</span></Link>
                    <Link href="/lend" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-charcoal/5 transition-colors"><Plus size={16} className="text-charcoal/40" /><span className="text-sm font-black">List a New Item</span></Link>
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition-colors text-red-400"><LogOut size={16} /><span className="text-sm font-black">Sign Out</span></button>
                </div>
            </div>
        </div>
    );

    const FAQ_DATA = [
        { id: 1, category: 'Getting Started', q: 'How does lending on ARCHIV work?', a: 'Lending on ARCHIV is simple: list your designer items with photos, set your daily rate, and receive booking requests. Once approved, the renter picks up or receives the item, and you earn money for each rental day. Our platform handles payments, insurance, and dispute resolution.' },
        { id: 2, category: 'Getting Started', q: 'How do I list an item for rent?', a: 'Navigate to "My Items" and click "Add New Item". Upload high-quality photos, add a description, set your category, daily price, and availability. Our AI pricing tool will suggest competitive rates based on similar items in your area.' },
        { id: 3, category: 'Pricing & Fees', q: 'What are the platform fees?', a: 'ARCHIV charges a 10% platform fee on each completed rental. This covers payment processing, insurance coverage, verification services, and customer support. There are no listing fees or monthly subscriptions.' },
        { id: 4, category: 'Pricing & Fees', q: 'How should I price my items?', a: 'We recommend pricing at 3-5% of the retail value per day. Our Insights feature (available in the Items tab) analyses market data and suggests optimal pricing. Items priced competitively see up to 40% higher occupancy rates.' },
        { id: 5, category: 'Payouts', q: 'When do I receive my earnings?', a: 'Earnings are transferred on the 1st of each month for all completed rentals from the previous month. Payouts are sent to your linked bank account and typically arrive within 1-2 business days. You can also request instant withdrawals from the Financials tab.' },
        { id: 6, category: 'Payouts', q: 'Can I withdraw my balance immediately?', a: 'Yes! Go to the Financials tab and click "Withdraw Now". Instant withdrawals are processed within 1-2 business days. The minimum withdrawal amount is £10.' },
        { id: 7, category: 'Insurance & Protection', q: 'What happens if my item is damaged?', a: 'All rentals are covered by ARCHIV Protection up to £5,000. If an item is returned damaged, report it within 48 hours via the "Report Damage" button. Our team will review the claim, and compensation is typically processed within 5 business days.' },
        { id: 8, category: 'Insurance & Protection', q: 'Are my items insured during transit?', a: 'Yes, ARCHIV provides full coverage during transit for both pickup and return. All shipments are tracked, and we partner with premium courier services to ensure safe handling of your designer items.' },
        { id: 9, category: 'Bookings & Rentals', q: 'Can I decline a booking request?', a: 'Absolutely. You have full control over who rents your items. Review the renter\'s profile, ratings, and verification status before accepting or declining. However, maintaining a high acceptance rate (above 80%) helps your visibility on the platform.' },
        { id: 10, category: 'Bookings & Rentals', q: 'How do pickups and drop-offs work?', a: 'ARCHIV offers three options: 1) Meet at one of our verified ARCHIV Hubs (shown on the map below), 2) Use our partnered courier service for door-to-door delivery, or 3) Arrange a local meetup with the renter. Hub pickups are recommended for the safest and most convenient experience.' },
        { id: 11, category: 'Account & Trust', q: 'How do I reach Archive Elite status?', a: 'Archive Elite is awarded to lenders in the top 1%. Criteria include: 50+ completed rentals, 4.8+ average rating, 95%+ response rate, and zero unresolved disputes. Elite lenders receive priority support, lower fees (8%), and a verified badge.' },
        { id: 12, category: 'Account & Trust', q: 'How can I improve my lender rating?', a: 'Key tips: respond to requests within 1 hour, maintain items in excellent condition, package items carefully, be flexible with pickup/drop-off times, and communicate clearly. Consistent 5-star service builds trust and attracts repeat renters.' },
    ];

    const ARCHIV_LOCATIONS = [
        { name: 'ARCHIV Hub — Shoreditch', address: '42 Redchurch St, London E2 7DP', type: 'Hub', hours: 'Mon-Sat 9am-7pm' },
        { name: 'ARCHIV Hub — Mayfair', address: '18 Dover St, London W1S 4LT', type: 'Hub', hours: 'Mon-Sat 10am-8pm' },
        { name: 'ARCHIV Hub — Notting Hill', address: '89 Portobello Rd, London W11 2QB', type: 'Hub', hours: 'Mon-Fri 9am-6pm' },
        { name: 'ARCHIV Drop Point — Selfridges', address: '400 Oxford St, London W1A 1AB', type: 'Drop Point', hours: 'Store hours' },
        { name: 'ARCHIV Drop Point — Harrods', address: '87-135 Brompton Rd, London SW1X 7XL', type: 'Drop Point', hours: 'Store hours' },
    ];

    const faqCategories = [...new Set(FAQ_DATA.map(f => f.category))];
    const filteredFaqs = FAQ_DATA.filter(f =>
        faqSearch === '' ||
        f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.a.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.category.toLowerCase().includes(faqSearch.toLowerCase())
    );

    const FAQ = () => (
        <div className="space-y-6">
            {/* Hero header */}
            <div className="bg-charcoal text-cream rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-brilliant-rose/15 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-brilliant-rose/20 flex items-center justify-center">
                            <HelpCircle size={22} className="text-brilliant-rose" />
                        </div>
                        <div>
                            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-cream/40">Support Centre</div>
                            <h2 className="text-2xl font-serif italic">How can we help?</h2>
                        </div>
                    </div>
                    <div className="relative max-w-lg mt-6">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
                        <input
                            type="text"
                            value={faqSearch}
                            onChange={e => setFaqSearch(e.target.value)}
                            placeholder="Search for answers..."
                            className="w-full h-12 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl pl-11 pr-4 text-sm font-bold text-cream placeholder:text-cream/30 focus:outline-none focus:ring-2 focus:ring-brilliant-rose/30 focus:border-brilliant-rose/40 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { icon: MessageCircle, label: 'Avg Response', value: '< 2h', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
                    { icon: CheckCircle2, label: 'Resolution Rate', value: '99.8%', color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
                    { icon: Star, label: 'Support Rating', value: '4.9 ★', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
                ].map(s => (
                    <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5 text-center`}>
                        <s.icon size={20} className={`${s.color} mx-auto mb-2`} />
                        <div className="text-xl font-serif italic mb-0.5">{s.value}</div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
                {faqCategories.map(cat => {
                    const catFaqs = filteredFaqs.filter(f => f.category === cat);
                    if (catFaqs.length === 0) return null;
                    return (
                        <div key={cat} className="bg-white border border-charcoal/5 rounded-3xl p-6 lg:p-8">
                            <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-5">{cat}</div>
                            <div className="space-y-2">
                                {catFaqs.map(faq => (
                                    <div key={faq.id} className="border border-charcoal/5 rounded-2xl overflow-hidden transition-all hover:border-charcoal/10">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                            className="w-full flex items-center justify-between p-4 text-left group"
                                        >
                                            <span className="text-sm font-black pr-4 group-hover:text-brilliant-rose transition-colors">{faq.q}</span>
                                            <motion.div
                                                animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                className="flex-shrink-0"
                                            >
                                                <ChevronDown size={16} className={cn('transition-colors', openFaq === faq.id ? 'text-brilliant-rose' : 'text-charcoal/20')} />
                                            </motion.div>
                                        </button>
                                        <AnimatePresence>
                                            {openFaq === faq.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-4 pb-4">
                                                        <div className="h-px bg-charcoal/5 mb-4" />
                                                        <p className="text-xs text-charcoal/60 font-medium leading-relaxed">{faq.a}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
                {filteredFaqs.length === 0 && (
                    <div className="bg-white border border-charcoal/5 rounded-3xl p-12 text-center">
                        <Search size={32} className="mx-auto mb-3 text-charcoal/15" />
                        <div className="text-sm font-black text-charcoal/30 mb-1">No results found</div>
                        <div className="text-xs text-charcoal/20 font-bold">Try adjusting your search terms</div>
                    </div>
                )}
            </div>

            {/* Map Section */}
            <div className="bg-white border border-charcoal/5 rounded-3xl overflow-hidden">
                <div className="p-6 lg:p-8 border-b border-charcoal/5">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <MapPin size={16} className="text-brilliant-rose" />
                                <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Pickup & Drop-off Locations</div>
                            </div>
                            <div className="text-xl font-serif italic">ARCHIV Hubs & Drop Points</div>
                        </div>
                        <a
                            href="https://maps.google.com?q=London+fashion+pickup+points"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-charcoal/30 hover:text-brilliant-rose transition-colors border border-charcoal/10 px-4 py-2 rounded-full hover:border-brilliant-rose/30"
                        >
                            <ExternalLink size={12} /> View Full Map
                        </a>
                    </div>
                </div>
                {/* Embedded Map */}
                <div className="relative">
                    <iframe
                        title="ARCHIV Locations"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.72810763257!2d-0.24168185!3d51.52877184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1709000000000!5m2!1sen!2suk"
                        width="100%"
                        height="320"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                    />
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
                {/* Location Cards */}
                <div className="p-6 lg:p-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {ARCHIV_LOCATIONS.map((loc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="p-4 border border-charcoal/5 rounded-2xl hover:border-brilliant-rose/20 hover:shadow-sm transition-all group cursor-pointer"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', loc.type === 'Hub' ? 'bg-brilliant-rose/10' : 'bg-charcoal/5')}>
                                        <MapPin size={14} className={loc.type === 'Hub' ? 'text-brilliant-rose' : 'text-charcoal/40'} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-black truncate group-hover:text-brilliant-rose transition-colors">{loc.name}</div>
                                        <div className="text-[10px] text-charcoal/40 font-bold mt-0.5">{loc.address}</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={cn('text-[8px] font-black uppercase px-2 py-0.5 rounded-full border', loc.type === 'Hub' ? 'text-brilliant-rose bg-brilliant-rose/5 border-brilliant-rose/15' : 'text-charcoal/40 bg-charcoal/5 border-charcoal/10')}>{loc.type}</span>
                                            <span className="text-[9px] text-charcoal/30 font-bold">{loc.hours}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Still need help */}
            <div className="bg-gradient-to-br from-charcoal to-charcoal/95 text-cream rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brilliant-rose/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-cream/40 mb-2">Need More Help?</div>
                        <div className="text-xl font-serif italic mb-1">Still have questions?</div>
                        <div className="text-xs text-cream/40 font-bold">Our support team is available 7 days a week</div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => showToast('Live chat coming soon!')} className="h-11 px-6 rounded-full bg-brilliant-rose text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all flex items-center gap-2">
                            <MessageCircle size={13} /> Live Chat
                        </button>
                        <button onClick={() => showToast('Email sent to support@archiv.com')} className="h-11 px-6 rounded-full border border-cream/20 text-cream font-black text-[9px] uppercase tracking-widest hover:bg-cream/10 transition-all flex items-center gap-2">
                            <Send size={13} /> Email Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const SECTIONS = { overview: <Overview />, analytics: <Analytics />, bookings: <Bookings />, items: <Items />, financials: <Financials />, reputation: <Reputation />, activity: <Activity />, goals: <Goals />, faq: <FAQ />, settings: <SettingsPanel /> };
    const activeNav = NAV.find(n => n.id === tab);

    // Auth guard — show nothing until user loads
    if (!user) return (
        <div className="min-h-screen bg-[#F5F4EF] flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin mx-auto mb-4" />
                <div className="text-sm font-bold text-charcoal/40">Loading dashboard...</div>
            </div>
        </div>
    );

    return (
        <div className={cn('min-h-screen flex transition-colors duration-500', darkMode ? 'bg-[#1a1a1f] text-white' : 'bg-[#F5F4EF] text-charcoal')}>
            {/* Print styles */}
            <style>{`@media print { aside, header, button { display: none !important; } main { margin-left: 0 !important; } }`}</style>
            {/* Mobile overlay */}
            {mobileMenuOpen && <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-40 lg:hidden" />}
            {/* Sidebar */}
            <aside className={cn('fixed left-0 top-0 h-full bg-charcoal text-cream z-50 transition-all duration-500 flex flex-col',
                sidebarOpen ? 'w-64' : 'w-16',
                'max-lg:w-64 max-lg:-translate-x-full',
                mobileMenuOpen && 'max-lg:translate-x-0'
            )}>
                <div className="p-5 border-b border-white/10 flex items-center justify-between">
                    {sidebarOpen && <Link href="/" className="font-black tracking-tighter text-xl hover:text-brilliant-rose transition-colors">ARCHIV</Link>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-xl transition-colors ml-auto">{sidebarOpen ? <PanelLeftClose size={14} /> : <PanelLeftOpen size={14} />}</button>
                </div>
                {/* User */}
                {sidebarOpen && (
                    <div className="p-5 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-brilliant-rose" />
                            <div className="min-w-0"><div className="text-xs font-black truncate">{user.name}</div><div className="text-[9px] text-cream/40 font-bold">Archive Elite</div></div>
                        </div>
                    </div>
                )}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {NAV.map(n => (
                        <button key={n.id} onClick={() => setTab(n.id)} className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all', tab === n.id ? 'bg-brilliant-rose text-white shadow-lg' : 'text-cream/50 hover:text-cream hover:bg-white/10')}>
                            <n.icon size={16} className="flex-shrink-0" />
                            {sidebarOpen && <span className="text-[11px] font-black uppercase tracking-wider">{n.label}</span>}
                        </button>
                    ))}
                </nav>
                {sidebarOpen && (
                    <div className="p-4 border-t border-white/10">
                        <button onClick={() => setShowWithdraw(true)} className="w-full h-11 rounded-full bg-brilliant-rose text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all flex items-center justify-center gap-2">
                            <ArrowUpRight size={13} /> Withdraw £{balance}
                        </button>
                    </div>
                )}
            </aside>

            {/* Main */}
            <main className={cn('flex-1 transition-all duration-500 min-h-screen max-lg:ml-0', sidebarOpen ? 'lg:ml-64' : 'lg:ml-16')}>
                {/* Topbar */}
                <header className="sticky top-0 bg-[#F5F4EF]/80 backdrop-blur-xl border-b border-charcoal/5 px-4 lg:px-8 py-4 flex items-center justify-between z-40">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 hover:bg-charcoal/5 rounded-xl transition-colors"><Menu size={20} /></button>
                        <div>
                            <div className="text-[9px] font-black uppercase tracking-[0.4em] text-brilliant-rose mb-0.5">Your Archive Income</div>
                            <h1 className="text-xl font-serif italic">{activeNav?.label}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setDarkMode(!darkMode)} className={cn('p-2.5 rounded-xl border hover:shadow-sm transition-all', darkMode ? 'bg-white/10 border-white/10' : 'bg-white border-charcoal/5')}>
                            {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-charcoal/40" />}
                        </button>
                        <button onClick={() => setTab('activity')} className={cn('relative p-2.5 rounded-xl border hover:shadow-sm transition-all', darkMode ? 'bg-white/10 border-white/10' : 'bg-white border-charcoal/5')}>
                            <Bell size={16} className={darkMode ? 'text-white/40' : 'text-charcoal/40'} />
                            {unreadCount > 0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-brilliant-rose text-white text-[8px] font-black rounded-full flex items-center justify-center px-1">{unreadCount}</span>}
                        </button>
                        <Link href={`/lender/${user.handle}`} className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                        </Link>
                    </div>
                </header>

                <div className="p-4 lg:p-8">
                    {!loaded ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <Skeleton key={i} h="h-32" />)}</div>
                            <Skeleton h="h-64" />
                            <div className="grid lg:grid-cols-2 gap-6"><Skeleton h="h-48" /><Skeleton h="h-48" /></div>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                                {SECTIONS[tab]}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </main>

            {/* Withdraw Modal */}
            <AnimatePresence>
                {showWithdraw && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowWithdraw(false)} className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#F5F4EF] w-full max-w-md rounded-[3rem] shadow-2xl p-10 border border-white">
                            <AnimatePresence mode="wait">
                                {wStep === 'form' ? (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="flex justify-between items-start mb-8">
                                            <div><h3 className="text-3xl font-serif italic mb-1">Withdraw</h3><p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Transfer to your account</p></div>
                                            <button onClick={() => setShowWithdraw(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-all"><X size={16} /></button>
                                        </div>
                                        <div className="bg-white rounded-3xl p-6 border border-charcoal/5 mb-6">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-charcoal/30 mb-2">Available Balance</div>
                                            <div className="text-4xl font-serif italic">£{balance}.00</div>
                                        </div>
                                        <div className="space-y-4 mb-4">
                                            <div>
                                                <label className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 block mb-2">Withdraw Amount</label>
                                                <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-charcoal/40">£</span>
                                                    <input type="number" min="1" max={balance} value={wAmount} onChange={e => setWAmount(e.target.value)} className={cn('w-full h-14 bg-white border rounded-2xl pl-8 pr-4 text-xl font-black focus:outline-none focus:ring-2 transition-all', Number(wAmount) > balance || Number(wAmount) <= 0 ? 'border-red-300 focus:ring-red-200 focus:border-red-400' : 'border-charcoal/5 focus:ring-brilliant-rose/20 focus:border-brilliant-rose')} />
                                                </div>
                                                {Number(wAmount) > balance && <div className="text-[9px] font-bold text-red-400 mt-1.5">Amount exceeds available balance (£{balance})</div>}
                                                {Number(wAmount) <= 0 && wAmount !== '' && <div className="text-[9px] font-bold text-red-400 mt-1.5">Enter a valid amount</div>}
                                            </div>
                                            <div>
                                                <label className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 block mb-2">Bank Account</label>
                                                <div className="w-full h-14 bg-white border border-charcoal/5 rounded-2xl px-4 flex items-center justify-between"><span className="text-sm font-bold">•••• •••• •••• {cardNumber}</span><span className="text-[9px] font-black text-charcoal/30">{cardType}</span></div>
                                            </div>
                                        </div>
                                        <button onClick={handleWithdraw} disabled={Number(wAmount) <= 0 || Number(wAmount) > balance || balance <= 0} className={cn('w-full h-14 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 shadow-xl flex items-center justify-center gap-2', Number(wAmount) <= 0 || Number(wAmount) > balance || balance <= 0 ? 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed' : 'bg-charcoal text-cream hover:bg-brilliant-rose')}>
                                            <ArrowUpRight size={14} /> Confirm Withdrawal
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20"><ShieldCheck size={32} className="text-white" /></div>
                                        <h3 className="text-3xl font-serif italic mb-2">Withdrawal Sent</h3>
                                        <p className="text-charcoal/40 text-sm font-medium">£{wAmount} will arrive within 1–2 business days.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Payment Method Modal */}
            <AnimatePresence>
                {showPaymentModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPaymentModal(false)} className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#F5F4EF] w-full max-w-md rounded-[3rem] shadow-2xl p-10 border border-white">
                            <div className="flex justify-between items-start mb-8">
                                <div><h3 className="text-3xl font-serif italic mb-1">Payment Method</h3><p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">Update your payout details</p></div>
                                <button onClick={() => setShowPaymentModal(false)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-all"><X size={16} /></button>
                            </div>
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 block mb-2">Card Type</label>
                                    <div className="flex gap-2">
                                        {['VISA', 'Mastercard', 'Amex'].map(t => (
                                            <button key={t} onClick={() => setCardType(t)} className={cn('flex-1 h-12 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all', cardType === t ? 'bg-charcoal text-cream border-charcoal' : 'bg-white border-charcoal/10 hover:border-charcoal/20')}>{t}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 block mb-2">Last 4 Digits</label>
                                    <input type="text" maxLength={4} value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="1234" className="w-full h-14 bg-white border border-charcoal/5 rounded-2xl px-4 text-xl font-black tracking-[0.5em] text-center focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 block mb-2">Expiry Date</label>
                                    <input type="text" maxLength={5} value={cardExpiry} onChange={e => { let v = e.target.value.replace(/[^\d/]/g, ''); if (v.length === 2 && !v.includes('/')) v += '/'; setCardExpiry(v.slice(0, 5)); }} placeholder="MM/YY" className="w-full h-14 bg-white border border-charcoal/5 rounded-2xl px-4 text-xl font-black tracking-[0.3em] text-center focus:outline-none focus:ring-2 focus:ring-brilliant-rose/20 focus:border-brilliant-rose transition-all" />
                                </div>
                            </div>
                            {/* Preview */}
                            <div className="flex items-center gap-4 p-5 bg-charcoal/5 rounded-2xl mb-6">
                                <div className="w-12 h-12 rounded-xl bg-charcoal flex items-center justify-center"><CreditCard size={20} className="text-cream" /></div>
                                <div><div className="text-sm font-black">•••• •••• •••• {cardNumber || '----'}</div><div className="text-[10px] text-charcoal/40 font-bold">{cardType} · Expires {cardExpiry || '--/--'}</div></div>
                            </div>
                            <button onClick={savePaymentMethod} disabled={cardNumber.length < 4 || cardExpiry.length < 5} className={cn('w-full h-14 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 shadow-xl flex items-center justify-center gap-2', cardNumber.length < 4 || cardExpiry.length < 5 ? 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed' : 'bg-charcoal text-cream hover:bg-brilliant-rose')}>
                                <CheckCircle2 size={14} /> Save Payment Method
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Damage Report Modal */}
            <AnimatePresence>
                {showDamageModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowDamageModal(null)} className="absolute inset-0 bg-charcoal/40 backdrop-blur-md" />
                        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#F5F4EF] w-full max-w-md rounded-[3rem] shadow-2xl p-10 border border-white">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1"><AlertTriangle size={20} className="text-red-500" /><h3 className="text-2xl font-serif italic">Report Damage</h3></div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-charcoal/30">File a dispute for this rental</p>
                                </div>
                                <button onClick={() => setShowDamageModal(null)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:shadow-md transition-all"><X size={16} /></button>
                            </div>
                            <div className="space-y-4 mb-8">
                                <div>
                                    <label className="text-[9px] font-black uppercase tracking-widest text-charcoal/40 block mb-2">Describe the Damage</label>
                                    <textarea value={damageNote} onChange={e => setDamageNote(e.target.value)} placeholder="Describe the condition of the returned item..." rows={4} className="w-full bg-white border border-charcoal/5 rounded-2xl p-4 text-xs font-bold resize-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all" />
                                </div>
                                <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                                    <div className="text-[9px] font-black text-red-600 mb-1">What happens next?</div>
                                    <div className="text-[10px] text-red-500/70 font-medium">The renter will be notified and ARCHIV support will review within 48 hours. A hold will be placed on the renter's deposit.</div>
                                </div>
                            </div>
                            <button onClick={() => reportDamage(showDamageModal)} disabled={!damageNote.trim()} className={cn('w-full h-14 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2', !damageNote.trim() ? 'bg-charcoal/20 text-charcoal/40 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600')}>
                                <AlertTriangle size={14} /> Submit Damage Report
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-charcoal text-cream px-6 py-3 rounded-full shadow-2xl shadow-charcoal/20 text-xs font-black uppercase tracking-widest flex items-center gap-2"
                    >
                        <CheckCircle2 size={14} className="text-green-400" />
                        {toastMsg}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
