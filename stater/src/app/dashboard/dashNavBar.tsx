import Link from 'next/link';
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const DashNavBar = () => {
  return (
    <div className=" text-black w-48 flex flex-col items-center py-6 space-y-6 h-screen">
      {/* Logo */}
      <Link href="/" className="text-black text-xl font-bold mb-8">Stater Inc.</Link>
      
      {/* Navigation Links */}
      <nav className="space-y-4 flex-1 overflow-y-auto">
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Dashboard</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Accounts</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Treasury</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Mint</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Research</Link>
        <Link href="/" className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white">Trade</Link>
      </nav>

      {/* Sign Out Button */}
      <LogoutLink className="text-white bg-black hover:bg-gray-700 px-5 py-2 rounded-md text-sm font-medium">
        Sign Out
      </LogoutLink>
    </div>
  );
};

export default DashNavBar;
