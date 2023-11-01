

import { firebaseSignOut } from './api/firebase/signoutData';
import { useRouter } from 'next/navigation';



export function Signout(){

    const submit = async (e) => {
        e.preventDefault();
        try {
           await firebaseSignOut();
           const router = useRouter();
           router.push('/');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    }

    return (
        <div className='w-1200 m-auto flex justify-end mt-2 '>
            <button type="submit" onClick={submit} className='bg-emerald-100 cursor-pointer rounded px-2 mb-3'>登出</button>
            </div>
    )

}