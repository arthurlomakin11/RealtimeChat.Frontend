/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./ChatPanel.module.css";
import { useMessages } from "@/hooks/useMessages";
import { MessageItem } from "./MessageItem";
import { MessageInput } from "./MessageInput";
import { DELETE_MESSAGE, EDIT_MESSAGE, SEND_MESSAGE } from "@/graphql/subscriptions";

export const ChatPanel = ({ chatRoomId }: { chatRoomId: number }) => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const { messages, loading } = useMessages(chatRoomId, search);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [editMessage] = useMutation(EDIT_MESSAGE);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage({ variables: { chatRoomId, senderId: "45f74bba-165c-447f-b251-d02aaab12e81", text: input } });
    setInput("");
  };

  const handleEdit = async (id: number) => {
    const newText = prompt("New text?");
    if (newText) await editMessage({ variables: { messageId: id, newText } });
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete?")) await deleteMessage({ variables: { messageId: id } });
  };

  return (
    <div className={styles.chatPanel}>
      <div className={styles.chatHeader}>
        Chat
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "1rem" }}
        />
      </div>
      {loading ? "Loading..." : (
        <>
          <div className={styles.messages}>
            {messages.map((m) => (
              <MessageItem key={m.id} message={m} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
          <MessageInput value={input} onChange={setInput} onSend={handleSend} />
        </>
      )}
    </div>
  );
};