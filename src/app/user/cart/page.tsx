
import React from 'react'
import CartProducts from '@/components/cartProducts/cartProducts'

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Parfums',
}


const CartPage = () => {

  return (
    <main>
      <CartProducts />
    </main>
  )
}

export default CartPage