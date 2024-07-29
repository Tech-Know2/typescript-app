import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema({
    transactionID: {
        type: Number,
        required: true,
    },
    fromUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fromAddress: {
        type: String,
        required: true,
    },
    toAddress: {
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
