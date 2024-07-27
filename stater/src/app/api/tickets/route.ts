import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Ticket from '../../../models/ticket'
import { TicketType } from '../../../types/ticketType';
import connection from '../../../lib/db'

export async function POST(req: Request, res: NextResponse) {

}

export async function GET(req: Request, res: NextResponse) {
    if (req.method === 'GET') {
        try {
            
        } catch (error) {
            
        }

    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}