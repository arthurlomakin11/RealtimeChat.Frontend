import React from 'react';
import styles from './SearchPanel.module.css';

const SearchPanel: React.FC = () => {
    return (
        <div className={styles.searchPanel}>
            <input 
                type="text" 
                placeholder="Search in Conceptzilla..." 
                className={styles.input} 
            />
        </div>
    );
};

export { SearchPanel };