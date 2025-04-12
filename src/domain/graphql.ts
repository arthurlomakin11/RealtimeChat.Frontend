import { Message } from "@/domain/Message";

export type MessageEventType = "ADDED" | "UPDATED" | "DELETED";

export interface MessageSubscriptionPayload {
  onMessageUpdated: {
    eventType: MessageEventType;
    message: Message;
  };
}