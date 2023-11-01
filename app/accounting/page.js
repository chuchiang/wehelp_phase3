'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select } from './../components/form.js';
import { List } from './../components/list.js';
import { accountingDocRef } from './../api/firebase/firebase.js';
import asyncGetData from '../api/firebase/asyncGet.js';
import asyncAddData from '../api/firebase/asyncAdd';
import asyncDeleteData from '../api/firebase/asyncDelete';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Signout } from '../signout.js'


const AccountPage = () => {
  const router = useRouter();

  const auth = getAuth();
  console.log("page" + auth);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);
    } else {
      // User is signed out
      // ...

      router.push('/');
    }
  });


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
      author: '',
      accounting: '',
      price: '',
      contant: ''
    },
    // 錯誤驗證時機
    mode: 'onTouched',
  });



  const [formData, setFormData] = useState([]); // 創建 state 以存儲表單數據



  const onSubmit = async (data) => {
    // 將支出的價格轉為負數
    if (data.accounting === "支出") {
      data.price = -Math.abs(parseFloat(data.price)); // 轉為負數。Math.abs 函數取得絕對值，parseFloat字串轉浮點數
    } else {
      data.price = Math.abs(parseFloat(data.price)); // 收入保持正數
    }
    console.log(data);

    const user = getAuth().currentUser; // 取得當前使用者
    const uid = user.uid; // 取得當前使用者的 uid

    try {
      const docRef = await asyncAddData(data, uid);
      data.id = docRef.id;
      setFormData([...formData, data]); // 將生成的 Firebase 文檔 ID 保存到表單數據中
    } catch (e) {
      console.error("添加文檔時出錯：", e);
    }

  };



  const handleDelete = async (index, id) => {
    try {
      await asyncDeleteData(id)// 從 Firebase 中刪除文件
      setFormData(formData.filter((obj) => obj.id !== id));// 從本地 state 中刪除該項目
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }


  const total = formData.reduce((acc, item) => acc + parseFloat(item.price), 0);//acc 累加的累積值，item 是 formData 中的每個物件


  function handleClick() {
    router.push('/');
  }

  const accountingList = ["收入", "支出"];


  // useEffect 用來在元件載入後取得 Firebase 中的資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await asyncGetData();
        setFormData(getData);
      } catch (error) {
        console.error('error fetching data', error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <Signout />
      <div className="flex items-center flex-col m-auto ">
        <form onSubmit={handleSubmit(onSubmit)} className=" flex justify-between flex-nowrap w-800 mb-5">

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
          <button type="submit" className='bg-slate-300 cursor-pointer rounded px-2 h-8'>新增紀錄</button>
        </form>
        <hr className='w-800' />

        <div className='w-800 flex flex-col flex-nowrap justify-between'>

          {formData && (
            <List formData={formData} handleDelete={handleDelete} />
          )}
          <div className='w-800 flex flex-col items-center'>
            <div className='w-100 fw-700 p-2 '>小計：{total}</div>
          <button onClick={handleClick} className='w-20 fw-700 '>返回首頁</button>
          </div>
          
        </div>



      </div >
    </>
  );
}

export default AccountPage;






