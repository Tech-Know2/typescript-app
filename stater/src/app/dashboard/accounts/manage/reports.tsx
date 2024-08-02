import React from 'react';
import { Reports } from '../../../../types/walletReports';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Portfolio from './portfolioComp';
import Connections from './connectionsComp';
import Ramp from './rampComp';
import Transactions from './transactionsComp';
import Mint from './mintComp';
import AuthUsers from './authUsersComp';

interface RibonProps {
    report?: Reports; // Make the report prop optional
}

const Ribon: React.FC<RibonProps> = ({ report = Reports.Portfolio }) => { // Default value set here

    const { user, isAuthenticated } = useKindeBrowserClient();

    const renderComponent = () => {
        if(isAuthenticated)
        {
            switch (report) {
                case Reports.Portfolio:
                    return <Portfolio />;
                case Reports.Users:
                    return <AuthUsers />;
                case Reports.Connections:
                    return <Connections />;
                case Reports.Transactions:
                    return <Transactions />;
                case Reports.Mint:
                    return <Mint />;
                case Reports.Ramp:
                    return <Ramp />;
                default:
                    return <Portfolio />;
            }
        }
    };

    return (
        <div>
            {renderComponent()}
        </div>
    );
};

export default Ribon;
