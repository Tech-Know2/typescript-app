import React from 'react';
import { useRouter } from 'next/navigation';
import { Wallet } from '@/types/Wallet';

interface AccountItemProps {
  index: number;
  account: Wallet;
}

const AccountItem: React.FC<AccountItemProps> = ({ index, account }) => {
  const router = useRouter();

  const handleManageClick = () => {
    const params = new URLSearchParams({
        accountAddress: account.address,  // Ensure consistent parameter names
        accountName: account.accountName,
        owner: account.owner,
    });
    router.push(`/dashboard/accounts/manage?${params.toString()}`);
  };


  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex space-x-4">
        <span className="font-bold">{index + 1}.</span>
        <div>
          <p className="font-semibold">{account.accountName}</p>
          <p className="text-gray-500">{account.accountType}</p>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <span className="">{account.balance.toFixed(2)}</span>
        <button
          onClick={handleManageClick}
          className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md"
        >
          Manage
        </button>
      </div>
    </div>
  );
};

export default AccountItem;
