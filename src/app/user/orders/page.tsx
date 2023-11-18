import Orders from '@/components/orders/orders'
import React, { useEffect } from 'react'

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Payments',
  description: 'Parfums',
}

const OrdersPage = () => {

  return (
    <main>
      <Orders />
    </main>
  )
}

export default OrdersPage