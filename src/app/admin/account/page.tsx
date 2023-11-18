import AccountPageComp from '@/components/accountPage/accountPage'
import React from 'react'

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Account',
  description: 'Parfums',
}

const AccountPage = () => {
  return (
    <main className='admin-main'>
      <AccountPageComp />
    </main>
  )
}

export default AccountPage