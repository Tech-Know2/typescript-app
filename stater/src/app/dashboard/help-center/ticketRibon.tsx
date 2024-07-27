"use client"

import React from 'react';

interface RibonProps {
  ticketSum: number;
  unAnswered: number;
  unOpened: number;
}

export default function TicketRibon({ ticketSum, unAnswered, unOpened }: RibonProps) {

  return (
    <div className="w-[80vw] h-[12vh] bg-white rounded-md shadow-md p-4 flex flex-col">
      <div className="flex flex-1">
        {/* First Box: Total Sum */}
        <div className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center">
          <p className="text-lg font-semibold">Tickets: {ticketSum}</p>
        </div>
        {/* Second Box: Account Count */}
        <div className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center mx-2">
          <p className="text-lg font-semibold">Unanswered: {unAnswered}</p>
        </div>
        {/* Third Box: Sample Text */}
        <div className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center">
          <p className="text-lg font-semibold">Unopened: {unOpened}</p>
        </div>
      </div>
    </div>
  );
}
