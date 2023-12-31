import { useState } from "react"
import { firebaseRegister } from './api/firebase/registerData';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from './api/firebase/firebase';
import { useRouter } from 'next/navigation';//換頁



export function SignUpForm(props) {

    const [message, setmessage] = useState(null);// 創建 error 以存儲錯誤訊息

    const router = useRouter();

    function handleToggleLogin() {
        props.toggleLogin(); // 調用父元件傳來的函數，切換顯示 Login
    }

    const [formFields, setFormFields] = useState({
        displayName: '',
        email: '',
        password: ''
    });

    //在input輸入任何內容，要綁定
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setFormFields({ ...formFields, [name]: value });
        console.log(formFields)
    }

    const handleSubmit = async (event) => {
        // e.preventDefault();
        // console.log(data);
        // await firebaseRegister(data);
        event.preventDefault();

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                formFields.email,
                formFields.password
            );
            const name = formFields.displayName
            await createUserDocumentFromAuth(user, { name });
            setFormFields(formFields);
            setmessage("註冊成功，請重新登入")
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setmessage("信箱已註冊過")
            }else if(error.code === 'auth/weak-password'){
                setmessage("密碼應至少為 6 個字符")
            }
            console.log('user creation encountered an error' + error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3 className="mb-3">註冊帳號</h3>
                <div className="mb-3">
                    <label>姓名：</label>
                    <input className="px-2 py-1 bg-white rounded" type="text" required name="displayName" onChange={handleChange} value={formFields.displayName}></input>
                </div>
                <div className="mb-3">
                    <label>信箱：</label>
                    <input className="px-2 py-1 bg-white rounded" type="email" required name="email" onChange={handleChange} value={formFields.email}></input>
                </div>
                <div className="mb-3">
                    <label>帳號：</label>
                    <input className="px-2 py-1 bg-white rounded" type="password" required name="password" onChange={handleChange} value={formFields.password}></input>
                </div>
                <button type="submit" className="mb-3 bg-slate-300 cursor-pointer rounded px-2">註冊帳號</button>
            </form>
            <div className="mb-3">已經有帳戶? <button onClick={handleToggleLogin}>登入帳號</button></div>
            {message && <div className="mb-3 text-orange-700">{message}</div>}
        </div>

    )

};