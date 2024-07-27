import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Ticket from '../../../models/ticket'
import { TicketType } from '../../../types/ticketType';
import connection from '../../../lib/db'

export async function POST(req: Request, res: NextResponse) {
    if (req.method === 'POST') {
        try {
            await connection();

            // Destructure the request body
            const data = await req.json();
            const { ticketIndex, userID, questionHeader, questionText, subjectMatter, responderUserID, responseText, responseStatus, assistanceRating } = data;

            // Detailed validation
            if (ticketIndex === undefined || ticketIndex === null) {
                console.log('Missing ticketIndex');
                return NextResponse.json({ error: 'Missing ticketIndex' }, { status: 400 });
            }
            if (!userID) {
                console.log('Missing userID');
                return NextResponse.json({ error: 'Missing userID' }, { status: 400 });
            }
            if (!questionHeader) {
                console.log('Missing questionHeader');
                return NextResponse.json({ error: 'Missing questionHeader' }, { status: 400 });
            }
            if (!questionText) {
                console.log('Missing questionText');
                return NextResponse.json({ error: 'Missing questionText' }, { status: 400 });
            }
            if (!subjectMatter) {
                console.log('Missing subjectMatter');
                return NextResponse.json({ error: 'Missing subjectMatter' }, { status: 400 });
            }

            const newTicket = new Ticket({
                ticketIndex,
                userID,
                questionHeader,
                questionText,
                subjectMatter,
                responderUserID,
                responseText,
                responseStatus,
                assistanceRating,
            });

            const createdTicket = await newTicket.save();
            return NextResponse.json(createdTicket, { status: 201 });

        } catch (error) {
            console.error('Error creating ticket:', error);
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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
            const userID = url.searchParams.get('userID') || '';

            // Validate userID
            if (!userID) {
                return NextResponse.json({ error: 'Missing userID' }, { status: 400 });
            }

            // Fix the query here
            const tickets = await Ticket.find({ userID });

            return NextResponse.json(tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}