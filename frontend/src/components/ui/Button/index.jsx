import styles from './styles.module.scss';

export function Button({ children, ...rest}){
    return (
        <button className={styles.button} {...rest}>
            <a className={styles.buttonText}>{children}</a>
        </button>
    )
}