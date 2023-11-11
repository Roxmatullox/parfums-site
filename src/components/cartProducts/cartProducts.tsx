"use client"

import React , {useState} from 'react'
import Cookies from 'js-cookie'
import Product from '@/types/product'

import "./cartProduct.scss"

const CartProducts = () => {

  const [refresh , setRefresh] = useState(false)

  const JsonCart = Cookies.get("cart")
  
  const StorageProducts =  JsonCart ? JSON.parse(JsonCart) : null


  interface storeProduct {
    el: Product
    quantity : number
  }

  const plusQuantity = (id : string)=>{
    StorageProducts.map((el : storeProduct)=>{
      if (el.el._id === id) {        
        el.quantity = el.quantity + 1
      }
    })
    Cookies.set("cart" , JSON.stringify(StorageProducts))
    setRefresh(!refresh)
  }

  const minusQuantity = (id : string)=>{
    const Cartproducts : storeProduct[] = []
    StorageProducts.map((el : storeProduct)=>{
      if (el.el._id === id) {
        if (el.quantity > 1) {
          el.quantity = el.quantity-1
          Cartproducts.push(el)
        }
      } else{
        Cartproducts.push(el)
      }
    })
    Cookies.set("cart" , JSON.stringify(Cartproducts))
    setRefresh(!refresh)
  }

  return (
    <>
      <div className="cart">
        <div className="container">
            <h1>Cart products {`(${StorageProducts?.length || "0"})`}</h1>
          <div className="cart-products">
            {
              StorageProducts ? StorageProducts.map((el : storeProduct)=>{
                return <div className='product-card' key={el.el._id}>
                  <div style={{
                    display:'flex',
                    alignItems:"center",
                    gap:"10px"
                  }} className="product-card-left">
                    <div className="product-img">
                      <img style={{
                        width:"100px",
                        height:"100px",
                        objectFit:"cover",
                        borderRadius:"10px"
                      }} src={el.el.image.url} alt="product" />
                    </div>
                    <div className="product-text">
                      <h3>{el.el.title}</h3>
                      <p>{el.el.description}</p>
                    </div>
                  </div>
                  <div className="product-card-right">
                    <button onClick={()=>minusQuantity(el.el._id)}>-</button>
                    <span>{el.quantity}</span>
                    <button onClick={()=>plusQuantity(el.el._id)}>+</button>
                  </div>
                </div>
              }) : <></>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default CartProducts