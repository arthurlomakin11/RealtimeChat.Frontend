import React, { useState } from 'react';
import styles from './ChatPanel.module.css';

interface Message {
    id: number;
    author: string;
    content: string;
    timestamp: string;
}

const randomMessages = [
    "Hey, how's the project going?",
    "Don't forget to review the new designs!",
    "Can we schedule a meeting for tomorrow?",
    "The backend team pushed a new update.",
    "What do you think about this new UI approach?",
    "I'll check the latest PRs and let you know.",
];

const ChatPanel: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, author: 'Sophia', content: "Hi! How's it going?", timestamp: '10:00 AM' },
        { id: 2, author: 'You', content: "All good, working on the UI now.", timestamp: '10:02 AM' },
    ]);
    const [input, setInput] = useState<string>('');

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const newMessage: Message = {
            id: messages.length + 1,
            author: 'You',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage]);
        setInput('');

        // Add a random response
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * randomMessages.length);
            const randomMessage: Message = {
                id: messages.length + 2,
                author: 'Sophia',
                content: randomMessages[randomIndex],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prevMessages) => [...prevMessages, randomMessage]);
        }, 1000);
    };

    return (
        <div className={styles.chatPanel}>
            <div className={styles.chatHeader}>Chat</div>
            <div className={styles.messages}>
                {messages.map((message) => (
                    <div key={message.id} className={`${styles.message} ${message.author === 'You' ? styles.outgoing : styles.incoming}`}>
                        <div className={styles.messageAuthor}>{message.author}</div>
                        <div className={styles.messageContent}>{message.content}</div>
                        <div className={styles.messageTimestamp}>{message.timestamp}</div>
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
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export { ChatPanel };