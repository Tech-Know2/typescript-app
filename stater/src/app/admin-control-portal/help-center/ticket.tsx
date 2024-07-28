"use client";

import React, { useState } from 'react';
import { TicketType } from '../../../types/ticketType';
import TicketForm from './ticketForm';

interface TicketProps {
    ticket: TicketType;
}

const TicketDisplay: React.FC<TicketProps> = ({ ticket }) => {
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    return (
        <div>
            <div className="flex flex-row bg-white rounded-md shadow-md p-4 items-center justify-between">
                <div className='flex flex-col'>
                    <p className="font-bold text-lg">{ticket.questionHeader}</p> {/* Question Header */}
                    <p>Subject: {ticket.subjectMatter}</p> {/* Question Status */}
                </div>
                <div className="flex space-x-4">
                    <button 
                        onClick={toggleFormVisibility} 
                        className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md"
                    >
                        Answer
                    </button>
                </div>
            </div>
            {isFormVisible && (
                <TicketForm 
                    ticket={ticket} 
                    toggleFormVisibility={toggleFormVisibility}
                    onSubmit={(updatedTicket) => {
                        // Handle form submission
                        console.log('Updated Ticket:', updatedTicket);
                        toggleFormVisibility();
                    }}
                />
            )}
        </div>
    );
}

export default TicketDisplay;
