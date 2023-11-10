import React from 'react'

import "./user-home.scss"
import LatestProducts from '@/components/latestProducts/latestProducts'
import GetCategories from '@/components/allCategories/allCategories'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rzzzy parfums home',
  description: 'Parfums',
}

const page = () => {
  return (
    <main>
      <div className="home-section">
        <div className="container">
          <div className="home-section-title">
            <h1>Home</h1>
          </div>
          <div className="home-section-resourses">
            <div className="all-categories">
              <h2>Latest products</h2>
              <LatestProducts />
            </div>
            <div className="latest-products">
              <h2>Categories</h2>
              <GetCategories />                
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page