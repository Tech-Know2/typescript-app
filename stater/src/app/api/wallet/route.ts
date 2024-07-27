import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Wallet from '@/models/wallet';
import connection from '@/lib/db';
import {v4 as UUID} from 'uuid';

export async function POST(req: Request, res: NextResponse) {
    if (req.method === 'POST') {
        try {            
            await connection();

            // Destructure the request body
            const data = await req.json();
            const { owner, accountName, accountDescription, blockchain } = data;

            // Validate required fields
            if (!owner || !accountName || !accountDescription || !blockchain) {
                return NextResponse.json({ error: 'Missing Required Fields' }, { status: 400 })
            }

            const newWallet = new Wallet({
                owner,
                accountName,
                accountDescription,
                blockchain,
                address: accountName + blockchain,  // Temporary thing to assign unique values for the addresses
                balance: 0,       // Default balance
            });

            const createdWallet = await newWallet.save();
            return NextResponse.json(createdWallet, { status: 201 });
        } catch (error) {
            console.error('Error creating wallet:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
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
            const ownerID = url.searchParams.get('ownerID') || '';
            const accountAddress = url.searchParams.get('accountAddress') || '';

            // Validate required fields
            if (!ownerID || !accountAddress) {
                return NextResponse.json({ error: 'Missing ownerID or accountAddress' }, { status: 400 });
            }

            // Perform the deletion
            const result = await Wallet.deleteOne({ owner: ownerID, address: accountAddress });

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'No wallet found to delete' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Wallet has been deleted' }, { status: 200 });

        } catch (error) {
            console.error('Error deleting wallet', error);
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

            const { owner, accountAddress, accountName, accountDescription } = await req.json();

            // Validate required fields
            if (!owner || !accountAddress) {
                return NextResponse.json({ error: 'Owner and accountAddress are required' }, { status: 400 });
            }

            // Find the wallet to update
            const wallet = await Wallet.findOne({ owner, address: accountAddress });

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
            const ownerID = url.searchParams.get('ownerID') || '';
            const accountAddress = url.searchParams.get('accountAddress') || '';
            const accountName = url.searchParams.get('accountName') || '';

            // Validate ownerID
            if (!ownerID) {
                return NextResponse.json({ error: 'Missing ownerID' }, { status: 400 });
            }

            // Create a query object with explicit typing
            const query: { owner: string; accountName?: string; address?: string } = { owner: ownerID };
            if (accountName) {
                query.accountName = accountName;
            }
            if (accountAddress) {
                query.address = accountAddress;
            }

            // Query the database for wallets with the provided ownerID (and optionally accountName or address)
            const wallets = await Wallet.find(query);

            return NextResponse.json(wallets, { status: 200 });

        } catch (error) {
            console.error('Error retrieving wallets:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}