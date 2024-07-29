"use client";

import React, { useState, useEffect } from 'react';
import { AssistanceRating, ResponseStatus, TicketType } from '../../../types/ticketType';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface AnswerFormProps {
    ticket: TicketType;
    toggleFormVisibility: () => void;
    onSubmit: (ticket: TicketType) => void;
}

const TicketForm: React.FC<AnswerFormProps> = ({ ticket, toggleFormVisibility, onSubmit }) => {
    const [responseText, setResponseText] = useState(ticket.responseText || '');
    const { user, isAuthenticated } = useKindeBrowserClient();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isAuthenticated) {
            try {
                const newTicket: TicketType = {
                    ...ticket,
                    responderUserID: user?.id as string,
                    responseText: responseText,
                    responseStatus: ResponseStatus.Answered,
                    assistanceRating: AssistanceRating.Neutral,
                };

                const response = await fetch(`/api/tickets?userID=${ticket.userID}&ticketIndex=${ticket.ticketIndex}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newTicket),
                });

                if (response.ok) {
                    // Call onSubmit to update the parent component state
                    onSubmit(newTicket);
                    // Clear the response text and close the form
                    setResponseText("");
                    toggleFormVisibility();
                } else {
                    console.error('Error updating ticket:', await response.json());
                }
            } catch (error) {
                console.error('Error updating ticket:', error);
            } finally {
                window.location.reload();
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                <h2 className="text-xl font-bold">Answer Ticket</h2>
                <div className='flex flex-col'>
                    <h1>{ticket.questionHeader}</h1>
                    <h2>{ticket.subjectMatter}</h2>
                    <h2 className='underline'>User's Question</h2>
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
                            Reply
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TicketForm;