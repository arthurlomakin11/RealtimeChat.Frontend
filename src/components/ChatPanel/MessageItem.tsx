import { Message } from "@/domain/Message";
import styles from "./MessageItem.module.css";
import { formatDate } from "@/utils/formatDate";

export const MessageItem = ({ message, onEdit, onDelete }: {
  message: Message,
  onEdit: (id: number) => void,
  onDelete: (id: number) => void
}) => (
  <div key={message.id} className={styles.message}>
    <div>
      <div className={styles.messageHeader}>
        <strong>{message.senderId}</strong>
        <span className={styles.messageDate}>{formatDate(message.sentAt)}</span>
      </div>
      <div className={styles.messageContent}>
        {message.content.text || message.content.url}
      </div>
    </div>
    <div>
      <button onClick={() => onEdit(message.id)}>✏️</button>
      <button onClick={() => onDelete(message.id)}>🗑️</button>
    </div>
  </div>
);