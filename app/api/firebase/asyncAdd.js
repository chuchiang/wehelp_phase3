
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { accountingDocRef } from './firebase';


const asyncAddData = async (data,uid) => {
    const docRef = await addDoc(accountingDocRef, {
        author:uid,
        accounting: data.accounting,
        price: data.price,
        contant: data.contant,
        created: serverTimestamp(), // serverTimestamp，建立去抓伺服器的時間
    });
    return docRef;
};

export default asyncAddData;