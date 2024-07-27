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
            <div className="flex flex-col bg-white rounded-md shadow-md p-4">
                <p className="font-bold text-lg">{ticket.questionHeader}</p> {/* Question Header */}
                <p>Status: {ticket.responseStatus}</p> {/* Question Status */}
            </div>
            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mt-4"> Open </button>
        </main>
    );
}

export default TicketDisplay;