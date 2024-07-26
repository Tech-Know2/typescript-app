"use client"

import React, { useEffect, useState } from 'react';
import AccountItem from './accounts';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface Wallet {
    accountName: string;
    network: string;
    balance: number;
}

interface BalanceProps {
    wallets: Wallet[];
}

export default function Balances({ wallets }: BalanceProps) {
    const { isAuthenticated } = useKindeBrowserClient();
    const [accountsData, setAccountsData] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        if (isAuthenticated) {
            setAccountsData(wallets);
            setLoading(false); // Ensure to update loading state
        }
    }, [isAuthenticated, wallets]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = accountsData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(accountsData.length / itemsPerPage);

    return (
        <main className="max-w-4xl mx-auto p-4 space-y-4">
            {currentItems.length > 0 ? (
                <>
                    {currentItems.map((account, index) => (
                        <AccountItem
                            key={index}
                            index={index + indexOfFirstItem} // Adjust index for display
                            accountName={account.accountName}
                            network={account.network}
                            balance={account.balance}
                        />
                    ))}

                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p>No accounts found.</p>
            )}
        </main>
    );
}
