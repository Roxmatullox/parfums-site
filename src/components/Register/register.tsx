"use client"

import React from 'react'

import useAuth from '@/zustand/auth'

import "./register.scss"

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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register