'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FAQ() {
    return (
        <main className="min-h-screen bg-white">
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 h-16 flex items-center px-6 lg:px-12 z-50">
                <Link href="/" className="flex items-center gap-2 text-sm font-bold hover:text-brilliant-rose transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
                <div className="mx-auto font-black tracking-tighter text-xl">ARCHIV</div>
                <div className="w-20" />
            </nav>

            <div className="pt-32 pb-24 px-6 lg:px-12 max-w-4xl mx-auto">
                <span className="text-brilliant-rose font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Knowledge Base</span>
                <h1 className="text-5xl lg:text-7xl font-serif leading-tight mb-16">Frequently Asked Questions</h1>

                <div className="space-y-8">
                    {[
                        { q: 'How does escrow work?', a: 'When you request a rental, your payment is safely held by us in escrow. The lender only gets paid after you have successfully received the item.' },
                        { q: 'What happens if the item doesn\'t fit?', a: 'We highly recommend reading the product descriptions and measurements. However, if an item is significantly not as described, you can request a refund within 24 hours of delivery.' },
                        { q: 'Do I have to dry clean the item?', a: 'Lenders are responsible for cleaning their items upon return, so you don\'t have to worry about dry cleaning! However, please treat the piece with utmost respect.' },
                        { q: 'How long can I rent an item for?', a: 'Rentals typically range from 3 days for a weekend event, up to 14 days or more for vacations. You can select your exact dates through the calendar.' }
                    ].map((faq, i) => (
                        <div key={i} className="border border-gray-100 p-8 rounded-md bg-off-white hover:border-black transition-colors">
                            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">{faq.q}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
