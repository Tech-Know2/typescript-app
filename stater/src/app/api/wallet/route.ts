import { NextResponse, NextRequest } from 'next/server';
import connection from '@/lib/db';
import Wallet from '@/models/wallet';
import User from '@/models/user';
import { UserType } from '@/types/userType';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            await connection();

            // Destructure the request body
            const data = await req.json();
            const { 
                owner: { kindeID }, 
                accountName, 
                accountDescription, 
                accountType,
                address
            } = data;

            // Validate required fields
            if (!kindeID || !accountName || !accountDescription || !accountType || !address) {
                return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 });
            }

            // Find the user by kindeID
            const user = await User.findOne({ kindeID });

            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            // Create the new wallet
            const newWallet = new Wallet({
                user: user._id,
                accountName,
                accountDescription,
                accountType,
                address,
                balance: 0,
                authUsers: [user._id],
            });

            const createdWallet = await newWallet.save();

            // Add the wallet ID to the user's wallets array
            user.wallets.push(createdWallet._id);

            // Save the updated user
            await user.save();

            return NextResponse.json(createdWallet, { status: 201 });

        } catch (error) {
            console.error('Error creating wallet:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

export async function DELETE(req: NextRequest) {
    if (req.method === 'DELETE') {
        try {
            await connection();

            // Extract query parameters from the URL
            const url = new URL(req.url);
            const accountAddress = url.searchParams.get('accountAddress') || '';

            // Validate required fields
            if (!accountAddress) {
                return NextResponse.json({ error: 'Missing accountAddress' }, { status: 400 });
            }

            // Find the wallet to delete
            const walletToDelete = await Wallet.findOne({ address: accountAddress });

            if (!walletToDelete) {
                return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
            }

            // Perform the deletion
            const result = await Wallet.deleteOne({ address: accountAddress });

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'No wallet found to delete' }, { status: 404 });
            }

            // Update the owner's wallet array
            const owner = await User.findOne({ wallets: walletToDelete._id });

            if (owner) {
                owner.wallets = owner.wallets.filter((walletId: ObjectId) => !walletId.equals(walletToDelete._id));
                await owner.save();
            }

            return NextResponse.json({ message: 'Wallet has been deleted' }, { status: 200 });

        } catch (error) {
            console.error('Error deleting wallet:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

export async function PATCH(req: NextRequest) {
    if (req.method === 'PATCH') {
        try {
            await connection();

            const { accountAddress, accountName, accountDescription } = await req.json();

            // Validate required fields
            if (!accountAddress) {
                return NextResponse.json({ error: 'Owner and accountAddress are required' }, { status: 400 });
            }

            // Find the wallet to update
            const wallet = await Wallet.findOne({ address: accountAddress });

            if (!wallet) {
                return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
            }

            // Update fields if provided
            if (accountName) {
                wallet.accountName = accountName;
            }
            if (accountDescription) {
                wallet.accountDescription = accountDescription;
            }

            // Save the updated wallet
            const updatedWallet = await wallet.save();

            return NextResponse.json(updatedWallet, { status: 200 });
        } catch (error) {
            console.error('Error updating wallet:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        try {
            await connection();

            // Extract query parameters from the URL
            const url = new URL(req.url);
            const userID = url.searchParams.get('userID') || '';
            const accountAddress = url.searchParams.get('accountAddress') || '';

            // Validate at least one parameter is provided
            if (!userID && !accountAddress) {
                return NextResponse.json({ error: 'Missing userID or accountAddress' }, { status: 400 });
            }

            // Build the query object
            const query: { user?: string; address?: string } = {};
            if (userID) {
                query.user = userID;

                const wallets = await Wallet.find(query);
                return NextResponse.json(wallets, { status: 200 });
            } else if (accountAddress) {
                query.address = accountAddress;

                const wallet = await Wallet.findOne(query);
                return NextResponse.json(wallet, { status: 200 });
            }            

        } catch (error) {
            console.error('Error retrieving wallets:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}