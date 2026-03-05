'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MessageSquare,
    Send,
    MoreHorizontal,
    Image as ImageIcon,
    Heart,
    ChevronLeft,
    User,
    Check,
    CheckCheck,
    Phone,
    Video,
    Info,
    ArrowLeft,
    Mic,
    MicOff,
    VideoOff,
    PhoneOff,
    Maximize2,
    Volume2,
    Users,
    MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// --- Mock Data ---

const MOCK_USERS = [
    { id: '1', name: 'Sarah M.', handle: '@sarahstyle', avatar: 'https://i.pravatar.cc/150?u=1', lastActive: '2m ago', isOnline: true },
    { id: '2', name: 'Isabelle R.', handle: '@archive_queen', avatar: 'https://i.pravatar.cc/150?u=b', lastActive: '5h ago', isOnline: false },
    { id: '3', name: 'Priya K.', handle: '@minimalist_luxe', avatar: 'https://i.pravatar.cc/150?u=c', lastActive: 'Online', isOnline: true },
    { id: '4', name: 'Emma T.', handle: '@fashionlover', avatar: 'https://i.pravatar.cc/150?u=a', lastActive: '1d ago', isOnline: false },
    { id: '5', name: 'Amara D.', handle: '@luxe_closet', avatar: 'https://i.pravatar.cc/150?u=d', lastActive: '3h ago', isOnline: false },
];

const MOCK_CONVERSATIONS = [
    {
        id: 'c1',
        participant: MOCK_USERS[0],
        lastMessage: 'Is the Jacquemus dress still available for next week?',
        timestamp: '10:42 AM',
        unread: 2,
    },
    {
        id: 'c2',
        participant: MOCK_USERS[1],
        lastMessage: 'Awesome, thanks!',
        timestamp: '9:15 AM',
        unread: 0,
    },
    {
        id: 'c3',
        participant: MOCK_USERS[2],
        lastMessage: 'I sent the return tracking number via email.',
        timestamp: 'Yesterday',
        unread: 0,
    },
    {
        id: 'c4',
        participant: MOCK_USERS[3],
        lastMessage: 'Sent a photo',
        timestamp: 'Tuesday',
        unread: 0,
    },
];

const INITIAL_MESSAGES = {
    'c1': [
        { id: 'm1', senderId: '1', text: 'Hi! I saw your listing for the Jacquemus dress.', timestamp: '10:30 AM' },
        { id: 'm2', senderId: 'me', text: 'Hey Sarah! Yes, it is still available.', timestamp: '10:35 AM' },
        { id: 'm3', senderId: '1', text: 'Is it still available for next week?', timestamp: '10:42 AM' },
    ],
    'c2': [
        { id: 'm4', senderId: 'me', text: 'Hey, I shipped the item today.', timestamp: 'Yesterday' },
        { id: 'm5', senderId: '2', text: 'Awesome, thanks!', timestamp: '9:15 AM' },
    ],
};

// --- Call Overlay Component ---

