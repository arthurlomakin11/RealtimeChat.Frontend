import React from 'react';
import styles from './DetailsPanel.module.css';

export const DetailsPanel: React.FC = () => {
    return (
        <div className={styles.detailsPanel}>
            <div className={styles.infoSection}>
                <h3>Main info</h3>
                <ul>
                    <li><strong>Creator:</strong> Andrew M.</li>
                    <li><strong>Date of creation:</strong> 28 May</li>
                    <li><strong>Status:</strong> Active</li>
                    <li><strong>Tags:</strong> 13</li>
                    <li><strong>Tasks:</strong> 4</li>
                </ul>
            </div>
            <div className={styles.threadActivity}>
                <h3>Thread activity</h3>
                <div className={styles.activityChart}>
                    <div className={styles.chartPlaceholder}>Activity Graph Here</div>
                </div>
            </div>
            <div className={styles.membersSection}>
                <h3>Members</h3>
                <ul>
                    <li>Daniel Anderson (Design)</li>
                    <li>Andrew Miller (Management)</li>
                    <li>William Johnson (UX/UI designer)</li>
                    <li>Emily Davis (Front-end dev)</li>
                </ul>
            </div>
        </div>
    );
};