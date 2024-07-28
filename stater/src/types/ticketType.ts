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