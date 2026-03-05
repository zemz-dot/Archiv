'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, PackageSearch, Minus, Plus } from 'lucide-react';

export default function MailerBags() {
    const [quantity, setQuantity] = useState(1);

    return (
        <main className="min-h-screen bg-white">
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center px-6 lg:px-12 z-50">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
                <div className="mx-auto font-black tracking-tighter text-xl">ARCHIV</div>
                <div className="w-20" />
            </nav>

            <div className="pt-24 pb-32 px-6 lg:px-12 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Images */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="aspect-square lg:aspect-[4/5] rounded-md overflow-hidden bg-gray-50 border border-gray-100 relative"
                    >
                        <img src="https://images.unsplash.com/photo-1628148762512-25de37ae70f2?q=80&w=1200&auto=format&fit=crop" alt="Compostable Mailer Bags" className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1605600659873-d808a1d14b1b?q=80&w=800&auto=format&fit=crop" alt="Bag detail" className="w-full aspect-square object-cover rounded-md border border-gray-100 object-center" />
                        <img src="https://images.unsplash.com/photo-1594918717805-4c010a3ac775?q=80&w=800&auto=format&fit=crop" alt="Composting" className="w-full aspect-square object-cover rounded-md border border-gray-100 saturate-50" />
                    </div>
                </div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col lg:py-8"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-brilliant-rose font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">Sustainability</span>
                            <h1 className="text-3xl lg:text-5xl font-serif leading-[1] mb-4">Compostable Mailer Bags</h1>
                            <p className="text-lg text-gray-500 font-medium tracking-tight">Zero Waste Shipping. 37 x 48cm.</p>
                        </div>
                    </div>

                    <div className="py-6 border-y border-gray-100 mb-8">
                        <span className="text-3xl font-black text-black">£0.50<span className="text-sm text-gray-400 font-medium tracking-normal ml-2">for 1 bag</span></span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1"><Leaf size={12} /> Material</span>
                            <p className="font-bold">PBAT & PLA</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Degradation</span>
                            <p className="font-bold">Within 90 Days</p>
                        </div>
                        <div className="space-y-1 col-span-2">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 flex items-center gap-1"><PackageSearch size={12} /> Dimensions</span>
                            <p className="font-bold">37 x 48cm (Fits dresses to shoeboxes)</p>
                        </div>
                    </div>

                    <div className="mb-10 space-y-4">
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            Upgrade your Rotating kit with these compostable mailer bags. These mailer bags are 100% biodegradable, meaning they will biodegrade anywhere within 90 days of it being disposed and leaving no trace!
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            These Archiv mailer bags are water-resistant, flexible, stickable, and writable &amp; are made from bio-based polymer PBAT and a plant based polymer PLA.
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            The mailers are equipped with a secure seal and a double adhesive feature that allows them to be re-used, perfect for both sending &amp; returning your rentals with no extra packaging required. As tested by our top Rotators, these mailer bags will fit in anything from a dress to a shoe box or a small coat.
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="space-y-4 mt-auto">
                        <div className="flex items-center gap-4 h-[64px] mb-4">
                            <div className="flex items-center justify-between border-2 border-black rounded-md h-full w-1/3 px-4">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:text-brilliant-rose transition-colors"><Minus size={16} /></button>
                                <span className="font-black text-lg">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="p-1 hover:text-brilliant-rose transition-colors"><Plus size={16} /></button>
                            </div>
                            <button className="flex-1 h-full bg-black text-white rounded-md font-black text-sm uppercase tracking-widest hover:bg-brilliant-rose border-2 border-black transition-colors shadow-lg">
                                Add to Cart — £{(0.5 * quantity).toFixed(2)}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
