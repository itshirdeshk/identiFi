"use client"

import { defineChain } from "viem";
import { Outfit } from 'next/font/google';
import './globals.css';

import { PrivyProvider } from '@privy-io/react-auth';
import { useEffect } from "react";
const font = Outfit({ subsets: ['latin'] });

const BitTorrent = defineChain({
    id: 1029,
    name: 'BitTorrent Chain Testnet',
    network: 'BitTorrent Chain Testnet',
    nativeCurrency: {
        name: 'BitTorrent Chain Testnet',
        symbol: 'BTTC',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://pre-rpc.bt.io/'],
            public: true
        }
    } as any,
    blockExplorers: {
        default: {
            name: 'Explorer',
            url: 'https://testnet.bttcscan.com'
        }
    }
}) as any;

export default function RootLayout({
    children
}: { children: React.ReactNode }) {

    useEffect(() => {
        // Ensure wallet proxy initialization happens before rendering
        async function initializeWallet() {
            try {
                // Optionally add wallet initialization logic
                console.log('Initializing wallet...');
            } catch (error) {
                console.error('Error initializing wallet proxy:', error);
            }
        }

        initializeWallet();
    }, []);

    return (
        <html lang="en">
            <body className={font.className}>
                <PrivyProvider
                    appId="cm1hmtq3g05q7zhlij0dne7ue"
                    config={{
                        // Customize Privy's appearance in your app
                        appearance: {
                            theme: 'light',
                            accentColor: '#676FFF',
                            logo: 'https://res.cloudinary.com/itshirdeshk/image/upload/v1727847910/20241002_111226_vx1hyk.png',
                        },
                        // Create embedded wallets for users who don't have a wallet
                        embeddedWallets: {
                            createOnLogin: 'users-without-wallets',
                        },
                        defaultChain: BitTorrent,
                        supportedChains: [BitTorrent],
                    }}
                >
                    {children}
                </PrivyProvider>
            </body>
        </html>
    )

}