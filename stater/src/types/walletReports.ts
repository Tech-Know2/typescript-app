export interface WalletReport {
    report: Reports;
}

export enum Reports {
    Portfolio = "Portfolio",
    Balances = "Balances",
    Connections = "Connections",
    Transactions = "Transactions",
    Mint = "Mint",
    Ramp = "Ramp",
}
