"use client"

import React, { useState } from 'react';
import Ribon from './reports';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Reports } from '../../../../types/walletReports';

export default function NavRibon() {
    // State to keep track of the selected report
    const [selectedReport, setSelectedReport] = useState<Reports>(Reports.Portfolio);
    const { user, isAuthenticated } = useKindeBrowserClient();

    // Function to handle button clicks
    const handleButtonClick = (report: Reports) => {
        if(isAuthenticated)
        {
          setSelectedReport(report);
        }
    };

    return (
        <div className='w-[80vw]'>
              <div className="h-[8vh] bg-white rounded-md shadow-md p-4 flex">
                <div className="flex flex-1 gap-4"> {/* Added gap for spacing */}
                    <button
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleButtonClick(Reports.Portfolio)}
                    >
                        Portfolio
                    </button>
                    <button
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleButtonClick(Reports.Users)}
                    >
                        Authorized Users
                    </button>
                    <button
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleButtonClick(Reports.Connections)}
                    >
                        Connections
                    </button>
                    <button
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleButtonClick(Reports.Transactions)}
                    >
                        Transactions
                    </button>
                    <button
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleButtonClick(Reports.Mint)}
                    >
                        Mint
                    </button>
                    <button
                        className="flex-1 bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                        onClick={() => handleButtonClick(Reports.Ramp)}
                    >
                        Ramp
                    </button>
                </div>
            </div>
            <div className='h-[45vh] bg-white mt-[2vh] rounded-md shadow-md p-4 flex'>
              <Ribon report={selectedReport} />
            </div>
        </div>
    );
}
