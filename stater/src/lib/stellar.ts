// src/lib/stellar.ts

import { Wallet, StellarConfiguration, ApplicationConfiguration, DefaultSigner } from "@stellar/typescript-wallet-sdk";
import axios, { AxiosInstance } from "axios";

// Configure Axios instance
const customClient: AxiosInstance = axios.create({
    timeout: 1000,
});

// Configure Application
const appConfig = new ApplicationConfiguration(DefaultSigner, customClient);

const wallet = new Wallet({
    stellarConfiguration: StellarConfiguration.TestNet(),
    applicationConfiguration: appConfig,
});

// Function to generate a Stellar wallet
export async function generateStellarWallet(): Promise<{ publicKey: string, secretKey: string }> {
    try {
        // Create a new wallet
        let account = wallet.stellar().account();

        // Generate a keypair
        let accountKeyPair = account.createKeypair();

        // Key pair
        return accountKeyPair;

    } catch (error) {
        console.error("Error generating wallet: ", error);
        throw error;
    }
}