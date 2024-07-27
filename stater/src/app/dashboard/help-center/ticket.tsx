"use client"

import { TicketType } from '../../../types/ticketType';
import React, { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface TicketProps {
    ticket: TicketType;
}

const TicketDisplay: React.FC<TicketProps> = ({ ticket }) => {
    return (
        <main>
            <div className="flex flex-row bg-white rounded-md shadow-md p-4 items-center justify-between">
                <div className='flex flex-col'>
                    <p className="font-bold text-lg">{ticket.questionHeader}</p> {/* Question Header */}
                    <p>Status: {ticket.responseStatus}</p> {/* Question Status */}
                </div>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">Open</button>
                    <button className="bg-red-500 text-white font-bold px-4 py-2 rounded-md">Delete</button>
                </div>
            </div>
        </main>
    );
}

export default TicketDisplay;