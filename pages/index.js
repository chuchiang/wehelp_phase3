import { useRouter } from 'next/router';//換頁
import styles from '../styles/Home.module.css';//css檔案

function Header({ title }) {
  return <div className={styles.header}><h1>{title}</h1></div>;
}

function Content({ title }) {
  return <div className={styles.content}><h2>{title}</h2></div>;
}


export default function HomePage() {

  const router = useRouter();
  function handleClick() {
    router.push('/accounting');
  }

  return (
    <div  className={styles.wrap}>
      <Header title="React 專案練習" />
      <Content title="歡迎光臨我的頁面" />
      <button onClick={handleClick} className={`${styles.btn} ${styles.mt_10}`}>點此開始</button>
    </div>
  );
}





