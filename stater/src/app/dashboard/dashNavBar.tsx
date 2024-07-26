"use client"

import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { usePathname } from 'next/navigation'

const DashNavBar = () => {
  const { user, isAuthenticated, isLoading, getPermission } = useKindeBrowserClient();
  const isClient = getPermission('view:client');
  const isAdmin = getPermission('view:admin');

  const pathname = usePathname() //Will eventually use for dynamic displays for the nav elements

  const commonLinks = (
    <>
      <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Dashboard</Link>
      <Link href="/dashboard/accounts" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Accounts</Link>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Transfer</Link>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Trade</Link>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Research</Link>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Ramp</Link>
      <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Mint</Link>
    </>
  );

  return (
    <div className="text-black w-[15vw] flex flex-col items-center py-6 space-y-6 h-screen font-mono">
      {/* Logo */}
      <Link href="/" className="text-black text-xl font-bold mb-8">Stater Inc.</Link>
      
      {/* Navigation Links */}
      <nav className="space-y-4 flex-1 overflow-y-auto">
        {isClient && commonLinks}
        {isAdmin && (
          <>
            <Link href="/admin-control-portal" className="block px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-700 hover:text-white">Admin Portal</Link>
          </>
        )}
      </nav>

      {/* Sign Out Button */}
      <h2 className='mb-0'>{user?.given_name} {user?.family_name}</h2>
      <LogoutLink className="text-white bg-black hover:bg-gray-700 px-5 py-2 rounded-md text-sm font-medium w-[70%] flex items-center justify-center font-bold">
        Sign Out
      </LogoutLink>
    </div>
  );
};

export default DashNavBar;
