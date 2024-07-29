import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema({
    transactionID: {
        type: Number,
        required: true,
    },
    senderAccountID: {
        type: String,
        required: true,
    },
    recieverAccountID: {
        type: String,
        required: true,
    },
    senderAddress: {
        type: String,
        required: true,
    },
    recieverAddress: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    currency: {
        type: [String],
        required: true,
    },
    blockchain: {
        type: [String],
        required: true,
        enum: ['Stellar', 'Polygon', 'Solana'],
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['Withdrawl', 'Deposit', 'Transfer', 'Stake', 'Unstake', 'Ramp In', 'Ramp Out', 'Mint', 'Burn'],
    },
    }, {
    timestamps: true,
});

// Create a model using the schema
const Transaction = models.Transaction || model('Transaction', transactionSchema);

export default Transaction;
