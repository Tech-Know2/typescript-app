"use client";

import React, { useState, useEffect } from 'react';
import { AssistanceRating, ResponseStatus, TicketType } from '../../../types/ticketType';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { UserType } from '@/types/userType';

interface AnswerFormProps {
    ticket: TicketType;
    toggleFormVisibility: () => void;
    onSubmit: (ticket: TicketType) => void;
}

const TicketForm: React.FC<AnswerFormProps> = ({ ticket, toggleFormVisibility, onSubmit }) => {
    const [responseText, setResponseText] = useState(ticket.responseText || '');
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (isAuthenticated) {
                try {
                    const res = await fetch(`/api/user?kindeID=${user?.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.ok) {
                        const fetchedUser: UserType = await res.json();
                        setCurrentUser(fetchedUser);
                    } else {
                        console.error('Failed to fetch current user.');
                    }
                } catch (error) {
                    console.error('Error fetching current user:', error);
                }
            }
        };

        fetchCurrentUser();
    }, [isAuthenticated, user]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (isAuthenticated && currentUser) {
            try {
                const reply: TicketType = {
                    ...ticket,
                    responseText: responseText,
                    responseStatus: ResponseStatus.Answered,
                    assistanceRating: AssistanceRating.Neutral,
                };

                const response = await fetch(`/api/tickets?clientID=${ticket.clientUser}&ticketIndex=${ticket.ticketIndex}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reply),
                });

                if (response.ok) {
                    // Call onSubmit to update the parent component state
                    onSubmit(reply);
                    // Clear the response text and close the form
                    setResponseText('');
                    toggleFormVisibility();

                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.error('Error updating ticket:', errorData);
                }
            } catch (error) {
                console.error('Error updating ticket:', error);
            }
        } else {
            console.log('User is not authenticated or currentUser is null');
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
