import Link from 'next/link';
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Hero() {
  return (
    <main className="py-60 font-mono mb-[0vw]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-[0vw]">
        <h1 className="text-5xl font-bold text-black mb-4">Value Dosen't Imply Cost</h1>
        <h2 className="text-2xl text-gray-700 mb-8">Build and manage your wealth for free, the way you want to do it</h2>
      </div>
    </main>
  );
}