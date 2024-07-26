import { Schema, model } from 'mongoose';

// Define the schema for a crypto wallet with automatic timestamps
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
    required: true,
    enum: ['Bitcoin', 'Solana', 'Ethereum', 'Stellar', 'Polygon', 'Optimism'],
    default: 'Stellar',
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const Wallet = model('Wallet', walletSchema);

export default Wallet;
