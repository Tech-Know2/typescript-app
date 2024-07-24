import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function LeftSol() {
    return (
      <main className="flex px-[10vw] h-[350px] mt-[4vw] mb-[4vw] font-mono">
        {/* Left Side: Content */}
        <div className="flex-1 p-8 mr-[2vw]">
          <h1 className="text-3xl font-bold mb-4">High Fidelity Data</h1>
          <p className="text-lg mb-6">
            Dozens of asset and market metrics for each asset, pulled from a dozen different providers to give you the best insight into markets and price fluctuations.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-lg">Risk and Safety Ratings</li>
            <li className="text-lg">Diversified Oracles</li>
            <li className="text-lg">Countless Metrics and Insights</li>
            {/* Add more bullet points as needed */}
          </ul>
          <RegisterLink className="inline-block mt-6 px-6 py-3 bg-black text-white text-lg font-medium rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition duration-300 ease-in-out">
            Try Out
          </RegisterLink>
        </div>
  
        {/* Right Side: Graphic or SVG */}
        <div className="flex-shrink-0 w-[30vw] bg-gray-200 ml-[2vw]">
          {/* Placeholder for SVG or graphic */}
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
          >
            <rect width="100" height="100" fill="#e2e8f0" />
            {/* Add your SVG content or graphic here */}
          </svg>
        </div>
      </main>
    );
  }
  