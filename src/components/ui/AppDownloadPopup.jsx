import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Apple, Smartphone, ArrowRight, Download } from 'lucide-react';

const AppDownloadPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            // Only show if not dismissed before (mocked with session storage)
            if (!sessionStorage.getItem('appPopupDismissed')) {
                setIsOpen(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('appPopupDismissed', 'true');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="app-popup-overlay">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="app-popup-card"
                    >
                        <button className="app-popup-close" onClick={handleClose}>
                            <X size={20} />
                        </button>

                        <div className="app-popup-content">
                            <div className="app-popup-tag">EXCLUSIVE ACCESS</div>
                            <h2 className="app-popup-title">Take ARCHIV <br /> Everywhere</h2>
                            <p className="app-popup-text">
                                Join 1M+ fashion archivists. Rent items, track your earnings, and discover local treasures instantly.
                            </p>

                            <div className="app-poup-stores">
                                <a href="#" className="store-btn">
                                    <Apple size={20} fill="currentColor" />
                                    <div className="store-btn-text">
                                        <span>Download on the</span>
                                        <strong>App Store</strong>
                                    </div>
                                </a>

                                <a href="#" className="store-btn">
                                    <div className="play-icon-mock">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.66,16.19C19.45,16.63 19.45,17.37 18.66,17.81L13.69,20.68L12.28,19.27L16.81,15.12M12.28,4.73L13.69,3.32L18.66,6.19C19.45,6.63 19.45,7.37 18.66,7.81L16.81,8.88L12.28,4.73M15.4,13.73L4.54,23.5L14,14L15.4,13.73Z" />
                                        </svg>
                                    </div>
                                    <div className="store-btn-text">
                                        <span>Get it on</span>
                                        <strong>Google Play</strong>
                                    </div>
                                </a>

                                <a href="#" className="store-btn">
                                    <Smartphone size={20} />
                                    <div className="store-btn-text">
                                        <span>Download for</span>
                                        <strong>Android</strong>
                                    </div>
                                </a>
                            </div>

                            <div className="app-popup-footer">
                                <span className="free-badge">FREE APP</span>
                                <span className="rating">4.9/5 ★ Rating</span>
                            </div>
                        </div>

                        <div className="app-popup-visual">
                            <img
                                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
                                alt="App Interface"
                            />
                            <div className="visual-overlay"></div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AppDownloadPopup;
