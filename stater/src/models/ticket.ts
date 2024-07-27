import { Schema, model, models } from 'mongoose';

const ticketSchema = new Schema({
    ticketIndex: { 
        type:Number,
        required: true,
    },
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
        enum: ['Other', 'Accounts', 'Transactions', 'Minting', 'Ramping', 'Research', 'Cards', 'Asset Management'],
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
    },
    }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const Ticket = models.Ticket || model('Ticket', ticketSchema);

export default Ticket;
