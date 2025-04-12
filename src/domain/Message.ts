export interface Message {
    id: number;
    senderId: string;
    sentAt: string;
    content: {
        text?: string;
        url?: string;
    };
}