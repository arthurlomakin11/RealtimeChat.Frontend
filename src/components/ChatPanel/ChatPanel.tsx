import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  MESSAGE_SUBSCRIPTION,
  SEND_MESSAGE,
  EDIT_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGES,
} from "./subscriptions";
import styles from "./ChatPanel.module.css";
import { formatDate } from "@/utils/formatDate";

interface Message {
  id: number;
  senderId: string;
  content: { text?: string; url?: string };
  sentAt: string;
}

const ChatPanel: React.FC<{ chatRoomId: number }> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const { loading, error, data: initialData } = useQuery(GET_MESSAGES, {
    variables: { id: chatRoomId },
    fetchPolicy: "network-only" // Don't use cache
  });
    
  useEffect(() => {
    if (initialData?.messages) {
      setMessages(initialData.messages);
    }
  }, [initialData])
    
  const { data } = useSubscription(MESSAGE_SUBSCRIPTION);

  useEffect(() => {
    if (data?.onMessageUpdated) {
      const { eventType, message } = data.onMessageUpdated;

      let newMessages:Message[] = [];

      if (eventType === "ADDED") {
        newMessages = [...messages, message];
      }
      else if (eventType === "UPDATED") {
        newMessages = messages.map((m) => (m.id === message.id ? message : m));
      }
      else if (eventType === "DELETED") {
        newMessages = messages.filter((m) => m.id !== message.id);
      }

      setMessages(newMessages);
    }
    
  }, [data]);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    await sendMessage({ variables: { chatRoomId, senderId: "45f74bba-165c-447f-b251-d02aaab12e81", text: input } });
    setInput("");
  };

  const [editMessage] = useMutation(EDIT_MESSAGE);

  const handleEditMessage = async (messageId: number) => {
    const newText = prompt("Enter new message text:");
    if (newText) {
      await editMessage({ variables: { messageId, newText } });
    }
  };

  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handleDeleteMessage = async (messageId: number) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      await deleteMessage({ variables: { messageId } });
    }
  };

  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatHeader}>Chat</div>
      {
        loading ? "Loading" :
        <>
          <div className={styles.messages}>
          {messages.map((message) => (
            <div key={message.id} className={styles.message}>
              <div>
                <div className={styles.messageHeader}>
                  <strong>{message.senderId}</strong>
                  <span className={styles.messageDate}>
                    {formatDate(message.sentAt)}
                  </span>
                </div>
                <div className={styles.messageContent}>
                  {message.content.text || message.content.url}
                </div>
              </div>
              <div>
                <button onClick={() => handleEditMessage(message.id)}>✏️</button>
                <button onClick={() => handleDeleteMessage(message.id)}>🗑️</button>
              </div>
            </div>
          ))}
          </div>
          <div className={styles.inputPanel}>
            <input
              type="text"
              className={styles.input}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className={styles.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </>
      }
    </div>
  );
};

export { ChatPanel };