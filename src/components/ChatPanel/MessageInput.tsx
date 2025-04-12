import styles from "./MessageInput.module.css";

export const MessageInput = ({ value, onChange, onSend }: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) => (
  <div className={styles.inputPanel}>
    <input
      type="text"
      className={styles.input}
      placeholder="Type your message..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
    />
    <button className={styles.sendButton} onClick={onSend}>
      Send
    </button>
  </div>
);