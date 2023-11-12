"use client"

import order from "@/types/order"
// import storeProduct from "@/types/storeCartProduct"
import useOrders from "@/zustand/orders"
import { useEffect } from "react"

import "./orders.scss"

const Orders = () => {

  const {getOrders , orders , total} = useOrders()

  useEffect(()=>{
    getOrders()
  } , [getOrders])
  

  return (
    <div className="orders">
      <div className="container">
        <h1>Orders({total})</h1>
        <div className="latest-orders">
          {
            orders ? orders.map((order : order)=>{
              return <div className={`order-card ${order.status}`}key={order?._id}>
                <div style={{
                  display:'flex',
                  flexDirection:"column",
                  gap:"10px",
                  marginBottom:"20px"
                }} className="product-card-left">
                  {
                    order.cart.map((el)=>{

                                            
                      return <div key={el._id} style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"40px",
                      }} className='product-card'>
                        <div className="product-img">
                          <img style={{
                            width:"100px",
                            height:"100px",
                            objectFit:"cover",
                            borderRadius:"10px"
                          }} src={el.product.image.url} alt="product" />
                        </div>
                        <div className="product-text">
                          <h3>{el.product.title}</h3>
                          <p>{el.product.description}</p>
                          <p>{el.quantity}x</p>
                        </div>
                        <div>
                          {
                            <p>{el.quantity * el.product.price} sum</p>
                          }
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            }) : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default Orders