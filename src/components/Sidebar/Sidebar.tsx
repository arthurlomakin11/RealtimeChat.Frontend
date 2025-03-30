import styles from './Sidebar.module.css';

interface MenuItem {
    label: string;
}

const menuItems: MenuItem[] = [
    { label: 'Chat' }
];

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>Realtime Chat</div>
            <ul className={styles.menu}>
                {menuItems.map((item, index) => (
                    <li key={index}>{item.label}</li>
                ))}
            </ul>
        </div>
    );
};

export { Sidebar };