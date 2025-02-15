import React from 'react';
import styles from './MainContent.module.css';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { ChatPanel } from '../ChatPanel/ChatPanel';

const MainContent: React.FC = () => {
    return (
        <div className={styles.main}>
            <SearchPanel />
            <div className={styles.content}>
                <h1>Project Overview</h1>
                <p>Details about the project go here.</p>
                <ChatPanel />
            </div>
        </div>
    );
};

export { MainContent };