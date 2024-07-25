"use client";

import React, { useState } from 'react';
import DashNavBar from '../dashNavBar';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import mongoose from 'mongoose';
import Wallet from '@/models/wallet';

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
        if (value.length <= 20) {
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
        
        if(isAuthenticated){
            const newWallet = {
                owner: user?.id,
                accountName,
                accountDescription,
                blockchain: selectedOption,
                address: 0,
                balance: 0, // Default balance
            };
        }
    };

    return (
        <div className="flex h-screen font-mono">
            <div 
                className="absolute left-1/2 transform -translate-x-1/2 space-y-2"
                style={{ top: '30%' }}
            >
                <div className="flex space-x-2">
                    {/* Textbox */}
                    <div className="flex flex-col">
                        <input
                            type="text"
                            value={accountName}
                            onChange={handleNameChange}
                            placeholder="Enter Account Name"
                            className="border border-black rounded-md p-2 w-[45vw]"
                        />
                        <p className="text-gray-500 text-sm">
                            {accountName.length}/20 characters
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md flex items-center justify-center"
                        onClick={toggleFormVisibility}
                    >
                        +
                    </button>
                </div>
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
                                {accountName.length}/20 characters
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
                        
                        {/* Dropdown Enum Field */}
                        <select
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="border border-black rounded-md p-2 w-full"
                        >
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
                            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};