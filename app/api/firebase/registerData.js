import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./firebase.js";///一訂要加喔


export const firebaseRegister = (data) => {

    console.log(data);
    const auth = getAuth();

    let {password,email} = data;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // 註冊成功
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            // 註冊失敗
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}
