import { Schema, model } from 'mongoose';

// Define the schema for a crypto wallet
const walletSchema = new Schema({
  owner: {
    type: String,
    required: true, // Ensure that each wallet has an owner
  },
  accountName: {
    type: String,
    required: true,
  },
  accountDescription: {
    type: String,
    required: true,
  },
  blockchain: {
    type: String,
    required: true, // Ensure that each wallet specifies the blockchain it uses
    enum: ['Bitcoin', 'Solana', 'Ethereum', 'Stellar', 'Polygon', 'Optimism'],
    default: 'Stellar',
  },
  address: {
    type: String,
    required: true, // Wallet address is typically required
    unique: true,   // Ensure that each address is unique in the database
  },
  balance: {
    type: Number,
    default: 0,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const Wallet = model('Wallet', walletSchema);

export default Wallet;
