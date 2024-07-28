"use client";

import React, { useState } from 'react';
import { TicketType } from '../../../types/ticketType';

interface AnswerFormProps {
    ticket: TicketType;
    toggleFormVisibility: () => void;
    onSubmit: (ticket: TicketType) => void;
}

const TicketForm: React.FC<AnswerFormProps> = ({ ticket, toggleFormVisibility, onSubmit }) => {
    const [responseText, setResponseText] = useState(ticket.responseText || '');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit({ ...ticket, responseText });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                <h2 className="text-xl font-bold">Answer Ticket</h2>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <h1>{ticket.questionHeader}</h1>
                        <h2> - {ticket.subjectMatter}</h2>
                    </div>
                    <h2>User's Question</h2>
                    <p>{ticket.questionText}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md" 
                        rows={4} 
                        value={responseText} 
                        onChange={(e) => setResponseText(e.target.value)} 
                        placeholder="Enter your response here..."
                    />
                    <div className="flex justify-end space-x-4 mt-4">
                        <button 
                            type="button" 
                            onClick={toggleFormVisibility} 
                            className="bg-gray-500 text-white font-bold px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TicketForm;
