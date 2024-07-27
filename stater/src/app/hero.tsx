import Link from 'next/link';
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Hero() {
  return (
    <main className="py-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">Own your Money, Own Your Future</h1>
        <h2 className="text-2xl text-gray-700 mb-8">Take control of your finances with Stater</h2>
        <div className="flex justify-center space-x-4">
          <RegisterLink className="text-white bg-black hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium">
            Get Started
          </RegisterLink>
          <Link href="/" className="text-black border-2 border-black hover:bg-gray-700 hover:text-white px-5 py-3 rounded-md text-lg font-medium">
            Learn More
          </Link>
        </div>
      </div>
    </main>
  );
}
