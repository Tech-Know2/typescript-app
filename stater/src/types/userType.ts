import { Wallet } from "./Wallet";
import { ObjectId } from 'mongoose';

export interface UserType {
    kindeID: string;
    firstName: string;
    lastName: string;
    accountEmail: string;
    accountRole: accountRole;
    wallets: Wallet[];
}

export enum accountRole {
    Retail = 'Answered',
    Admin = 'Admin',
    Business = 'Business',
}