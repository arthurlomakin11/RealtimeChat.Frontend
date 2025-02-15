import styles from './Button.module.css';

const Button = ({ text } : {text:string}) => {
    return (
        <button className={styles.button}>
            <span className={styles.text}>{text}</span>
        </button>
    );
};

export default Button;