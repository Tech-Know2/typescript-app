// pages/accounts.tsx

import React from 'react';
import AccountItem from './accounts';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const accountsData = [
  { accountName: 'Account 1', network: 'Ethereum', balance: 100.5 },
  { accountName: 'Account 2', network: 'Bitcoin', balance: 50.75 },
  { accountName: 'Account 3', network: 'Stellar', balance: 200.0 },
  // Add more account data here
];

export default function Balances() {

    const { user, isAuthenticated } = useKindeBrowserClient();

    const loadAccounts = async () => { 
        if (isAuthenticated) {
            try {
                
                const response = await fetch('/api/wallet', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: user?.id,
                });

                if (response.ok) {
                    const accountsData = await response.json();
                } else {
                    console.log("Failed to find wallets");
                }

            } catch (error) {

                console.error('Error finding wallets:', error);
            }
        }
    }

    return (
        <main className="max-w-4xl mx-auto p-4 space-y-4">
        {accountsData.map((account, index) => (
            <AccountItem
            key={index}
            index={index}
            accountName={account.accountName}
            network={account.network}
            balance={account.balance}
            />
        ))}
        </main>
    );
}
