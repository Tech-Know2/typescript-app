import { NextResponse, NextRequest } from 'next/server';
import mongoose from 'mongoose';
import Ticket from '../../../models/ticket'
import connection from '../../../lib/db'
import User from '@/models/user';
import { ObjectId } from 'mongodb';
import { AssistanceRating, ResponseStatus, TicketType } from '../../../types/ticketType';
import { accountRole } from '@/types/userType';

export async function POST(req: Request, res: NextResponse) {
    if (req.method === 'POST') {
        try {
            await connection();

            // Destructure the request body
            const data = await req.json();
            const { ticketIndex, clientUser, questionHeader, questionText, subjectMatter, responseText, responseStatus, assistanceRating } = data;

            console.log(data);

            // Detailed validation
            if (ticketIndex === undefined || ticketIndex === null) {
                console.log('Missing ticketIndex');
                return NextResponse.json({ error: 'Missing ticketIndex' }, { status: 400 });
            }
            if (!clientUser) {
                console.log('Missing clientUser');
                return NextResponse.json({ error: 'Missing clientUser' }, { status: 400 });
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

            const user = await User.findById(clientUser);

            if (!user) {
                console.log('User not found');
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            const newTicket = new Ticket({
                ticketIndex,
                clientUser: user,
                questionHeader,
                questionText,
                subjectMatter,
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
            const clientID = url.searchParams.get('clientID');
            const ticketIndex = url.searchParams.get('ticketIndex');

            // Validate required fields
            if (!clientID || !ticketIndex) {
                return NextResponse.json({ error: 'Missing ownerID or accountAddress' }, { status: 400 });
            }

            // Perform the deletion
            const client = await User.find({kindeID: clientID});
            const ticket = await Ticket.findOne({clientID: client._id, ticketIndex: ticketIndex});

            const result = await Ticket.deleteOne(ticket);

            if (result.deletedCount === 0) {
                return NextResponse.json({ error: 'No ticket found to delete' }, { status: 404 });
            }

            return NextResponse.json({ message: 'Ticket has been deleted' }, { status: 200 });
            
        } catch (error) {
            console.error('Error deleating ticket:', error);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
            const clientID = url.searchParams.get('clientID');
            const ticketIndex = url.searchParams.get('ticketIndex');

            const data = await req.json();

            const {responseText, responseStatus} = data;

            const client = await User.find({kindeID: clientID});
            const ticket = await Ticket.findOne({clientID: client._id, ticketIndex: ticketIndex});

            const reply: TicketType = {
                ...ticket,
                responseText: responseText,
                responseStatus: ResponseStatus.Answered,
                assistanceRating: AssistanceRating.Neutral,
            };

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
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    try {
        await connection();

        const url = new URL(req.url);
        const userID = url.searchParams.get('userID');
        const path = url.searchParams.get('path');

        if (!userID) {
            return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
        }

        const client = await User.findOne({ kindeID: userID });

        if (!client) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        let tickets;
        if (client.accountRole === accountRole.Admin && path === 'admin') {
            // If the user is an admin, fetch all tickets
            tickets = await Ticket.find({ responseStatus: ResponseStatus.Unanswered });
        } else if ((client.accountRole === accountRole.Retail || client.accountRole === accountRole.Admin) && path === 'user') {
            // If the user is a retail user, fetch only their tickets
            tickets = await Ticket.find({ clientUser: client._id });
        } else {
            return NextResponse.json({ error: 'User role not recognized or path mismatch' }, { status: 403 });
        }

        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}