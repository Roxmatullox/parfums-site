"use client"

import React from 'react'

import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

const NavigateToLogin = () => {

  // const router = useRouter()

  // router.replace("/login" , { scroll: false })

  return (
    <Button color='secondary' variant='contained' href="/login">Get started</Button>
  )
}

export default NavigateToLogin