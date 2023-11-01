'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';//換頁
import { Login } from './login.js'
import { SignUpForm } from './register.js'
import { Signout } from './signout.js'

function Header({ title }) {
  return <div className="text-2xl text-white flex items-center justify-center w-full h-20 bg-slate-600 "><h1>{title}</h1></div>;
}


export default function HomePage() {

  const router = useRouter();
  function handleClick() {
    router.push('/accounting');
  }

  const [showRegister, setShowRegister] = useState(false); // 新增一個狀態用來控制是否顯示 Register
  const [showLogin, setShowLogin] = useState(true); // 新增一個狀態用來控制是否顯示 Login

  function handleToggleRegister() {
    setShowRegister(true); // 切換顯示 Register 的狀態
    setShowLogin(false); // 隱藏 Login
  }

  function handleToggleLogin() {
    setShowLogin(true); // 切換顯示 Login 的狀態
    setShowRegister(false); // 隱藏 Register
  }

  return (
    <div className='mx-auto'>
      <Header title="React 專案練習"  />
      <div className="bg-slate-100 p-5 rounded-xl text-center mt-10 w-96 mx-auto">
        {showLogin && <Login toggleRegister={handleToggleRegister} />}
        {showRegister && <SignUpForm toggleLogin={handleToggleLogin} />}
      </div>
    </div>
  );
}

