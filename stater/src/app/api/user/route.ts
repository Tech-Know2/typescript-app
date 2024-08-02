import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import User from '@/models/user';
import { UserType } from '@/types/userType';
import connection from '@/lib/db';

export async function POST(req: Request, res: NextResponse) {
    if (req.method === 'POST') {
        try {
            await connection();

            const data = await req.json();

            const { kindeID, firstName, lastName, accountEmail, accountRole, wallets } = data;

            const newUser = new User({
                kindeID,
                firstName,
                lastName,
                accountEmail,
                accountRole,
                wallets
            });

            const createdUser = await newUser.save();
            return NextResponse.json(createdUser, { status: 201 });

        } catch (error) {
            console.error('Error creating user:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

export async function GET(req: Request, res: NextResponse) {
    if (req.method === 'GET') {
        try {
            await connection();

            const url = new URL(req.url);
            const kindeID = url.searchParams.get('kindeID') || '';
            const userID = url.searchParams.get('userID') || '';

            // Validate ownerID
            if (!kindeID && !userID) {
                return NextResponse.json({ error: 'Missing info' }, { status: 400 });
            }

            const query: { kindeID?: string, userID?: string } = {};

            const user = await User.findOne(query);

            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            return NextResponse.json(user, { status: 200 });

        } catch (error) {
            console.error('Error findinf user:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}