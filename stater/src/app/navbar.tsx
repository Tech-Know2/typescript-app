"use client"

import Link from 'next/link'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
    return (
      <nav className="fixed top-0 w-full bg-white z-50 shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-800 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {/* Heroicon name: menu */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open */}
                {/* Heroicon name: x */}
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="text-black text-xl font-bold">Stater Inc.</Link>
              </div>
              {/* Navigation links */}
              <div className="hidden sm:block sm:ml-6 flex-grow">
                <div className="flex space-x-8 justify-center">
                  <Link href="/" className="text-black hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Invest
                  </Link>
                  <Link href="/" className="text-black hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Save & Spend
                  </Link>
                  <Link href="/" className="text-black hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Credit
                  </Link>
                  <Link href="/" className="text-black hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Web
                  </Link>
                  <Link href="/" className="text-black hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Mobile
                  </Link>
                  <Link href="/" className="text-black hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Business
                  </Link>
                </div>
              </div>
            </div>
            {/* Right-side navigation */}
            <div className="sm:flex sm:items-center sm:ml-6">
              <LoginLink className="text-black hover:bg-gray-800 hover:text-white hover:border-1 px-5 py-2 rounded-md text-sm font-medium border-2 border-black rounded-full mr-2">
                Log In
              </LoginLink>
              <RegisterLink className="text-white bg-black hover:bg-gray-800 px-5 py-2 rounded-md text-sm font-medium">
                Register
              </RegisterLink>
          </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  