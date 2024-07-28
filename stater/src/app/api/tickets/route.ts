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

export async function DELETE(req: Request, res: NextResponse) {
    if (req.method === 'DELETE') {

        try {
            await connection();

            const url = new URL(req.url);
            const userID = url.searchParams.get('userID');
            const ticketIndex = url.searchParams.get('ticketIndex');

            // Validate required fields
            if (!userID || !ticketIndex) {
                return NextResponse.json({ error: 'Missing ownerID or accountAddress' }, { status: 400 });
            }

            // Perform the deletion
            const result = await Ticket.deleteOne({ userID: userID, ticketIndex: ticketIndex });

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'No ticket found to delete' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Ticket has been deleted' }, { status: 200 });
            
        } catch (error) {
            
        }

    } else 
    {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}

export async function PATCH(req: Request, res: NextResponse) {
    if (req.method === 'PATCH') {
        try {
            await connection();

            const url = new URL(req.url);
            const userID = url.searchParams.get('userID');
            const ticketIndex = url.searchParams.get('ticketIndex');

            const data = await req.json();

            const {responderUserID, responseText, responseStatus} = data;

            const ticket = await Ticket.findOne({ userID: userID, ticketIndex: ticketIndex });

            ticket.responderUserID = responderUserID;
            ticket.responseText = responseText;
            ticket.responseStatus = responseStatus;

            const updatedTicket = await ticket.save();

            return NextResponse.json(updatedTicket, { status: 200 });

        } catch (error) {
            console.error('Error patchin ticket:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
            const userID = url.searchParams.get('userID');

            let tickets;
            if (userID) {
                tickets = await Ticket.find({ userID });
            } else {
                tickets = await Ticket.find({responseStatus: 'Unanswered'});
            }

            return NextResponse.json(tickets, { status: 200 });
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}