"use client"

import useUserDatas from '@/zustand/account'
import React, { useEffect } from 'react'

import "./accountPage.scss"

const AccountPageComp = () => {

  const { getValues ,getUserDatas , values , updateUserDatas} = useUserDatas()

  useEffect(()=>{
    getUserDatas()
  } , [getUserDatas])

  return (
    <div className='account'>
      <div className="container">
        <div className="account-page">
          <form onSubmit={(e)=>updateUserDatas(e)} >
            <h1>Account page</h1>
            <input onChange={getValues} required value={values?.firstName} name="firstName" placeholder="Firstname" type="text" />
            <input onChange={getValues} required value={values.lastName} name="lastName" placeholder="Lastname" type="text" />
            <input onChange={getValues} required value={values.username}  name="username" placeholder="Username" type="text" />
            <input onChange={getValues} value={values.phoneNumber} name="phoneNumber" placeholder="Phone number" type="text" />
            <button type='submit'>Save</button>
          </form> 
        </div>
      </div>
    </div>
  )
}

export default AccountPageComp