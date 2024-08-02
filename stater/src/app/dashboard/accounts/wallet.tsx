"use client";

import React, { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Balances from './balances';
import { Wallet } from '@/types/Wallet';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/userType';
import { generateStellarWallet } from '../../../lib/stellar';

interface BalanceProps {
    wallets: Wallet[];
    currentUser: UserType;
}

export default function Wallets({ wallets, currentUser }: BalanceProps) {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const router = useRouter();
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountDescription, setAccountDescription] = useState("");
    const [isFormValid, setFormValid] = useState(false);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [secretKey, setSecretKey] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= 16) {
            setAccountName(value);
        }
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= 32) {
            setAccountDescription(value);
        }
    };

    const validateForm = () => {
        setFormValid(accountName.trim() !== "" && accountDescription.trim() !== "" && selectedOption !== "");
    };

    useEffect(() => {
        validateForm();
    }, [accountName, accountDescription, selectedOption]);

    const handleCopy = (key: string | null) => {
        if (key) {
            navigator.clipboard.writeText(key).then(() => {
                alert('Key copied to clipboard');
            });
        }
    };

    async function createWallet() {
        try {
            const { publicKey, secretKey } = await generateStellarWallet();
            setPublicKey(publicKey);
            setSecretKey(secretKey);
            setShowPopup(true);
        } catch (error) {
            console.error("Error creating wallet: ", error);
        }
    }

    const handleSubmit = async () => {
        if (isAuthenticated && currentUser && publicKey) {
            const walletData = {
                owner: currentUser,
                accountName,
                accountDescription,
                accountType: selectedOption,
                address: publicKey
            };

            try {
                const response = await fetch('/api/wallet', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(walletData),
                });

                if (response.ok) {
                    const wallet = await response.json();
                    const params = new URLSearchParams({
                        accountAddress: wallet.address,
                    });

                    router.push(`/dashboard/accounts/manage?${params.toString()}`);
                } else {
                    console.error('Failed to create wallet');
                }
            } catch (error) {
                console.error('Error creating wallet:', error);
            } finally {
                setFormVisible(false);
                setAccountName("");
                setAccountDescription("");
                setSelectedOption("");
                setPublicKey(null);
                setSecretKey(null);
                setShowPopup(false);
            }
        }
    };

    return (
        <div className="flex h-[60vh]">
            <div 
                className="absolute left-1/2 transform -translate-x-1/2 space-y-2"
                style={{ top: '30%' }}
            >
                <div className="flex space-x-2">
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={accountName}
                            onChange={handleNameChange}
                            placeholder="Enter Account Name"
                            className="border border-black rounded-md p-2 w-[45vw]"
                        />
                        <p className="text-gray-500 text-sm">
                            {accountName.length}/16 characters
                        </p>
                    </div>

                    <button
                        className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center"
                        onClick={toggleFormVisibility}
                    >
                        +
                    </button>
                </div>

                <Balances wallets={wallets} />
            </div>

            {isFormVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Create Your Account</h2>
                        
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={accountName}
                                onChange={handleNameChange}
                                placeholder="Account Name"
                                className="border border-black rounded-md p-2 w-full"
                            />
                            <p className="text-gray-500 text-sm">
                                {accountName.length}/16 characters
                            </p>
                        </div>
                        
                        <div className="flex flex-col">
                            <input
                                type="text"
                                value={accountDescription}
                                onChange={handleDescriptionChange}
                                placeholder="Account Description"
                                className="border border-black rounded-md p-2 w-full"
                            />
                            <p className="text-gray-500 text-sm">
                                {accountDescription.length}/32 characters
                            </p>
                        </div>
                        
                        <select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="border border-black rounded-md p-2 w-full"
                        >
                            <option value="" disabled>Select Account Type</option>
                            <option value="Checkings">Checkings</option>
                            <option value="Savings">Savings</option>
                            <option value="Investments">Investments</option>
                        </select>
                        
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={toggleFormVisibility}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-blue-500 text-white font-bold px-4 py-2 rounded-md ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={async () => {
                                    await createWallet();
                                }}
                                disabled={!isFormValid}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Your Wallet Keys</h2>
                        <h3 className="text-lg">Your private key is not stored, make sure to copy this key down and save it somewhere. If you lose it you lose the money in your accounts, and there is no other way to get it back. Save it for later!</h3>
                        
                        <div className="flex flex-col mb-4">
                            <label className="text-lg font-semibold">Public Key:</label>
                            <input
                                type="text"
                                readOnly
                                value={publicKey || ''}
                                className="border border-gray-300 rounded-md p-2 w-full mb-2"
                            />
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={() => handleCopy(publicKey)}
                            >
                                Copy Public Key
                            </button>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label className="text-lg font-semibold">Secret Key:</label>
                            <input
                                type="text"
                                readOnly
                                value={secretKey || ''}
                                className="border border-gray-300 rounded-md p-2 w-full mb-2"
                            />
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={() => handleCopy(secretKey)}
                            >
                                Copy Secret Key
                            </button>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md"
                                onClick={() => {
                                    setShowPopup(false);
                                    handleSubmit();
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}