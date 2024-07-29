import { UserType } from "./userType";

export interface TicketType {
    ticketIndex: number;
    clientUser: UserType;
    questionHeader: string;
    questionText: string;
    subjectMatter: SubjectMatter;
    adminUser: UserType;
    responseText: string;
    responseStatus: ResponseStatus;
    assistanceRating: AssistanceRating;
}

export enum SubjectMatter {
    Other = 'Other',
    Accounts = 'Accounts',
    Transfers = 'Transfers',
    Minting = 'Minting',
    Ramping = 'Ramping',
    MoneyGram = 'MoneyGram',
    Investments = 'Investments',
    Connections = 'Connections',
}

export enum ResponseStatus {
    Answered = 'Answered',
    Unanswered = 'Unanswered',
}

export enum AssistanceRating {
    Satisfied = 'Satisfied',
    Neutral = 'Neutral',
    Disappointed = 'Disappointed',
    Unsatisfied = 'Unsatisfied',
    Outraged = 'Outraged',
}