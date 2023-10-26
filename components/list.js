import styles from '../styles/Home.module.css';


export const List = ({ formData,handleDelete }) => {
    return (
        <div className={styles.listbox}>
            {formData && (
                formData.map((item, index) => (
                    <div key={index} className={styles.list} id={index} >
                        <div className={`${item.accounting === "支出" ? styles.list_expenses : styles.list_income}`}>{item.price}</div>
                        <div className={`${styles.list_content}`}>{item.contant}</div>
                        <button type="submit" id={index} className={`${styles.btn} ${styles.list_btn}`} onClick={() => handleDelete(index)}>刪除</button>
                    </div>
                ))
            )}
        </div>
    )
  }

