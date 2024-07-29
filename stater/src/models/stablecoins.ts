import { Schema, model, models } from 'mongoose';

// Define the schema for a crypto wallet with automatic timestamps
const stablecoinSchema = new Schema({
  currencyName: {
    type: String,
    required: true,
  },
  currentSupply: {
    type: String,
    required: true,
  },
  currencyDescription: {
    type: String,
    required: true,
  },
  currencyNetworks: {
    type: [String],
    required: true,
    enum: ['Stellar', 'Polygon', 'Solana'],
  },
  smartContractAddress: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create a model using the schema
const Stablecoin = models.Stablecoin || model('Stabelcoin', stablecoinSchema);

export default Stablecoin;
