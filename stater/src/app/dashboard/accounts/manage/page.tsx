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
    const [deleting, setDeleting] = useState(false);
    const [isNameChangeVisible, setNameChangeVisible] = useState(false);
    const [isDescChangeVisible, setDescChangeVisible] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [isNameValid, setNameValid] = useState(false);
    const [isDescValid, setDescValid] = useState(false);
    const searchParams = useSearchParams();
    const accountAddress = searchParams.get('accountAddress');
    const accountName = searchParams.get('accountName');
    const owner = searchParams.get('owner');

    const [isTransactionFormVisible, setTransactionFormVisible] = useState(false);
    const [isTransactionValid, setTransactionValid] = useState(true);
    const [inputAddress, setInputAddress] = useState('');
    const [inputSum, setInputSum] = useState('');
    const [addressOwner, setAddressOwner] = useState('');

    const MAX_NAME_LENGTH = 16;
    const MAX_DESC_LENGTH = 32;
    const [nameCount, setNameCount] = useState(0);
    const [descCount, setDescCount] = useState(0);

    const completeTransaction = () => {
        if(isAuthenticated && isTransactionValid)
        {
            console.log("Will work on sending funds later")
            toggleTransactionFormVisiblity();
        }
    }

    const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputSum(value)
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputAddress(value)
    };

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    const toggleTransactionFormVisiblity = () => {
        setTransactionFormVisible(!isTransactionFormVisible);
    };

    const toggleNameVisibility = () => {
        setNameChangeVisible(!isNameChangeVisible);
    };

    const toggleDescriptionVisibility = () => {
        setDescChangeVisible(!isDescChangeVisible);
    };

    useEffect(() => {
        const fetchWalletData = async () => {
            if (isAuthenticated) {
                try {
                    const response = await fetch(`/api/wallet?accountAddress=${accountAddress}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    
                    if (response.ok) {
                        const fetchedWallet = await response.json();
                        setWallet(fetchedWallet);

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

    const updateWallet = async (updatedFields: { accountName?: string; accountDescription?: string }) => {
        if (isAuthenticated) {
            try {
                const response = await fetch('/api/wallet', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        owner,
                        accountAddress,
                        ...updatedFields
                    }),
                });
                
                if (response.ok) {
                    alert('Wallet updated successfully');
                    window.location.reload(); // Refresh to reflect changes
                } else {
                    console.error('Failed to patch wallet data');
                    const result = await response.json();
                    alert(`Failed to update wallet: ${result.error}`);
                }
            } catch (error) {
                console.error('Error patching wallet data:', error);
                alert('An error occurred while updating the wallet');
            }
        } else {
            alert('You must be authenticated to update the wallet');
        }
    };

    const checkTransactionValidity = async () => {
        if (isAuthenticated && inputAddress != '' && inputSum != '' && inputAddress != accountAddress)
        {
            try {
                const response = await fetch(`/api/wallet?accountAddress=${inputAddress}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (response.ok) {
                    const wallet = await response.json();
                    
                    const res = await fetch(`/api/user?userID=${wallet.user._id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if(res.ok)
                    {
                        const accountOwner = await res.json();
                        setAddressOwner(accountOwner.firstName + " " + accountOwner.lastName as string);
                        setTransactionValid(true);

                    } else 
                    {
                        console.error('Failed to find user matching account');
                    }

                } else {
                    console.error('Failed to fetch wallet data');
                }
            } catch (error) {
                console.error('Error fetching wallet data:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.error("You must be authenticated or send to a wallet you don't own");
            setAddressOwner("Error validating transaction, try adding a value to sum, or change account address");
        }
    }

    const handleDelete = () => {
        if (wallet) {
            toggleFormVisibility(); // Show the confirmation form
        }
    };

    const handleNameChange = () => {
        if (wallet) {
            setInputName(wallet.accountName || ''); // Set current name for editing
            toggleNameVisibility(); // Show the name change form
        }
    };

    const handleDescriptionChange = () => {
        if (wallet) {
            setInputDescription(wallet.accountDescription || ''); // Set current description for editing
            toggleDescriptionVisibility(); // Show the description change form
        }
    };

    const handleConfirmDelete = async () => {
        if (!isNameValid || !isAuthenticated) return;
    
        setDeleting(true);
        try {
            const response = await fetch(`/api/wallet?accountAddress=${accountAddress}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                alert('Account successfully deleted');
                window.location.href = '/dashboard/accounts';
            } else {
                const result = await response.json();
                alert(`Failed to delete account: ${result.error}`);
            }
        } catch (error) {
            console.error('Error deleting wallet:', error);
            alert('An error occurred while deleting the account');
        } finally {
            setDeleting(false);
            toggleFormVisibility();
        }
    };

    const handleDeleteNaming = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputName(value);
        setNameValid(value.trim() === wallet?.accountName); // Set valid when input matches wallet name
    };

    const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputName(value.slice(0, MAX_NAME_LENGTH)); // Limit input length
        setNameCount(value.length); // Update character count
        setNameValid(value.trim() !== '' && value.length <= MAX_NAME_LENGTH); // Validation
    };
    
    const handleInputDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputDescription(value.slice(0, MAX_DESC_LENGTH)); // Limit input length
        setDescCount(value.length); // Update character count
        setDescValid(value.trim() !== '' && value.length <= MAX_DESC_LENGTH); // Validation
    };
    

    const handleNameSubmit = async () => {
        if (inputName && wallet) {
            await updateWallet({ accountName: inputName });
            toggleNameVisibility(); // Hide the form
        }
    };

    const handleDescriptionSubmit = async () => {
        if (inputDescription && wallet) {
            await updateWallet({ accountDescription: inputDescription });
            toggleDescriptionVisibility(); // Hide the form
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
                    <DashNavBar />
                    <div className="flex-1 p-8 bg-gray-100">
                        <Link href="/dashboard/accounts" className="bg-gray-500 text-white font-bold px-3 py-2 rounded-md hover:bg-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out">Back</Link>
                        <p className="text-xl mb-4 mt-5">{wallet.accountName}</p>
                        <p className="text-md mb-4">{wallet.accountType} - {wallet.accountDescription}</p>
                        <p className="text-md mb-4">{wallet.address}</p>
                        <p className="text-md mb-4">Current Balance: {wallet.balance.toFixed(2)}</p>

                        <div className="flex space-x-4 p-4">
                            <button onClick={handleNameChange} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out">
                                Edit Name
                            </button>
                            <button onClick={handleDescriptionChange} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out">
                                Edit Description
                            </button>
                            <button onClick={toggleTransactionFormVisiblity} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out">
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

            {isFormVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Confirm Account Deletion</h2>
                        <h3 className="text-lg font-bold">This action will remove this account from our database, please export this wallet to another provider before completing this action</h3>
                        <p className="text-md mb-4">Please confirm the account name for deletion:</p>
                        <input
                            type="text"
                            value={inputName}
                            onChange={handleDeleteNaming}
                            placeholder="Account Name"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={toggleFormVisibility}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-red-500 text-white font-bold px-4 py-2 rounded-md ${!isNameValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleConfirmDelete}
                                disabled={!isNameValid}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isNameChangeVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Update Account Name</h2>
                        <p className="text-md mb-4">Please type the new account name:</p>
                        <input
                            type="text"
                            value={inputName}
                            onChange={handleInputNameChange}
                            placeholder="New Account Name"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <p className="text-sm text-gray-600">{MAX_NAME_LENGTH - nameCount} characters remaining</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={toggleNameVisibility}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-blue-500 text-white font-bold px-4 py-2 rounded-md ${!isNameValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleNameSubmit}
                                disabled={!isNameValid}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDescChangeVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Update Account Description</h2>
                        <p className="text-md mb-4">Please type the new account description:</p>
                        <input
                            type="text"
                            value={inputDescription}
                            onChange={handleInputDescriptionChange}
                            placeholder="New Account Description"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <p className="text-sm text-gray-600">{MAX_DESC_LENGTH - descCount} characters remaining</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={toggleDescriptionVisibility}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-blue-500 text-white font-bold px-4 py-2 rounded-md ${!isDescValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={handleDescriptionSubmit}
                                disabled={!isDescValid}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isTransactionFormVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Transfer Funds</h2>
                        <p className="text-md mb-4">Transfer Sum:</p>
                        <input
                            type="number"
                            value={inputSum}
                            onChange={handleSumChange}
                            placeholder="Enter Transfer Amount"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                        <p className="text-md mb-4">Enter Recivers Address:</p>
                        <input
                            type="text"
                            value={inputAddress}
                            onChange={handleAddressChange}
                            placeholder="Recievers Address"
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />

                        <p className="text-md">Account Owner:</p>
                        <p className=''>{addressOwner}</p>
                        
                        <button
                            className={`bg-blue-500 text-white font-bold px-4 py-2 rounded-md ${!isTransactionValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={checkTransactionValidity}
                            disabled={!isTransactionValid}
                        >
                            Validate Transaction
                        </button>

                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                onClick={toggleTransactionFormVisiblity}
                            >
                                Cancel
                            </button>
                            <button
                                className={`bg-blue-500 text-white font-bold px-4 py-2 rounded-md ${!isTransactionValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={completeTransaction} // Add function to handle transfer
                                disabled={!isTransactionValid}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}