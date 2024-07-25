import React from 'react';
import DashNavBar from '../dashNavBar';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import mongoose from 'mongoose';
import { redirect } from 'next/navigation';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Wallets from './wallet'; 

export default async function Accounts() {
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
            <h1 className="text-3xl font-bold mb-8">Your Accounts</h1>
            <Wallets />
        </div>
        </div>
    );
};