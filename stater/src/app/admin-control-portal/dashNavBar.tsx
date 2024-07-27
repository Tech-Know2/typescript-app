"use client"

import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const DashNavBar = () => {
  const { user, isAuthenticated, isLoading, getPermission } = useKindeBrowserClient();

  return (
    <div className=" text-black w-[15vw] flex flex-col items-center py-6 space-y-6 h-screen">
      {/* Logo */}
      <Link href="/" className="text-black text-xl font-bold mb-5">Stater Inc.</Link>
      
      {/* Navigation Links */}
      <nav className="space-y-3 flex-1 overflow-y-auto">
        <Link href="/admin-control-panel" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Admin Dashboard</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">User Analytics</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Asset Managment</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Account Managment</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Trade Analytics</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Integration Managment</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Billing and Subscriptions</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Help Center</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Security & Reports</Link>
        <Link href="/dashboard" className="block px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-700 hover:text-white">Client Portal</Link>
      </nav>

      {/* Sign Out Button */}
      <h2 className='mb-0'>{user?.given_name} {user?.family_name}</h2>
      <LogoutLink className="text-white bg-black hover:bg-gray-700 px-5 py-2 rounded-md text-sm font-medium w-[70%] flex items-center justify-center">
        Sign Out
      </LogoutLink>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Settings</Link>
    </div>
  );
};

export default DashNavBar;
