"use client"


import request from '@/server/request'
import { useEffect, useState } from 'react'
import Slider from "react-slick"

import "bootstrap/dist/css/bootstrap.min.css"
import { Carousel } from 'react-bootstrap'
import Product from '@/types/product'

const LatestProducts = () => {

  const [loading , setLoading] = useState(false)

  

  const [products , setProducts] = useState<null | Product[]>(null)



  const getLatestProducts = async ()=>{
    try {
      setLoading(true)
      const {data} = await request.get("last-products")
      setProducts(data)
    } catch (err) {
      console.log(err); 
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getLatestProducts()
  } , [])


  return (
       <Carousel>
        {
          products ? products.map((el)=>{
            return(<Carousel.Item interval={4000} key={el?._id}>
            <Carousel.Caption>
              <div className="product">
                <img src={el?.image?.url} alt="img" />
                <div className="product-text">
                  <h3>{el?.title}</h3>
                  <p>{el?.description}</p>
                  <div className="times">
                    <span>{el?.createdAt.split("T")[0]}</span> | <span>{el?.updatedAt.split("T")[0]}</span>
                  </div>
                </div>
              </div>
            </Carousel.Caption>
          </Carousel.Item> )
          }) : <></>
        }
      </Carousel>
  )
}

export default LatestProducts