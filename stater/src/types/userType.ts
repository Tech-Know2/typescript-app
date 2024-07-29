import { Wallet } from "./Wallet";
import { ObjectId } from 'mongoose';

export interface UserType {
    kindeID: string;
    accountName: string;
    accountEmail: string;
    wallets: Wallet[];
}