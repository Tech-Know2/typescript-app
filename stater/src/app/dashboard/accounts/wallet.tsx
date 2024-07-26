"use client";

import React, { useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Balances from './balances';

export default function Wallets() {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountDescription, setAccountDescription] = useState("");

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

    const handleSubmit = async () => {
        if (isAuthenticated) {
            const walletData = {
                owner: user?.id,
                accountName,
                accountDescription,
                blockchain: selectedOption,
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
                    const createdWallet = await response.json();
                    console.log('Wallet created successfully:', createdWallet);
                } else {
                    console.error('Failed to create wallet');
                }
            } catch (error) {
                console.error('Error creating wallet:', error);
            } finally {
                // Reset form fields and hide the form
                setFormVisible(false);
                setAccountName("");
                setAccountDescription("");
                setSelectedOption("");
            }
        }
    };

    const isFormValid = accountName && accountDescription && selectedOption;

    return (
        <div className="flex h-screen font-mono">
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

                <Balances />
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
                            <option value="" disabled>Select a Network</option>
                            <option value="Stellar">Stellar</option>
                            <option value="Bitcoin">Bitcoin</option>
                            <option value="Ethereum">Ethereum</option>
                            <option value="Solana">Solana</option>
                            <option value="Polygon">Polygon</option>
                            <option value="Optimism">Optimism</option>
                        </select>
                        
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={toggleFormVisibility}
                            >
                                Cancel
                            </button>
                            {isFormValid && isAuthenticated &&(
                                <button
                                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
