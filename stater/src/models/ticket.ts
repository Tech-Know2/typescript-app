import { Schema, model, models } from 'mongoose';

const ticketSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    questionHeader: {
        type: String,
        required: true,
    },
    questionText: {
        type: String,
        required: true,
    },
    subjectMatter: {
        type: String,
        required: true,
        enum: ['Accounts', 'Transactions', 'Minting', 'Ramping', 'Research', 'Cards', 'Other', 'Asset Management'],
    },
    responderUserID: {
        type: String,
        required: true,
    },
    responseText: {
        type: String,
        required: true,
    },
    responseStatus: {
        type: String,
        required: true,
        enum: ['Answered', 'Unanswered'],
        default: 'Unanswered',
    },
    assistanceRating: {
        type: String,
        required: true,
        enum: ['Satisifed', 'Neutral', 'Disappointed', 'Unsatisfied', 'Outraged'],
        default: 'Neutral',
    },
    }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const Ticket = models.Ticket || model('Transaction', ticketSchema);

export default Ticket;
