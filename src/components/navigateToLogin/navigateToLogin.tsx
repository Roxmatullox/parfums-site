"use client"

import React from 'react'

import { Button } from "@mui/material";
import { useRouter } from 'next/router';

const NavigateToLogin = () => {

  const router = useRouter()

  const navigate = true

  if (navigate) {
    router.push("/login")
  }

  return (
    <Button color='secondary' variant='contained' href="/login">Get started</Button>
  )
}

export default NavigateToLogin