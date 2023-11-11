"use client"

import React from 'react'

import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';

const NavigateToLogin = () => {

  const router = useRouter()

  const navigate = true

  if (navigate) {
    router.replace("/login")
  }

  return (
    <Button color='secondary' variant='contained' href="/login">Get started</Button>
  )
}

export default NavigateToLogin