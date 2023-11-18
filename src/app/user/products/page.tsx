import AllProducts from '@/components/allProducts/allProducts'
import React from 'react'
import { ToastContainer } from 'react-toastify'

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Products',
  description: 'Parfums',
}

const ProductsPage = () => {
  return (
    <main>
      <div className="all-products">
        <AllProducts />
      </div>
        <ToastContainer/>
    </main>
  )
}

export default ProductsPage