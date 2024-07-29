export interface WalletReport {
    report: Reports;
}

export enum Reports {
    Portfolio = "Portfolio",
    Users = "Users",
    Connections = "Connections",
    Transactions = "Transactions",
    Mint = "Mint",
    Ramp = "Ramp",
}
