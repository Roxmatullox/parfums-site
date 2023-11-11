"use client"

import React from 'react'

import { Button } from "@mui/material";

const NavigateToLogin = () => {

  // const navigate = true

  // if (navigate) {
  //   window.location.replace("/login")
  // }

  return (
    <Button color='secondary' variant='contained' href="/login">Get started</Button>
  )
}

export default NavigateToLogin