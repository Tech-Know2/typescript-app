import React from 'react';
import DashNavBar from './dashNavBar';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    //const {getUser} = getKindeServerSession();
    //const user = await getUser();

    const { isAuthenticated, getPermission } = getKindeServerSession();
    const isLoggedIn = await isAuthenticated();
    const permission = await getPermission('view:client')

    if(!isLoggedIn) {
        redirect('../api/auth/login');  
    }

    if(!permission?.isGranted){
        redirect('../api/auth/login');
    }
    

    return (
        <div className="flex">
        {/* Vertical Navigation Bar */}
        <DashNavBar />

        {/* Main Content Area */}
        <div className="flex-1 p-8 bg-gray-100 font-mono">
            {/* Giant Header/Welcome Text */}
            <h1 className="text-4xl font-bold mb-8">Welcome!</h1>

            {/* Your additional content here */}
            {/* Example: */}
            <p className="text-lg">
            This is your dashboard content. You can add charts, tables, or any other content here.
            </p>
        </div>
        </div>
    );
};