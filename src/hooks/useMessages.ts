import { useEffect, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "@/graphql/subscriptions";
import { Message } from "@/domain/Message";
import { MessageSubscriptionPayload } from "@/domain/graphql";

export const useMessages = (chatRoomId: number, search: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: initialData, loading } = useQuery(GET_MESSAGES, {
    variables: { id: chatRoomId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (initialData?.messages) {
      setMessages(initialData.messages);
    }
  }, [initialData]);

  useSubscription<MessageSubscriptionPayload>(MESSAGE_SUBSCRIPTION, {
    onData: ({ data }) => {
      const payload = data.data?.onMessageUpdated;
      if (!payload) return;

      const { eventType, message } = payload;

      setMessages((prev) => {
        const match =
          search === "" || message.content.text?.toLowerCase().includes(search.toLowerCase());

        if (!match) return prev;

        if (eventType === "ADDED") return [...prev, message];
        if (eventType === "UPDATED") return prev.map((m) => (m.id === message.id ? message : m));
        if (eventType === "DELETED") return prev.filter((m) => m.id !== message.id);
        return prev;
      });
    },
  });

  const filtered = search
    ? messages.filter((m) =>
        m.content.text?.toLowerCase().includes(search.toLowerCase())
      )
    : messages;

  return { messages: filtered, loading };
};