import { Schema, model, models } from 'mongoose';
import { TicketType } from '@/types/ticketType';

const ticketSchema = new Schema({
    ticketIndex: { 
        type:Number,
        required: true,
    },
    clientUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
        enum: ['Other', 'Accounts', 'Transfers', 'Minting', 'Ramping', 'MoneyGram', 'Investments', 'Connections'],
    },
    adminUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    responseText: {
        type: String,
        required: false,
    },
    responseStatus: {
        type: String,
        required: false,
        enum: ['Answered', 'Unanswered'],
        default: 'Unanswered',
    },
    assistanceRating: {
        type: String,
        required: false,
        enum: ['Satisifed', 'Neutral', 'Disappointed', 'Unsatisfied', 'Outraged'],
    },
    }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const Ticket = models.Ticket || model('Ticket', ticketSchema);

export default Ticket;
