import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const DashNavBar = () => {
  return (
    <div className=" text-black w-[15vw] flex flex-col items-center py-6 space-y-6 h-screen font-mono">
      {/* Logo */}
      <Link href="/" className="text-black text-xl font-bold mb-8">Stater Inc.</Link>
      
      {/* Navigation Links */}
      <nav className="space-y-4 flex-1 overflow-y-auto">
        <Link href="/admin-control-panel" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Admin Dashboard</Link>
        <Link href="/dashboard" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Client Portal</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Users</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Currencies</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Volume</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Connections</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Treasury</Link>
      </nav>

      {/* Sign Out Button */}
      <LogoutLink className="text-white bg-black hover:bg-gray-700 px-5 py-2 rounded-md text-sm font-medium w-[70%] flex items-center justify-center">
        Sign Out
      </LogoutLink>
    </div>
  );
};

export default DashNavBar;
