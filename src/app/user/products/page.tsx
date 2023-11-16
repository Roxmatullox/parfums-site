import AllProducts from '@/components/allProducts/allProducts'
import React from 'react'
import { ToastContainer } from 'react-toastify'

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