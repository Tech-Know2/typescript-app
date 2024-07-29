import { Schema, model, models } from 'mongoose';

const defiConnectionSchema = new Schema({
    connectionID: {
        type: Number,
        required: true,
        unique: true,
    },
    key: {
        type: String,
        required: true,
    },
    connectionName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    connectionSite: {
        type: String,
        required: true,
    },
    connectionIcon: {
        type: String,
        required: true,
    },
    blockchain: {
        type: String,
        required: true,
        enum: ['Stellar', 'Polygon'],
    },
    service: {
        type: String,
        required: true,
        enum: ['Trading', 'Lending', 'Insurance', 'Staking', 'Yield Farming', 'AMM'],
    },
    interactionMethods: {
        type: [String],
        required: true,
        enum: ['deposit', 'withdraw', 'borrow', 'repay', 'stake', 'unstake', 'swap'],
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'maintenance'],
    },
    securityAudits: {
        type: [String],
        required: false,
    },
    compliance: {
        type: String,
        required: false,
    },
    daoGovernance: {
        type: String,
        required: false,
        enum: ['Yes', 'No'],
    },
    }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const defiConnection = models.defiConnection || model('defiConnection', defiConnectionSchema);

export default defiConnection;
