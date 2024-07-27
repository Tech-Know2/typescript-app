export interface TicketType {
    _id: string;
    userID: string;
    questionHeader: string;
    questionText: string;
    subjectMatter: SubjectMatter;
    responderUserID: string;
    responseText: string;
    responseStatus: ResponseStatus;
    assistanceRating: AssistanceRating;
    createdAt?: string;
    updatedAt?: string;
}

export enum SubjectMatter {
    Accounts = 'Accounts',
    Transactions = 'Transactions',
    Minting = 'Minting',
    Ramping = 'Ramping',
    Research = 'Research',
    Cards = 'Cards',
    Other = 'Other',
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