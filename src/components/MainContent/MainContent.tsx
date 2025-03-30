import React from 'react';
import styles from './MainContent.module.css';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { ChatPanel } from '../ChatPanel/ChatPanel';

const MainContent: React.FC = () => {
    return (
        <div className={styles.main}>
            <SearchPanel />
            <ChatPanel chatRoomId={1} />
        </div>
    );
};

export { MainContent };