"use client"

import React from 'react'
import { Button } from 'react-bootstrap'

const NavigateToLogin = () => {

  const navigate = true

  if (navigate) {
    window.location.replace("/user")
  }

  return (
    <div>
      <Button color='secondary' variant='contained' href="/user">Get started</Button>
    </div>
  )
}

export default NavigateToLogin