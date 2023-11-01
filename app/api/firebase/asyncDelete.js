import { doc,deleteDoc } from 'firebase/firestore';
import { accountingDocRef } from './firebase.js';


const asyncDeleteData = async (id)=> {
    await deleteDoc (doc(accountingDocRef, id))
};

export default asyncDeleteData;