"use client"

import useOrdersAdmin from '@/zustand/orders-admin'
import useProducts from '@/zustand/products'
import {useEffect , useState} from 'react'

import "./orders.scss"

const OrdersPage = () => {

  // const {data : products , getData : getProducts} = useProducts()

  // useEffect(()=>{
  //   getProducts()
  // } , [getProducts])

  const {data , getData , total , editData , deleteData} = useOrdersAdmin()

  useEffect(()=>{
    getData()
  } , [getData])

  // const gettingProduct = (el1 : {
  //   _id: string;
  //   product: string;
  //   quantity: number;})=>{
  //   const product = products.find((el2)=>el1._id === el2._id)
  //   return product
  // }

  const [sort , setSort] = useState("")

  return (
    <main className='admin-main'>
      <div className="orders">
        <div>
          <h1>Orders ({total})</h1>
          <select onChange={(e)=>setSort(e.currentTarget.value)} className='sort-select'>
            <option value="">All</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="CANCELED">Canceled</option>
          </select>
          <div className="orders-container">
            {
              data?.map((el)=>{                  
                if (sort.length > 3) {
                  if (el.status === sort) {
                    return <div key={el._id}>
                    <h6>{el.status}</h6>
                    <h3>User id : {el.userId} | Products : {el.cart.length}</h3>
                    <p>{el.createdAt.split("T")[0]}</p>
                    <h5>Products :</h5>
                    {
                      el.cart.map((el)=>{
                        return <p key={el._id}>{el.product} | {el.quantity}x</p>
                      })
                    }
                  </div>
                  }
                } else {
                  if (el.status === "SUCCESS") {
                    return <div key={el._id}>
                    <h6>{el.status}</h6>
                    <h3>User id : {el.userId} | Products : {el.cart.length}</h3>
                    <p>{el.createdAt.split("T")[0]}</p>
                    <h5>Products :</h5>
                    {
                      el.cart.map((el)=>{
                        return <p key={el._id}>{el.product} | {el.quantity}x</p>
                      })
                    }
                    <div className="order-card-btns">
                      <button  onClick={()=>editData(el._id)}>Accept</button>
                      <button  onClick={()=>deleteData(el._id)}>Cancel</button>
                    </div>
                  </div>
                  }
                }             
              })
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default OrdersPage