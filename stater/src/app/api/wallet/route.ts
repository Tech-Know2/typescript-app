import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Wallet from '@/models/wallet';
import connection from '@/lib/db';

export async function POST(req: Request, res: NextResponse) {
    if (req.method === 'POST') {
        try {            
            await connection(); // Ensure database connection

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

/*export async function GET(req: Request, res: NextResponse) {
    await connection();

    //Querry database, specifaclly the wallets collection
    //Get an array of every wallet with a matching ownerID to the passed ownerID

    //return the array of wallets to the client
}*/