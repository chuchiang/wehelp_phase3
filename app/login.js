import { useState } from "react"
import { useRouter } from 'next/navigation';//換頁
import { firebaseLogin } from './api/firebase/loginData';
import { signInWithGooglePopup } from './api/firebase/firebase.js';

export function Login(props) {
    const [error, setError] = useState(null);// 創建 error 以存儲錯誤訊息

    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    });

    //登入
    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            router.push('/accounting');
            console.log(response);
        }
        catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setError("google登入失敗");
        }
    }


    function handleToggleRegister() {
        props.toggleRegister(); // 調用父元件傳來的函數，切換顯示 Register
    }

    //在input輸入任何內容，要綁定
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setData({ ...data, [name]: value });
        console.log(data)
    }
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            const user = await firebaseLogin(data);
            console.log(user.user)
            router.push('/accounting');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            setError("信箱或密碼輸入錯誤");
        }
    }

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={submit}>
                <h3 className="mb-3">登入帳號</h3>
                <div className="mb-3">
                    <label>信箱：</label>
                    <input type="email" name="email" onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <label>帳號：</label>
                    <input type="password" name="password" onChange={handleChange}></input>
                </div>
                <button type="submit" className="mb-3  bg-slate-300 cursor-pointer rounded px-2" >登入帳號</button>
            </form>
            <button onClick={logGoogleUser} className="mb-3 flex p-1 text-base "><img src='/google.png' className="w-5 mr-2"/>使用 Google登入</button>
            <div className="mb-3" >還沒有帳戶? <button onClick={handleToggleRegister}>註冊帳號</button></div>
            {error && <div className="mb-3 text-orange-700">{error}</div>}
        </div>

    )

}