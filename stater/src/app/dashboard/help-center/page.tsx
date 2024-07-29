"use client";

import React, { useEffect, useState } from 'react';
import DashNavBar from '../dashNavBar';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ClipLoader } from 'react-spinners';
import TicketItem from './ticket';
import { TicketType, ResponseStatus } from '../../../types/ticketType';
import TicketRibon from './ticketRibon';
import TicketForm from './ticketForm';

export default function HelpCenter() {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const [isFormVisible, setFormVisible] = useState(false);
    const [ticketSum, setTicketSum] = useState(0);
    const [unAnswered, setUnAnswered] = useState(0);
    const [answered, setAnswered] = useState(0);

    const fetchTickets = async () => {
        if (isAuthenticated) {
            try {
                const response = await fetch(`/api/tickets?userID=${user?.id || ''}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setTickets(data);

                const totalTickets = data.length;
                const unansweredTickets = data.filter((ticket: TicketType) => ticket.responseStatus === ResponseStatus.Unanswered).length;
                const answeredTickets = data.filter((ticket: TicketType) => ticket.responseStatus === ResponseStatus.Answered).length;

                setTicketSum(totalTickets);
                setUnAnswered(unansweredTickets);
                setAnswered(answeredTickets);

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch tickets', error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [isAuthenticated]);

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    const handleSubmitTicket = async (newTicket: TicketType) => {
        try {
            const response = await fetch('/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTicket),
            });

            if (response.ok) {
                const ticket = await response.json();
                setTickets(prevTickets => [ticket, ...prevTickets]);
                toggleFormVisibility();
                fetchTickets(); // Re-fetch tickets to update counts
            } else {
                console.error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen">
                <DashNavBar />
                <div className="flex flex-1 flex-col items-center justify-center bg-gray-100">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    <p className="mt-4 text-lg font-medium">Loading your tickets, please wait...</p>
                </div>
            </div>
        );
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tickets.length / itemsPerPage);

    return (
        <div className="flex">
            <DashNavBar />

            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-4xl font-bold mb-8">How can we help you, {user?.given_name}?</h1>

                <TicketRibon ticketSum={ticketSum} unAnswered={unAnswered} unOpened={answered} />

                <button
                    onClick={toggleFormVisibility}
                    className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md mb-4 mt-4"
                >
                    Create Ticket
                </button>

                <TicketForm
                    isFormVisible={isFormVisible}
                    toggleFormVisibility={toggleFormVisibility}
                    onSubmit={handleSubmitTicket}
                />

                <div className="space-y-4 w-[80vw]">
                    {currentTickets.length > 0 ? (
                        <>
                            {currentTickets.map((ticket) => (
                                <TicketItem
                                    key={ticket.ticketIndex}
                                    ticket={ticket}
                                />
                            ))}

                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="bg-gray-800 text-white font-bold px-4 py-2 rounded-md"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <p>No tickets found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}