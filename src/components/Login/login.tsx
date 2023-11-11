"use client"

import useAuth from '@/zustand/auth'
import React from 'react'

import "./login.scss"
import { useRouter } from 'next/router'

const Login = () => {
  
  const {login , isLogin , role} = useAuth()

  const router = useRouter()

  if (isLogin) {
    if (role === 1) {
      router.push("/admin")
    } else{
      router.push("/user")
    }
  }

  return (
    <div className="login">
      <div className='container'>
        <div className="login-page">
          <form onSubmit={(e)=>login(e)}>
            <label htmlFor="username"> <span>*</span> Username</label>
            <input type="text" id='username' />
            <label htmlFor="password"> <span>*</span> Password</label>
            <input type="password" id='password' />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login