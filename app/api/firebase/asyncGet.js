import { getDocs, query, where } from 'firebase/firestore';
import { accountingDocRef } from './firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const asyncGetData = async () => {

    const auth = getAuth();
    const user = await new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });


    if (user) {
        // 使用者已登入
        const uid = user.uid; // 取得當前使用者的 uid
        const dataAuth = query(accountingDocRef, where("author", "==", uid)) //query(集合的參考,查詢條件)，查詢 auth 等於 uid 的文件

        const querySnapshot = await getDocs(dataAuth);
        const data = [];
        querySnapshot.forEach((doc) => {
            const documentData = doc.data();
            const documentWithId = { ...documentData, id: doc.id }
            data.push(documentWithId);
        });

        return data;
    } else {
        // 使用者未登入，你可以回傳一個空陣列或是做其他處理
        return [];
    }


};

export default asyncGetData;
