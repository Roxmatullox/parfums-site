"use client"

import useAuth from '@/zustand/auth'
import React from 'react'

import "./login.scss"
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const Login = () => {
  
  const {login , isLogin , role} = useAuth()

 
  const router = useRouter()
  
  // router.push('/dashboard', { scroll: false })

  // const router = useRouter()

  // console.log(router);
  

  if (isLogin) {
    if (role === 1) {
      router.replace("/admin" , { scroll: false })
    } else{
      router.replace("/user" , { scroll: false })
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
            <p>If you dont have an account <Button color='secondary' variant='contained' href="/register">Register</Button></p>
          </form>          
        </div>
      </div>
    </div>
  )
}

export default Login