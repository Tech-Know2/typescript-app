"use client";

import React, { useEffect, useState } from 'react';
import DashNavBar from '../dashNavBar';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ClipLoader } from 'react-spinners';
import { TicketType } from '../../../types/ticketType';
import TicketDisplay from './ticket';
import { ResponseStatus } from '../../../types/ticketType';

export default function HelpCenter() {
    const { user, isAuthenticated } = useKindeBrowserClient();
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const fetchTickets = async () => {
        if (isAuthenticated) {
            try {
                const response = await fetch(`/api/tickets?status=${ResponseStatus.Unanswered}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                setTickets(data);
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

    if (loading) {
        return (
            <div className="flex h-screen">
                <DashNavBar />
                <div className="flex flex-1 flex-col items-center justify-center bg-gray-100">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                    <p className="mt-4 text-lg font-medium">Loading unanswered tickets</p>
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
                <h1 className="text-4xl font-bold mb-8">Unanswered Tickets</h1>

                <div className="space-y-4 w-[80vw] mt-[2vw]">
                    {currentTickets.length > 0 ? (
                        <>
                            {currentTickets.map((ticket) => (
                                <TicketDisplay
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
