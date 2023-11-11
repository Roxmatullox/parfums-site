"use client"

import request from "@/server/request";
import Product from "@/types/product";
import { useEffect, useState } from "react";

import Cookies from "js-cookie"

import "./allProducts.scss"
import Image from "next/image";
import useCart from "@/zustand/cart";
import storeProduct from "@/types/storeCartProduct";

const AllProducts = () => {

  const {refresh , setRefresh} = useCart()

  const [products , setProducts] = useState<null | Product[]>(null)
  const [total , setTotal] = useState(0)

  const [totalPaginate , setTotalPaginate] = useState(0)

  const [search , setSearch] = useState("")
  const [sort , setSort] = useState("")
  const [active , setActive] = useState(1)
  

  useEffect(()=>{
    const getProducts = async ()=>{
      const params = {
        sort:sort,
        search:search,
        page:active,
        limit:10
      }
      try {
        const {data} = await request.get("product" , {params})
        setProducts(data.products)
        setTotal(data.total)
        setTotalPaginate(Math.ceil(data.total / 10))
      } catch (err) {
        console.log(err);
      }
    }
    getProducts()
  } , [active , search , sort , refresh])

  const handleSearch = (str : string)=>{
    setSearch(str)
  }

  const priceSorting = (sort : string)=>{
    setSort(sort)
  }


  // Cart

  const JsonCart = Cookies.get("cart")

  const StorageProducts =  JsonCart ? JSON.parse(JsonCart) : null


  const handleQuantity = async (el : Product)=>{
    const Cartproducts = StorageProducts || []
    Cartproducts.push({el , quantity:1})
    Cookies.set("cart" , JSON.stringify(Cartproducts))
    setRefresh(!refresh)
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
        console.log(el);
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

  const cartBtn = (el : Product)=>{
    let pr : storeProduct = StorageProducts.find((el2 : storeProduct)=>el2.el._id === el._id)
    if (pr) {
      return <div key={el._id}>
        <button onClick={()=>minusQuantity(pr.el._id)}>-</button>
        <span>{pr.quantity}</span>
        <button onClick={()=>plusQuantity(pr.el._id)}>+</button>
      </div>
    } else {
      return <button key={el._id} onClick={()=>handleQuantity(el)}>Add to cart</button>   
    }
  }




  // Favourite


  const JsonFavourite = Cookies.get("favourite")

  const StorageFavourites =  JsonFavourite ? JSON.parse(JsonFavourite) : null


  const handleFavourite = (el : Product) => {
    const Favourites = StorageFavourites || []
    Favourites.push(el)
    Cookies.set("favourite" , JSON.stringify(Favourites))
    // setRefresh(!refresh)
  }

  const handleNoFavourite= (el2 : Product)=>{
    const Favourites = StorageFavourites.filter((el : Product)=>el._id !== el2._id)
    Cookies.set("favourite" , JSON.stringify(Favourites))
    // setRefresh(!refresh)
  }

  const favouriteBtn = (el2 : Product)=>{
    const pr = StorageFavourites.find((el : Product)=>el._id === el2._id)    
    if (pr) {
      return <><Image onClick={()=>handleNoFavourite(el2)} width={30} height={30} src="https://static-00.iconduck.com/assets.00/heart-icon-512x436-gvopjolj.png" style={{
        width:"30px",
        height:"30px",
        marginRight:"15px"
      }} alt="" /></>
    }else{
      return <><Image onClick={()=>handleFavourite(el2)} width={30} height={30} src="https://static-00.iconduck.com/assets.00/favorite-border-icon-256x234-y800ga9r.png" style={{
        width:"30px",
        height:"30px",
        marginRight:"15px"
      }} alt="" /></>
    }
  }


  return (
    <div>
      <div className="container">
        <h1>Products ({total})</h1>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={(e)=>handleSearch(e.target.value)} type="text" placeholder="Search..." />
            <select onChange={(e)=>priceSorting(e.target.value)} name="price-sort">
              <option value="">Default</option>
              <option value="price">Increace</option>
              <option value="-price">Decreace</option>
            </select>
            <select onChange={(e)=>priceSorting(e.target.value)} name="price-sort">
              <option value="">Default</option>
              <option value={`""`}>Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <select onChange={(e)=>priceSorting(e.target.value)} name="price-sort">
              <option value="">Default</option>
              <option value={`sold`}>Bestsellers</option>
              <option value="-sold">Least sold</option>
            </select>
          </div>
        </div>
      </section> 
        <div className="all-products-container">
          {
            products ? products.map((el)=>{
              return (
                <div className="product-card" key={el._id}>
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
                      }} src={el.image.url} alt="product" />
                    </div>
                    <div className="product-text">
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                      <p>1x {el.price} sum</p>
                    </div>
                  </div>
                  <div className="product-card-right">
                    {
                      StorageFavourites ? <>{
                        favouriteBtn(el)
                      }</> : <><Image onClick={()=>handleFavourite(el)} width={30} height={30} src="https://static-00.iconduck.com/assets.00/favorite-border-icon-256x234-y800ga9r.png" style={{
                        width:"30px",
                        height:"30px",
                        marginRight:"15px"
                      }} alt="" /></>
                    }
                    {
                      StorageProducts ? <>{
                        cartBtn(el)                       
                        }</> : <button key={el._id} onClick={()=>handleQuantity(el)}>Add to cart</button>
                    }
                  </div>
                </div>
              )
            }) : <></>
          }
        </div>
        {
            totalPaginate > 1 ? <section id="pagination">
            <div className="container">
              <div className="pagination-btns">
                <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button>
                <span>{active}</span>
                <button disabled={totalPaginate === active ? true : false} onClick={()=>{setActive(active+1)}}>{">"}</button>
              </div>
            </div>
          </section> : null
          }
      </div>
    </div>
  )
}

export default AllProducts