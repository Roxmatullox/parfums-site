"use client"

import request from "@/server/request";
import Product from "@/types/product";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import "./allProducts.scss"

const AllProducts = () => {

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
  } , [active , search , sort])

  const handleSearch = (str : string)=>{
    setSearch(str)
    console.log(str);
    
  }

  return (
    <div>
      <div className="container">
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={(e)=>handleSearch(e.target.value)} type="text" placeholder="Search..." />
          </div>
        </div>
      </section> 
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 1fr",
          gap:"20px"
        }} className="all-products-container">
          {
            products ? products.map((el)=>{
              return (
                <div style={{
                  display:"flex",
                  justifyContent:"space-between",
                  alignItems:"center",
                  border:"1px solid #9c27b0",
                  padding:"10px",
                  borderRadius:"10px"
                }} key={el._id}>
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
                    </div>
                  </div>
                  <div className="product-card-right">
                      <Button variant='contained' color="secondary">Add to cart</Button>
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