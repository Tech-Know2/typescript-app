"use client";

import React, { useEffect, useState } from 'react';
import DashNavBar from '../dashNavBar';
import Ribon from './financialRibon';
import Wallets from './wallet';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ClipLoader } from 'react-spinners';
import { Wallet } from '@/types/Wallet';
import User from '@/models/user';
import { ObjectId } from 'mongoose';
import { UserType, accountRole } from '@/types/userType';

export default function Accounts() {
    const { user, isAuthenticated, getPermission } = useKindeBrowserClient();
    const [accountsData, setAccountsData] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalSum, setTotalSum] = useState(0);
    const [accountCount, setAccountCount] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);

    const getRoleFromPermissions = async () => {
        if (await getPermission('view:admin')) {
            return accountRole.Admin;
        } else if (await getPermission('view:client')) {
            return accountRole.Business;
        } else {
            return accountRole.Retail;
        }
    };

    useEffect(() => {
        const loadAccounts = async () => {
            if (isAuthenticated && user) {
                try {
                    // Fetch user data
                    const response = await fetch(`/api/user?kindeID=${user?.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const fetchedUser: UserType = await response.json();
                        setCurrentUser(fetchedUser);

                        // Fetch wallets data for the current user
                        const walletResponse = await fetch(`/api/wallet?userID=${fetchedUser._id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        if (walletResponse.ok) {
                            const wallets: Wallet[] = await walletResponse.json();
                            setAccountsData(wallets);
                            const sum = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
                            setTotalSum(sum);
                            setAccountCount(wallets.length);
                        } else {
                            setError('Failed to retrieve wallets data.');
                        }
                    } else if (response.status === 404) {
                        // Create a new user if not found
                        const accountRole = await getRoleFromPermissions();

                        const newUser: UserType = {
                            kindeID: user.id,
                            firstName: user.given_name as string,
                            lastName: user.family_name as string,
                            accountEmail: user.email as string,
                            accountRole: accountRole,
                            wallets: [],
                        };

                        const createResponse = await fetch('/api/user', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newUser),
                        });

                        if (createResponse.ok) {
                            const createdUser: UserType = await createResponse.json();
                            setCurrentUser(createdUser);
                            setAccountsData(createdUser.wallets || []);
                            setTotalSum(0);
                            setAccountCount(createdUser.wallets?.length || 0);
                        } else {
                            setError('Failed to create user.');
                        }
                    } else {
                        setError('Failed to retrieve user data.');
                    }
                } catch (error) {
                    console.error('Error finding or creating user:', error);
                    setError('An error occurred while fetching or creating user data.');
                } finally {
                    setLoading(false);
                }
            }
        };

        loadAccounts();
    }, [isAuthenticated, user]);

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

    if (error) {
        return (
            <div className="flex h-screen">
                <DashNavBar />
                <div className="flex flex-1 flex-col items-center justify-center bg-gray-100">
                    <p className="mt-4 text-lg font-medium text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="flex h-screen">
                <DashNavBar />
                <div className="flex flex-1 flex-col items-center justify-center bg-gray-100">
                    <p className="mt-4 text-lg font-medium text-red-600">User data is not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <DashNavBar />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-bold mb-8">Your Accounts</h1>
                <Ribon totalSum={totalSum} accountCount={accountCount} />
                <Wallets wallets={accountsData} currentUser={currentUser} />
            </div>
        </div>
    );
}