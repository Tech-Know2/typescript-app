"use client"

import React from 'react';

export default function NavRibon() {

  return (
    <div className="w-[80vw] h-[8vh] bg-white rounded-md shadow-md p-4 flex font-mono">
      <div className="flex flex-1 gap-4"> {/* Added gap for spacing */}
        <button className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
          Portfolio
        </button>
        <button className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
          Asset Balances
        </button>
        <button className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
          Connections
        </button>
        <button className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
          Transactions
        </button>
        <button className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
          Mint
        </button>
        <button className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out">
          Ramp
        </button>
      </div>
    </div>
  );
}
