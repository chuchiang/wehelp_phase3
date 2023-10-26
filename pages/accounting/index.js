import { useState } from 'react';
import { useRouter } from 'next/router';//換頁
import { useForm , Controller} from 'react-hook-form';
import styles from '../../styles/Home.module.css';//css檔案
import { Input, Select } from '../../components/form.js';
import  { List }  from '../../components/list.js';//{解構所以要加}



const AccountPage = () => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accounting: '',
      price: '',
      contant: ''
    },
    // 錯誤驗證時機
    mode: 'onTouched',
  });

  const [formData, setFormData] = useState([]); // 創建 state 以存儲表單數據

  const onSubmit = (data) => {
    console.log(data);
    // 將支出的價格轉為負數
    if (data.accounting === "支出") {
      data.price = -Math.abs(parseFloat(data.price)); // 轉為負數。Math.abs 函數取得絕對值，parseFloat字串轉浮點數
    } else {
      data.price = Math.abs(parseFloat(data.price)); // 收入保持正數
    }
    console.log(formData);
    setFormData([...formData, data]); // 將新的資料加入列表中
  };

  const handleDelete = (index) => {
    setFormData(prevFormData => prevFormData.filter((item, i) => i !== index));
  }

  const total = formData.reduce((acc, item) => acc + parseFloat(item.price), 0);//acc 累加的累積值，item 是 formData 中的每個物件

  const router = useRouter();
  function handleClick() {
    router.push('/');
  }

  const accountingList = ["收入", "支出"];

  return (<div className={styles.wrap}>
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} ${styles.mb_20}`}>
    
      <Select name="accounting" id="accounting" register={register} >
        <option value="" disabled>-- 請選擇收入/支出 --</option>
        {
          accountingList.map((accounting) => {
            return <option value={accounting} key={accounting}>{accounting}</option>
          })
        }
      </Select>

      <Input register={register} errors={errors} id="price" type="number" placeholder="請輸入金額" rules={{ required: { value: true, message: '金額為必填，只能填數字' } }}></Input>
      <Input register={register} errors={errors} id="contant" type="text" placeholder="請輸入項目" rules={{ required: { value: true, message: '項目為必填' } }}></Input>
      <button type="submit" className={`${styles.btn} ${styles.ml_10}`}>新增紀錄</button>
    </form>
    <hr className={styles.hr} />
    
    {formData && (
      <List formData={formData} handleDelete={handleDelete}
      />

    )}
    <div className={styles.total}>小計：{total}</div>
    <button onClick={handleClick} className={styles.btn}>返回首頁</button>

  </div>
  );
}

export default AccountPage;



