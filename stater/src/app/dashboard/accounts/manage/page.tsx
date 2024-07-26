"use client"

import { ClipLoader } from 'react-spinners';
import DashNavBar from '../../dashNavBar';
import React, { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Wallet } from '@/types/Wallet';
import NavRibon from './accountNavRibon';

export default function ManageAccount() {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [loading, setLoading] = useState(true);
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [deleting, setDeleting] = useState(false); // Add state for delete operation
    const searchParams = useSearchParams();
    const accountAddress = searchParams.get('accountAddress');
    const accountName = searchParams.get('accountName');  // This might not be needed in `GET` requests
    const owner = searchParams.get('owner');

    useEffect(() => {
        const fetchWalletData = async () => {
            if (isAuthenticated && accountAddress && owner) {
                try {
                    const response = await fetch(`/api/wallet?ownerID=${owner}&accountAddress=${accountAddress}`);
                    
                    if (response.ok) {
                        const data: Wallet[] = await response.json();
                        if (data.length > 0) {
                            setWallet(data[0]); // Assuming the accountName is unique and returns a single wallet
                        } else {
                            console.error('No wallet found');
                        }
                    } else {
                        console.error('Failed to fetch wallet data');
                    }
                } catch (error) {
                    console.error('Error fetching wallet data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchWalletData();
    }, [isAuthenticated, accountAddress, owner]);


    const handleDelete = async () => {
        if (!owner || !accountAddress) return;

        setDeleting(true); // Set deleting state to true
        try {
            const response = await fetch(`/api/wallet?ownerID=${owner}&accountAddress=${accountAddress}`, {
                method: 'DELETE',
            });            

            if (response.ok) {
                // Handle successful deletion
                alert('Account successfully deleted');
                window.location.href = '/dashboard/accounts'; // Redirect to the accounts page
            } else {
                // Handle failure
                const result = await response.json();
                alert(`Failed to delete account: ${result.error}`);
            }
        } catch (error) {
            console.error('Error deleting wallet:', error);
            alert('An error occurred while deleting the account');
        } finally {
            setDeleting(false); // Reset deleting state
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen">
                <DashNavBar />
                <div className="flex flex-1 flex-col items-center justify-center bg-gray-100">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    <p className="mt-4 text-lg font-medium">Loading your account information, please wait...</p>
                </div>
            </div>
        );
    }

    return (
        <main>
            {isAuthenticated && wallet && (
                <div className="flex">
                    {/* Vertical Navigation Bar */}
                    <DashNavBar />
    
                    {/* Main Content Area */}
                    <div className="flex-1 p-8 bg-gray-100 font-mono">
                        {/* Back Link */}
                        <Link href="/dashboard/accounts" className="bg-gray-500 text-white font-bold px-3 py-2 rounded-md hover:bg-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out">Back</Link>
                        <p className="text-xl mb-4 mt-5">{wallet.accountName}</p>
                        <p className="text-md mb-4">{wallet.accountDescription}</p>
                        <p className="text-md mb-4">{wallet.blockchain} Network</p>
                        <p className="text-md mb-4">Current Balance: {wallet.balance.toFixed(2)}</p>
                        {/* Add more account details and functionality here */}

                        <div className="flex space-x-4 p-4">
                            <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out">
                                Edit Name
                            </button>
                            <button className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out">
                                Edit Description
                            </button>
                            <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out">
                                Transfer Funds
                            </button>
                            <button
                                className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete Account'}
                            </button>
                        </div>

                        <NavRibon />

                    </div>
                </div>
            )}
        </main>
    );
}
