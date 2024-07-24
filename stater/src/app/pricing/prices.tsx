import Link from 'next/link';
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Prices() {
  return (
    <main className="flex flex-col items-center p-6 space-y-6 font-mono mt-[0vw]">
      <div className="w-[55vw] mb-[10vw]">
        <table className="w-full mb-8"> {/* Apply margin-bottom directly */}
          <thead>
            <tr>
              <th className="py-2 px-4 text-center text-3xl font-semibold text-gray-700">Universal</th>
              <th className="py-2 px-4 text-center text-3xl font-semibold text-gray-700">Advanced</th>
              <th className="py-2 px-4 text-center text-3xl font-semibold text-gray-700">Institution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black">Curated DeFi Access</td>
              <td className="py-2 px-4 text-center text-md text-black">Custom DeFi Access</td>
              <td className="py-2 px-4 text-center text-md text-black">DeFi + CeFi Access</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black line-through">Options + Futures</td>
              <td className="py-2 px-4 text-center text-md text-black">Options + Futures</td>
              <td className="py-2 px-4 text-center text-md text-black">Options + Futures</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black">Lending Pools</td>
              <td className="py-2 px-4 text-center text-md text-black">Lending Pools</td>
              <td className="py-2 px-4 text-center text-md text-black">Lending Pools</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black">High Fidelity Data</td>
              <td className="py-2 px-4 text-center text-md text-black">High Fidelity Data</td>
              <td className="py-2 px-4 text-center text-md text-black">High Fidelity Data</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black line-through">Custom Exchanges</td>
              <td className="py-2 px-4 text-center text-md text-black">Custom Exchanges</td>
              <td className="py-2 px-4 text-center text-md text-black">Custom Exchanges</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black">Non Custodial</td>
              <td className="py-2 px-4 text-center text-md text-black">Non Custodial</td>
              <td className="py-2 px-4 text-center text-md text-black">Non Custodial</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black">MoneyGramm Access</td>
              <td className="py-2 px-4 text-center text-md text-black">MoneyGramm Access</td>
              <td className="py-2 px-4 text-center text-md text-black">Custom</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black">Insurance Access</td>
              <td className="py-2 px-4 text-center text-md text-black">Insurance Access</td>
              <td className="py-2 px-4 text-center text-md text-black">Custom</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-md text-black line-throug">API Access</td>
              <td className="py-2 px-4 text-center text-md text-black">API Access</td>
              <td className="py-2 px-4 text-center text-md text-black">API Access</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-xl text-black font-bold">Free Forever</td>
              <td className="py-2 px-4 text-center text-xl text-black font-bold">$20 / month</td>
              <td className="py-2 px-4 text-center text-xl text-black font-bold">Contact Us</td>
            </tr>
            <tr>
              <td className="py-2 px-4 text-center text-xl text-black font-bold">
                <RegisterLink className="text-white bg-black hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium">
                    Get Started
                </RegisterLink>
                </td>
                <td className="py-2 px-4 text-center text-xl text-black font-bold">
                <RegisterLink className="text-white bg-black hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium">
                    Get Started
                </RegisterLink>
                </td>
                <td className="py-2 px-4 text-center text-xl text-black font-bold">
                <RegisterLink className="text-white bg-black hover:bg-gray-700 px-5 py-3 rounded-md text-lg font-medium">
                    Get Started
                </RegisterLink>
                </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-[85vw] mt-[0vw]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-2 text-center font-semibold text-gray-700"></th>
              <th className="py-2 px-4 text-center text-xl font-semibold text-gray-700">Universal Plan</th>
              <th className="py-2 px-4 text-center text-xl font-semibold text-gray-700">Pro Plan</th>
              <th className="py-2 px-4 text-center text-xl font-semibold text-gray-700">Institution Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Wallet Type</td>
              <td className="py-2 px-4 text-center text-sm text-black">Non Custodial</td>
              <td className="py-2 px-4 text-center text-sm text-black">Non Custodial</td>
              <td className="py-2 px-4 text-center text-sm text-black">Non Custodial</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">KYC/AML Requried</td>
              <td className="py-2 px-4 text-center text-sm text-black">No</td>
              <td className="py-2 px-4 text-center text-sm text-black">Yes</td>
              <td className="py-2 px-4 text-center text-sm text-black">Yes</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Standard Trading Fees</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.1%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.05%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ None</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Ramping Fees</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 1%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.5%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.05%</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Transaction Fee</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.1%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.05%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ None</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Bridging Fee</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 1%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.5%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.05%</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Bridgeable Chains</td>
              <td className="py-2 px-4 text-center text-sm text-black">10+</td>
              <td className="py-2 px-4 text-center text-sm text-black">10+</td>
              <td className="py-2 px-4 text-center text-sm text-black">10+</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Lending Fees</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 2%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 1%</td>
              <td className="py-2 px-4 text-center text-sm text-black">+ 0.1%</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Minting Fees</td>
              <td className="py-2 px-4 text-center text-sm text-black">*Free</td>
              <td className="py-2 px-4 text-center text-sm text-black">*Free</td>
              <td className="py-2 px-4 text-center text-sm text-black">*Free</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Exchanges</td>
              <td className="py-2 px-4 text-center text-sm text-black">20+</td>
              <td className="py-2 px-4 text-center text-sm text-black">Custom</td>
              <td className="py-2 px-4 text-center text-sm text-black">Custom + OTC</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">API Fees</td>
              <td className="py-2 px-4 text-center text-sm text-black">Not Applicable</td>
              <td className="py-2 px-4 text-center text-sm text-black">$0.01</td>
              <td className="py-2 px-4 text-center text-sm text-black">$0.001</td>
            </tr>
            <tr>
              <td className="py-2 px-1 text-center text-md text-black">Accounts</td>
              <td className="py-2 px-4 text-center text-sm text-black">2</td>
              <td className="py-2 px-4 text-center text-sm text-black">5</td>
              <td className="py-2 px-4 text-center text-sm text-black">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
