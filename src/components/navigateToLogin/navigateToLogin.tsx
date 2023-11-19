"use client"

import React from 'react'

import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

const NavigateToLogin = () => {

  // const router = useRouter()

  // router.replace("/login" , { scroll: false })

  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      rowGap:"20px"
    }}>
        <h2 style={{
          maxWidth:"400px",
          textAlign:"center",
          marginLeft:"auto",
          marginRight:"auto",
        }}>Welcome, login or register to use the site !</h2>
      <Button color='secondary' variant='contained' href="/login">Get started</Button>
    </div>
  )
}

export default NavigateToLogin