import { Schema, model, models } from 'mongoose';

// Define the schema for a crypto wallet with automatic timestamps
const walletSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountDescription: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ['Checkings', 'Savings', 'Investments'],
    default: 'Checkings',
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
const Wallet = models.Wallet || model('Wallet', walletSchema);

export default Wallet;
