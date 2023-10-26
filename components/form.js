import styles from '../styles/Home.module.css';

export const Input = ({ register, errors, id, type, rules,placeholder }) => {
    return (<div className={styles.box}>
        <input
            id={id}
            type={type}
            {...register(id, rules)}
            className={`${styles.input} ${errors[id] && styles.is_invalid}`}
            placeholder={placeholder}
        />
        {errors[id] && (
            <div className={styles.invalid_feedback}>{errors?.[id]?.message}</div>
        )}
    </div>)
}

export const Select = ({ id, register, children }) => {
    return (
        <div className={styles.box}>
            <select
                name="accounting"
                id={id}
                className={styles.select}
                {...register(id)}
            >
                {children} {/* 將選項放在這裡 */}
            </select>
        </div>
    )
}













