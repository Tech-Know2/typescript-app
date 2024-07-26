// components/AccountItem.tsx

import React from 'react';

interface AccountItemProps {
  index: number;
  accountName: string;
  network: string;
  balance: number;
}

const AccountItem: React.FC<AccountItemProps> = ({ index, accountName, network, balance }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex space-x-4">
        <span className="font-bold">{index + 1}.</span>
        <div>
          <p className="font-semibold">{accountName}</p>
          <p className="text-gray-500">{network}</p>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <span className="font-mono">{balance.toFixed(2)}</span>
        <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md">Manage</button>
      </div>
    </div>
  );
};

export default AccountItem;