"use client"

import React, { useEffect, useState } from 'react';
import DashNavBar from '../dashNavBar';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { ClipLoader } from 'react-spinners';
import TicketItem from './ticket';
import { TicketType } from '../../../types/ticketType';
import TicketRibon from './ticketRibon';

export default function HelpCenter() {
    const { user, isAuthenticated } = useKindeBrowserClient();  
    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        if (isAuthenticated) {
            // Fetch tickets here and set them to state
            // Example: fetchTickets().then(data => { setTickets(data); setLoading(false); });
            setLoading(false); // Remove this when fetching tickets
        }
    }, [isAuthenticated]);

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

            <div className="flex-1 p-8 bg-gray-100 font-mono">
                <h1 className="text-4xl font-bold mb-8">How can we help you today, {user?.given_name}?</h1>

                <TicketRibon ticketSum={5} unAnswered={2} unOpened={1} />

                <div className="space-y-4">
                    {currentTickets.length > 0 ? (
                        <>
                            {currentTickets.map((ticket) => (
                                <TicketItem
                                    key={ticket._id}
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
