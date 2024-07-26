import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Wallet from '@/models/wallet';
import connection from '@/lib/db';

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
                address: 'test',  // Default value for address
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

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        try {
            await connection();

            // Extract ownerID from headers
            const ownerID = req.headers.get('ownerID') || '';

            // Validate ownerID
            if (!ownerID) {
                return NextResponse.json({ error: 'Missing ownerID' }, { status: 400 });
            }

            // Query the database for wallets with the provided ownerID
            const wallets = await Wallet.find({ owner: ownerID });

            return NextResponse.json(wallets, { status: 200 }); // Changed status code to 200 for successful retrieval

        } catch (error) {
            console.error('Error retrieving wallets:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}