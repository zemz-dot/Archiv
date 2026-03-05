export const LENDER_DATA = {
    '@foued': {
        name: 'Foued Mensi',
        handle: '@foued',
        avatar: '/Foued.jpg',
        bio: 'Founder of ARCHIV. Curating the world\'s most exclusive wardrobe for the next generation of fashion archivists.',
        location: 'Paris/London',
        rating: 5.0,
        reviews: 248,
        rentals: 890,
        reliability: '100%',
        followers: 1240,
        following: 430,
        items: [
            { id: 1, designer: 'JACQUEMUS', name: 'The Chiquito Long Bag', price: 15, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&auto=format&fit=crop', category: 'Bags', occupancy: 82, earn: 2160, rentals: 36, status: 'active' },
            { id: 5, designer: 'PRADA', name: 'Nylon Cleo Bag', price: 40, img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400&auto=format&fit=crop', category: 'Bags', occupancy: 68, earn: 1134, rentals: 27, status: 'active' },
            { id: 10, designer: 'CHANEL', name: 'Vintage Flap Bag', price: 95, img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=400&auto=format&fit=crop', category: 'Bags', occupancy: 90, earn: 3150, rentals: 70, status: 'active' },
            { id: 11, designer: 'GANNI', name: 'Seersucker Dress', price: 20, img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop', category: 'Clothing', occupancy: 74, earn: 1540, rentals: 44, status: 'active' },
        ],
        rentalsData: [
            { id: 1, item: 'The Chiquito Long Bag', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400', renter: '@elena.g', avatar: 'https://i.pravatar.cc/150?u=12', end: '6 Mar', days: 3, earn: 45, status: 'active' },
            { id: 2, item: 'Nylon Cleo Bag', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400', renter: '@marcust', avatar: 'https://i.pravatar.cc/150?u=13', end: '8 Mar', days: 7, earn: 280, status: 'active' },
            { id: 3, item: 'Vintage Flap Bag', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=400', renter: '@sophie.l', avatar: 'https://i.pravatar.cc/150?u=14', end: '10 Mar', days: 5, earn: 475, status: 'active' },
        ],
        balance: 1420,
        pendingPayout: 960
    },
    '@z3mz': {
        name: 'Z3mz',
        handle: '@z3mz',
        avatar: '/Foued.jpg',
        bio: 'Tech-forward archivist exploring the intersection of digital identity and luxury vintage. Sharing my collection of rare archival pieces and directional silhouettes.',
        location: 'Paris, France',
        rating: 5.0,
        reviews: 124,
        rentals: 412,
        reliability: '99%',
        followers: 842,
        following: 215,
        items: [
            { id: 2, designer: 'SAINT LAURENT', name: 'Vintage Silk Slip Dress', price: 85, img: 'https://images.unsplash.com/photo-1582791694770-cbdc9dda338f?q=80&w=800&auto=format&fit=crop', category: 'Clothing', occupancy: 55, earn: 1860, rentals: 22, status: 'active' },
            { id: 8, designer: 'LOEWE', name: 'Puzzle Small Bag', price: 75, img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop', category: 'Bags', occupancy: 90, earn: 3150, rentals: 70, status: 'active' },
        ],
        rentalsData: [
            { id: 4, item: 'Puzzle Small Bag', img: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800', renter: '@amara.d', avatar: 'https://i.pravatar.cc/150?u=15', end: '7 Mar', days: 2, earn: 150, status: 'active' },
        ],
        balance: 850,
        pendingPayout: 420
    }
};

export const INITIAL_DASHBOARD_DATA = {
    items: [],
    rentals: [],
    requests: [],
    activities: [
        { id: 1, type: 'welcome', text: 'Welcome to your ARCHIV dashboard! List your first item to start earning.', time: 'Just now', icon: '✨' },
    ],
    balance: 0,
    goal: 2000
};
