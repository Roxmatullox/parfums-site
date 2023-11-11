import React from 'react'

import "./user-home.scss"
import LatestProducts from '@/components/latestProducts/latestProducts'
import GetCategories from '@/components/allCategories/allCategories'
import { Metadata } from 'next'
import Image from 'next/image'

import newProductImg from "../../assets/istockphoto-1197832105-612x612.jpg"
import categoryImg from "../../assets/category.avif"

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
            <div className="latest-products-text">
              <Image width={500} height={500} src={newProductImg} alt='Category-img' style={{
                width:"100%",
                height:"100%",
                objectFit:"cover"
              }}  />
            </div>
            <div className="all-categories-text">
              <Image width={930} height={540} src={categoryImg} alt='Category-img' style={{
                width:"100%",
                height:"100%",
                objectFit:"cover"
              }}  />
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