const CallOverlay = ({ type, participant, onHangup }) => {
    const [status, setStatus] = useState('Connecting...');
    const [callTime, setCallTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOn, setIsVideoOn] = useState(type === 'video');

    useEffect(() => {
        const timer = setTimeout(() => setStatus('Live'), 2000);
        const timeInterval = setInterval(() => {
            if (status === 'Live') setCallTime(prev => prev + 1);
        }, 1000);
        return () => {
            clearTimeout(timer);
            clearInterval(timeInterval);
        };
    }, [status]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-4 lg:p-12 overflow-hidden"
        >
            {/* Background Blur / Video Placeholder */}
            {type === 'video' && isVideoOn ? (
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1200&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-60 scale-110 blur-xl"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-[#0A0A0B] z-0" />
            )}

            <div className="relative z-10 w-full max-w-4xl aspect-video lg:aspect-auto h-full flex flex-col items-center justify-between py-12">
                {/* Header */}
                <div className="text-center">
                    <motion.div
                        animate={status === 'Connecting...' ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-white/10 p-2 mx-auto mb-8 overflow-hidden relative"
                    >
                        <img src={participant.avatar} className="w-full h-full rounded-full object-cover" alt={participant.name} />
                        {status === 'Live' && <div className="absolute inset-0 bg-black/20" />}
                    </motion.div>
                    <h2 className="text-3xl lg:text-5xl font-black text-white mb-2 tracking-tight">{participant.name}</h2>
                    <div className="flex items-center justify-center gap-3">
                        <span className={cn(
                            "text-sm font-black uppercase tracking-[0.3em]",
                            status === 'Live' ? "text-green-400" : "text-white/40"
                        )}>
                            {status === 'Live' ? formatTime(callTime) : status}
                        </span>
                    </div>
                </div>

                {/* Video Area (if video call) */}
                {type === 'video' && isVideoOn && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full h-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1200&auto=format&fit=crop"
                                className="w-full h-full object-cover"
                                alt="Main Stream"
                            />
                        </motion.div>

                        {/* Self View */}
                        <motion.div
                            drag
                            dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
                            className="absolute bottom-32 pt-48 right-12 w-48 h-64 rounded-2xl bg-black border border-white/20 shadow-2xl overflow-hidden cursor-move pointer-events-auto"
                        >
                            <div className="w-full h-full flex items-center justify-center text-white/20 italic text-xs">
                                Your Preview
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Controls */}
                <div className="flex items-center gap-6 lg:gap-10 pb-12">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                            isMuted ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                        )}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>

                    {type === 'video' && (
                        <button
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={cn(
                                "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                                !isVideoOn ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                            )}
                        >
                            {!isVideoOn ? <VideoOff size={24} /> : <Video size={24} />}
                        </button>
                    )}

                    <button className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                        <Volume2 size={24} />
                    </button>

                    <button
                        onClick={onHangup}
                        className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all shadow-2xl shadow-red-900/50"
                    >
                        <PhoneOff size={32} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// --- Main Component ---

export default function ChatPage() {
    const [selectedId, setSelectedId] = useState('c1');
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [mobileView, setMobileView] = useState('list'); // 'list' or 'chat'
    const [activeCall, setActiveCall] = useState(null); // { type: 'voice' | 'video', participant }
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem('archiv-user');
        if (stored) {
            setCurrentUser(JSON.parse(stored));
        } else {
            setCurrentUser({ name: 'Foued Mensi', handle: '@foued', avatar: '/Foued.jpg' });
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedId, messages, isTyping]);

    const activeConversation = MOCK_CONVERSATIONS.find(c => c.id === selectedId);
    const conversationMessages = messages[selectedId] || [];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            senderId: 'me',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => ({
            ...prev,
            [selectedId]: [...(prev[selectedId] || []), newMessage]
        }));
        setInputValue('');

        // Mock "Live" response feel
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                const reply = {
                    id: (Date.now() + 1).toString(),
                    senderId: activeConversation.participant.id,
                    text: "That sounds good! I'll check my calendar and let you know within the hour. 👗",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => ({
                    ...prev,
                    [selectedId]: [...(prev[selectedId] || []), reply]
                }));
            }, 3000);
        }, 1000);
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden text-charcoal">
            {/* Call Overlay */}
            <AnimatePresence>
                {activeCall && (
                    <CallOverlay
                        type={activeCall.type}
                        participant={activeCall.participant}
                        onHangup={() => setActiveCall(null)}
                    />
                )}
            </AnimatePresence>

            {/* Left Sidebar - Conversation List */}
            <div className={cn(
                "w-full lg:w-[400px] border-r border-gray-100 flex flex-col transition-all duration-300",
                mobileView === 'chat' ? 'hidden lg:flex' : 'flex'
            )}>
                {/* Header */}
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h2 className="text-xl font-black tracking-tight">Messages</h2>
                    </div>
                    <button className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center transition-colors">
                        <Users size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search messages"
                            className="w-full h-11 bg-gray-50 rounded-2xl pl-11 pr-4 text-sm font-medium outline-none focus:ring-1 focus:ring-brilliant-rose/20 transition-all border-none placeholder:text-gray-300"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="px-6 py-4 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Direct Messages</span>
                        <div className="w-2 h-2 bg-brilliant-rose rounded-full animate-pulse" />
                    </div>
                    {MOCK_CONVERSATIONS.map((conv) => (
                        <button
                            key={conv.id}
                            onClick={() => {
                                setSelectedId(conv.id);
                                setMobileView('chat');
                            }}
                            className={cn(
                                "w-full p-4 px-6 flex items-center gap-4 transition-all hover:bg-gray-50 group border-l-4",
                                selectedId === conv.id ? "bg-gray-50/50 border-brilliant-rose" : "border-transparent"
                            )}
                        >
                            <div className="relative flex-shrink-0">
                                <img src={conv.participant.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" alt={conv.participant.name} />
                                {conv.participant.isOnline && (
                                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                )}
                            </div>
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h4 className="font-bold text-sm truncate">{conv.participant.name}</h4>
                                    <span className="text-[10px] font-bold text-gray-400 tracking-tighter">{conv.timestamp}</span>
                                </div>
                                <p className={cn(
                                    "text-xs truncate font-medium",
                                    conv.unread > 0 ? "text-black font-black" : "text-gray-400"
                                )}>
                                    {conv.lastMessage}
                                </p>
                            </div>
                            {conv.unread > 0 && (
                                <div className="w-5 h-5 bg-brilliant-rose rounded-full flex items-center justify-center shadow-lg shadow-pink-100">
                                    <span className="text-[10px] text-white font-black">{conv.unread}</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Bottom User Area */}
                <div className="p-6 border-t border-gray-50 flex items-center gap-4 bg-gray-50/20">
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                        <img src={currentUser?.avatar || 'https://i.pravatar.cc/150?u=me'} className="w-full h-full object-cover" alt="Me" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Logged in as</div>
                        <div className="text-sm font-bold truncate text-charcoal/80">{currentUser?.handle || '@user'}</div>
                    </div>
                    <button className="text-gray-300 hover:text-charcoal transition-colors">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={cn(
                "flex-1 flex flex-col bg-cream/20 relative",
                mobileView === 'list' ? 'hidden lg:flex' : 'flex'
            )}>
                {activeConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-24 border-b border-white bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
                            <div className="flex items-center gap-5">
                                <button
                                    onClick={() => setMobileView('list')}
                                    className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors lg:hidden"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <div className="relative group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden group-hover:ring-4 group-hover:ring-brilliant-rose/10 transition-all duration-500">
                                        <img src={activeConversation.participant.avatar} className="w-full h-full object-cover" alt={activeConversation.participant.name} />
                                    </div>
                                    {activeConversation.participant.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-black text-base leading-tight">{activeConversation.participant.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", activeConversation.participant.isOnline ? "bg-green-400" : "bg-gray-300")} />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            {activeConversation.participant.isOnline ? 'Active Now' : `Active ${activeConversation.participant.lastActive}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveCall({ type: 'voice', participant: activeConversation.participant })}
                                    className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-green-50 hover:text-green-600 transition-all text-charcoal border border-transparent hover:border-green-100"
                                >
                                    <Phone size={20} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={() => setActiveCall({ type: 'video', participant: activeConversation.participant })}
                                    className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all text-charcoal border border-transparent hover:border-blue-100"
                                >
                                    <Video size={22} strokeWidth={2.5} />
                                </button>
                                <button className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-50 transition-all text-charcoal">
                                    <Info size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-white/50"
                        >
                            <div className="flex justify-center mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 bg-gray-50/80 px-4 py-2 rounded-full border border-gray-100">Direct Message Channel</span>
                            </div>

                            {conversationMessages.map((msg, idx) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className={cn(
                                        "flex flex-col max-w-[75%]",
                                        msg.senderId === 'me' ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "px-5 py-3.5 rounded-3xl text-[15px] font-medium transition-all shadow-sm leading-relaxed",
                                        msg.senderId === 'me'
                                            ? "bg-charcoal text-white rounded-tr-none"
                                            : "bg-white border border-gray-100 text-charcoal rounded-tl-none"
                                    )}>
                                        {msg.text}
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-2 px-1">
                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{msg.timestamp}</span>
                                        {msg.senderId === 'me' && (
                                            <div className="flex -space-x-1">
                                                <CheckCheck size={14} className="text-brilliant-rose" />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 text-gray-400"
                                >
                                    <div className="flex gap-1.5 bg-gray-50 px-4 py-3 rounded-full border border-gray-100 italic font-medium text-xs">
                                        {activeConversation.participant.name} is typing
                                        <span className="flex gap-1 items-center ml-1">
                                            <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1 h-1 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-8 bg-white/80 backdrop-blur-xl border-t border-gray-50">
                            <form
                                onSubmit={handleSendMessage}
                                className="bg-gray-100/50 rounded-[2rem] p-3 flex items-center gap-3 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all shadow-sm"
                            >
                                <button type="button" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all text-gray-400 hover:text-charcoal flex-shrink-0">
                                    <ImageIcon size={22} />
                                </button>
                                <button type="button" className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all text-gray-400 hover:text-charcoal flex-shrink-0">
                                    <Maximize2 size={22} />
                                </button>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-transparent border-none outline-none py-2 px-3 text-[15px] font-medium placeholder:text-gray-300"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className={cn(
                                        "h-12 px-8 rounded-2xl flex items-center justify-center transition-all font-black text-xs uppercase tracking-widest flex-shrink-0",
                                        inputValue.trim()
                                            ? "bg-brilliant-rose text-white shadow-xl shadow-pink-200 translate-y-0 active:scale-95"
                                            : "text-gray-300"
                                    )}
                                >
                                    Send
                                </button>
                            </form>
                            <div className="text-center mt-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">End-to-end encrypted styling advice</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-32 h-32 rounded-full border-4 border-gray-50 flex items-center justify-center mb-10 bg-cream/10 relative"
                        >
                            <MessageSquare size={48} className="text-gray-200" />
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-50 flex items-center justify-center">
                                <Send size={20} className="text-charcoal" />
                            </div>
                        </motion.div>
                        <h2 className="text-3xl font-black mb-4 tracking-tight">Your Wardrobe Directs</h2>
                        <p className="text-gray-400 text-sm max-w-sm font-medium leading-relaxed">
                            Connect with top lenders, negotiate archives, and coordinate your perfect fit in real-time.
                        </p>
                        <button className="mt-10 h-14 px-12 bg-charcoal text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-brilliant-rose transition-all shadow-2xl shadow-black/10">
                            Start New Conversation
                        </button>
                    </div>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #eee;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #ddd;
                }
            `}</style>
        </div>
    );
}
