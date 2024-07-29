"use client";

import React, { useState } from 'react';
import { TicketType, AssistanceRating, ResponseStatus } from '../../../types/ticketType';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface TicketProps {
    ticket: TicketType;
}

const TicketDisplay: React.FC<TicketProps> = ({ ticket }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(ticket.assistanceRating);
    const { user, isAuthenticated } = useKindeBrowserClient();

    const togglePopupVisibility = () => {
        setPopupVisible(!isPopupVisible);
    };

    const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRating(event.target.value as AssistanceRating);
    };

    const handleRateAndClose = (event: React.FormEvent) => {
        handleRatingSubmit(event);
        togglePopupVisibility();
    };

    const handleRatingSubmit = async (event: React.FormEvent) =>
    {
        if(isAuthenticated)
        {
            try {
                /*const replyTicket: TicketType = {
                    ...ticket,
                    assistanceRating: selectedRating,
                }*/ 
               
                //for sending assistance data reports back, will add this back in later

                const response = await fetch(`/api/tickets?userID=${user?.id}&ticketIndex=${ticket.ticketIndex}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setSelectedRating(AssistanceRating.Neutral);
                    togglePopupVisibility();
                }

            } catch (error) {
                console.error('Error updating ticket:', error);
            } finally
            {
                window.location.reload();
            }
        }
    }

    const handleDelete = async (event: React.FormEvent) =>
        {
            if(isAuthenticated)
            {
                try {    
                    const response = await fetch(`/api/tickets?userID=${user?.id}&ticketIndex=${ticket.ticketIndex}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        console.log("Ticket successfully deleted");
                    }
    
                } catch (error) {
                    console.error('Error deleting ticket:', error);
                } finally
                {
                    window.location.reload();
                }
            }
        }

    return (
        <main>
            <div className="flex flex-row bg-white rounded-md shadow-md p-4 items-center justify-between">
                <div className='flex flex-col'>
                    <p className="font-bold text-lg">{ticket.questionHeader}</p> {/* Question Header */}
                    <p>Status: {ticket.responseStatus}</p> {/* Question Status */}
                </div>
                <div className="flex space-x-4">
                    {ticket.responseStatus === ResponseStatus.Answered && (
                        <button 
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md" 
                            onClick={togglePopupVisibility}
                        >
                            Open
                        </button>
                    )}
                    <button className="bg-red-500 text-white font-bold px-4 py-2 rounded-md" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                        <h2 className="text-xl font-bold">Ticket Response</h2>
                        <div className='flex flex-col'>
                            <h1>{ticket.questionHeader}</h1>
                            <h2>{ticket.subjectMatter}</h2>
                            <h2 className='underline'>User's Question</h2>
                            <p>{ticket.questionText}</p>
                            <h2 className='underline'>Response</h2>
                            <p>{ticket.responseText}</p>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="rating">Assistance Rating:</label>
                            <select
                                id="rating"
                                value={selectedRating}
                                onChange={handleRatingChange}
                                className="border border-black rounded-md p-2"
                            >
                                {Object.values(AssistanceRating).map(rating => (
                                    <option key={rating} value={rating}>
                                        {rating}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button 
                                type="button" 
                                onClick={togglePopupVisibility} 
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                            <button 
                                type="button" 
                                onClick={handleRateAndClose} 
                                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md"
                            >
                                Rate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default TicketDisplay;