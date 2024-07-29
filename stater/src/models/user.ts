import { Schema, model, models } from 'mongoose';

// Define the schema for a user with automatic timestamps
const userSchema = new Schema({
  kindeID: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountEmail: {
    type: String,
    required: true,
  },
  wallets: [{
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const User = models.User || model('User', userSchema);

export default User;