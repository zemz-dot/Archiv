import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata = {
    title: 'ARCHIV | The World\'s Largest Shared Wardrobe',
    description: 'Rent designer fashion for a fraction of the retail price. Peer-to-peer circular fashion platform.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-white antialiased selection:bg-brilliant-rose selection:text-white">
                {children}
            </body>
        </html>
    );
}
