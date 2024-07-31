"use client"

import { useState } from 'react';
import Link from 'next/link';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';

enum Sections {
  Save = 'Save',
  Transact = 'Transact',
  Spend = 'Spend',
  Invest = 'Invest',
  Mobile = 'Mobile',
  Business = 'Business',
}

export default function Hero() {
  const [selectedSection, setSelectedSection] = useState<Sections>(Sections.Save);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case Sections.Save:
        return (
          <>
            <div className='flex flex-col items-start mr-[2vw]'>
              <h1 className="text-xl font-bold mb-[1vw] mt-[1vw]">Save Your Cash</h1>
              <Link href="/" className='underline text-md'>Learn More</Link>
            </div>
            <h2 className="text-md w-[30vw] mt-[1vw]">Utilize the power of 6% - 10% interest on your digitized money, and save for a strong and better future.</h2>
          </>
        );
      case Sections.Transact:
        return (
          <>
            <div className='flex flex-col items-start mr-[2vw]'>
              <h1 className="text-xl font-bold mb-[1vw] mt-[1vw]">Instant, Free, Everywhere</h1>
              <Link href="/" className='underline text-md'>Learn More</Link>
            </div>
            <h2 className="text-md w-[30vw] mt-4">Send and cash out money in over 180 countries globally. Earn interest on unwithdrawn sums, and begin building wealth now.</h2>
          </>
        );
      case Sections.Spend:
        return (
          <>
            <div className='flex flex-col items-start mr-[2vw]'>
              <h1 className="text-xl font-bold mb-[1vw] mt-[1vw]">Connect With Merchants</h1>
              <Link href="/" className='underline text-md'>Learn More | Feature Coming Soon</Link>
            </div>
            <h2 className="text-md w-[30vw] mt-4">Execute cashless transactions with Stellar merchants and vendors all around the globe.</h2>
          </>
        );
      case Sections.Invest:
        return (
          <>
            <div className='flex flex-col items-start mr-[2vw]'>
              <h1 className="text-xl font-bold mb-[1vw] mt-[1vw]">Invest in Your Future</h1>
              <Link href="/" className='underline text-md'>Learn More</Link>
            </div>
            <h2 className="text-md w-[30vw] mt-4">Invest in dozens of markets and currencies, and start your wealth-building journey today.</h2>
          </>
        );
      case Sections.Mobile:
        return (
          <>
            <div className='flex flex-col items-start mr-[2vw]'>
              <h1 className="text-xl font-bold mb-[1vw] mt-[1vw]">Mobile Touch</h1>
              <Link href="/" className='underline text-md'>Learn More</Link>
            </div>
            <h2 className="text-md w-[30vw] mt-4">Save, Invest, Monitor, and Earn all through a mobile-first banking experience.</h2>
          </>
        );
      case Sections.Business:
        return (
          <>
            <div className='flex flex-col items-start mr-[2vw]'>
              <h1 className="text-xl font-bold mb-[1vw] mt-[1vw]">Business First</h1>
              <Link href="/" className='underline text-md'>Learn More | Feature Coming soon</Link>
            </div>
            <h2 className="text-md w-[30vw] mt-4">Manage your products, customers, payments, and invoicing all for free.</h2>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="py-60">
      {/* HERO ELEMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">Save your Money, Build Your Future</h1>
        <h2 className="text-2xl text-gray-700 mb-8">Banking the way it should have been done</h2>
        <div className="flex justify-center space-x-4">
          <RegisterLink className="text-white bg-black hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium">
            Get Started
          </RegisterLink>
          <Link href="/" className="text-black border-2 border-black hover:bg-gray-700 hover:text-white px-5 py-3 rounded-md text-lg font-medium">
            Learn More
          </Link>
        </div>
      </div>

      {/* DISPLAY RIBON ELEMENT */}
      <div className="bg-gray-200 flex flex-col text-black justify-center items-center mt-[8vw] p-4 shadow-lg mb-[0vw] rounded-md">
        <div className="flex justify-evenly mt-2 mb-5 space-x-4 flex-row space-x-10">
          {Object.values(Sections).map((section) => (
            <button
              key={section}
              className={`text-black border-2 border-gray-800 hover:bg-gray-400 hover:text-black px-2 py-1 rounded-md text-md font-medium uppercase text-sm ${
                selectedSection === section ? 'bg-gray-500 text-black' : ''
              }`}
              onClick={() => setSelectedSection(section)}
            >
              {section}
            </button>
          ))}
        </div>
        <div className="text-center flex flex-row items-start">{renderSectionContent()}</div>
      </div>
    </main>
  );
}