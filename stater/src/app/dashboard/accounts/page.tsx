"use client"

import React, { useEffect, useState } from 'react';
import DashNavBar from '../dashNavBar';
import Ribon from './financialRibon';
import Wallets from './wallet';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ClipLoader } from 'react-spinners';
import { Wallet } from '@/types/Wallet';

export default function Accounts() {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [accountsData, setAccountsData] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalSum, setTotalSum] = useState(0);
    const [accountCount, setAccountCount] = useState(0);

    useEffect(() => {
        const loadAccounts = async () => {
            if (isAuthenticated) {
                try {
                    // Construct the URL with query parameters
                    const response = await fetch(`/api/wallet?ownerID=${user?.id || ''}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const wallets: Wallet[] = await response.json();
                        setAccountsData(wallets);
                        const sum = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
                        setTotalSum(sum);
                        setAccountCount(wallets.length);
                    } else {
                        console.log("Failed to find wallets");
                    }
                } catch (error) {
                    console.error('Error finding wallets:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadAccounts();
    }, [isAuthenticated, user?.id]);

    if (loading) {
        return (
            <div className="flex h-screen">
                <DashNavBar />
                <div className="flex flex-1 flex-col items-center justify-center bg-gray-100">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    <p className="mt-4 text-lg font-medium">Loading your accounts, please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            {/* Vertical Navigation Bar */}
            <DashNavBar />

            {/* Main Content Area */}
            <div className="flex-1 p-8 bg-gray-100">
                {/* Giant Header/Welcome Text */}
                <h1 className="text-3xl font-bold mb-8">Your Accounts</h1>
                <Ribon totalSum={totalSum} accountCount={accountCount} />
                <Wallets wallets={accountsData} />
            </div>
        </div>
    );
}
