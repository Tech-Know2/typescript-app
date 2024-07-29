import { UserType } from "./userType";

export interface Wallet {
  user: UserType;
  accountName: string;
  accountDescription: string;
  accountType: AccountType;
  address: string;
  balance: number;
  owner: string;
  authUsers: UserType[];
}

export enum AccountType {
  Checkings = 'Checkings',
  Savings = 'Savings',
  Investments = 'Investments',
}