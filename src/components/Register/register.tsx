"use client"

import React from 'react'

import useAuth from '@/zustand/auth'
import { Button } from '@mui/material'

import "./register.scss"
import { ToastContainer } from 'react-toastify'

const Register = () => {

  const {register} = useAuth()

  return (
    <div className="register">
      <div className='container'>
        <div className="register-page">
          <form onSubmit={(e)=>register(e)}>
            <label htmlFor="firstName"> <span>*</span> Firstname</label>
            <input type="text" id='firstName' />
            <label htmlFor="lastName"> <span>*</span> Lastname</label>
            <input type="text" id='lastName' />
            <label htmlFor="username"> <span>*</span> Username</label>
            <input type="text" id='username' />
            <label htmlFor="phoneNumber"> <span>*</span> Phone number</label>
            <input type="text" id='phoneNumber' />
            <label htmlFor="password"> <span>*</span> Password</label>
            <input type="password" id='password' />
            <label htmlFor="confirmPassword"> <span>*</span> Confirm Password</label>
            <input type="password" id='confirmPassword' />
            <button type='submit'>Register</button>
            <p>If you have an account <Button color='secondary' variant='contained' href="/login">Login</Button></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register