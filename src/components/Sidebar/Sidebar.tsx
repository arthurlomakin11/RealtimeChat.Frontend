import styles from './Sidebar.module.css';

interface MenuItem {
    label: string;
}

const menuItems: MenuItem[] = [
    { label: 'General' },
    { label: 'Front-end' },
    { label: 'Website' },
    { label: 'Strategy' },
];

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>Conceptzilla</div>
            <div className={styles.section}>Favorites</div>
            <ul className={styles.menu}>
                {menuItems.map((item, index) => (
                    <li key={index}>{item.label}</li>
                ))}
            </ul>
        </div>
    );
};

export { Sidebar };