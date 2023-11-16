"use client"


import request from '@/server/request'
import { useEffect, useState } from 'react'
import Slider from "react-slick"

import "bootstrap/dist/css/bootstrap.min.css"
import { Carousel } from 'react-bootstrap'
import useAuth from '@/zustand/auth'

import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const GetCategories = () => {

  const [loading , setLoading] = useState(false)


  interface Category {
    _id: string;
    name: string;
    image: {
        public_id: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}

  const [category , setCategory] = useState<null | Category[]>(null)



  const getLatestCategory = async ()=>{
    try {
      setLoading(true)
      const {data} = await request.get("category")
      setCategory(data)
    } catch (err : object | any) {
      toast.error(err.response.data || "Error")
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getLatestCategory()
  } , [])


  return (
       <Carousel>
        {
          category ? category.map((el)=>{
            return(<Carousel.Item interval={4000} key={el?._id}>
            <Carousel.Caption>
              <div className="product">
                <img src={el?.image?.url} alt="img" />
                <div className="product-text">
                  <h3>{el?.name}</h3>
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

export default GetCategories