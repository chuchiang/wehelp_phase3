// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection } from 'firebase/firestore';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

import {
  getFirestore, // 用來創造一個 firestore 實例
  doc, // 用來創造一個 document 實例
  getDoc, // 取得 document data
  setDoc // 設定 document data
} from 'firebase/firestore';



export const ACCOINTING_COLLECTION_NAME = 'accounting';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEdgVQcwYbG86urP-eI8Kq_cDItR95mWs",
  authDomain: "accounting-b31d3.firebaseapp.com",
  projectId: "accounting-b31d3",
  storageBucket: "accounting-b31d3.appspot.com",
  messagingSenderId: "920100288360",
  appId: "1:920100288360:web:501b01d5d7ea3614ee08dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);


//Google 帳號提供
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const accountingDocRef = collection(
  db,
  ACCOINTING_COLLECTION_NAME
);



//建立一個 function 用來將登入的使用者資料存入 Firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  if (!userAuth) return;
  // 建立一個 document 實例
  const userDocRef = doc(db, 'users', userAuth.uid);
  // 將 document 實例的資料取出來
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // 如果使用者不存在
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // 就把資料寫進 Firestore
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('建立使用者失敗' + error.message);
    }
  }

  // 如果使用者存在直接回傳 userDocRef
  return userDocRef;
};



export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

