export interface TicketType {
    ticketIndex: number;
    userID: string;
    questionHeader: string;
    questionText: string;
    subjectMatter: SubjectMatter;
    responderUserID: string;
    responseText: string;
    responseStatus: ResponseStatus;
    assistanceRating: AssistanceRating;
}

export enum SubjectMatter {
    Other = 'Other',
    Accounts = 'Accounts',
    Transactions = 'Transactions',
    Minting = 'Minting',
    Ramping = 'Ramping',
    Research = 'Research',
    Cards = 'Cards',
    AssetManagement = 'Asset Management',
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