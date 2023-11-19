"use client"

import useProducts from '@/zustand/products'
import {useEffect , useState} from 'react'
import {toast} from "react-toastify"

import "./products.scss"

import request from '@/server/request'



const ProductsPage = () => {

  const {getData , setCategory : handelCategory , setSort , SearchData , handlePhoto , totalPaginate , active , setActive , handleOk , selected , getValues , data , handleCancel , total , values , showModal , isModalOpen , editData , deleteData} = useProducts()

  useEffect(()=>{
    getData()
  } , [getData]) 
  
  
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
      const {data} = await request.get("category")
      setCategory(data)
    } catch (err : object | any) {
      toast.error(err.response.data || "Error")
    }
  }

  useEffect(()=>{
    getLatestCategory()
  } , [])

  return (
    <main className='admin-main'>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={(e)=>SearchData(e)} type="text" placeholder="Search..." />
          </div>
        </div>
      </section> 
      <div className="all-products">
        <div className="container">
          <h1>Products ({total})</h1>
          <button className="show-modal" onClick={showModal}>Add product</button>
          <select className='sort-select' onChange={(e)=>setSort(e)} name="price-sort">
              <option value="">Default</option>
              <option value="price">Increace</option>
              <option value="-price">Decreace</option>
            </select>
            <select className='sort-select' onChange={(e)=>setSort(e)} name="price-sort">
              <option value="">Default</option>
              <option value={`""`}>Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <select className='sort-select' onChange={(e)=>setSort(e)} name="price-sort">
              <option value="">Default</option>
              <option value={`sold`}>Least sold</option>
              <option value="-sold">Bestsellers</option>
            </select>
            <select className='sort-select' onChange={(e)=>{handelCategory(e)}} name="category" id="category">
              <option value="">Default</option>
              {
                category?.map((el)=>{
                  return <option selected={values?.category?.toString() === el._id ? true : false} key={el._id} value={el._id}>{el.name}</option>
                })
              }
            </select>
          <div className="products-container">
            {
              data ? data.map((el)=>{                
                return <div className="product-card" key={el._id}>
                  <div className="product-card-img">
                    <img src={el?.image?.url} alt="product-img" />
                  </div>
                  <div className="product-card-text">
                    <h2>{el.title}</h2>
                    <p>{el.description}</p>
                    <p>{el.sold} sotigan / {el.quantity} qolgan</p>
                    <p>{el.createdAt.split("T")[0]}</p>
                  </div>
                  <div className="product-card-btns">
                    <button onClick={()=>editData(el._id)}>Edit</button>
                    <button onClick={()=>deleteData(el._id)}>Delete</button>
                  </div>
                </div>
              } ) : <></>
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
      {
        isModalOpen ? <div className="modal-container">
        <button onClick={handleCancel}><h2>x</h2></button>
        <form onSubmit={(e)=>handleOk(e)}>
          {
            values?.image ? <img src={values.image.url} alt="category-img" /> : <></>
          }
          <input required={selected === null ? true : false} onChange={(e)=>handlePhoto(e)} type="file" id='image' />
            <label htmlFor="title"> <span>*</span> Title</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.title ? values.title : ""} type="text" id='title' />
            <label htmlFor="quantity"> <span>*</span> Quantity</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.quantity ? values.quantity : ""} type="number" id='quantity' />
            <label htmlFor="price"> <span>*</span> Price</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.price ? values.price : ""} type="number" id='price' />
            <label htmlFor="price"> <span>*</span> Category</label>
            <select onChange={(e)=>{getValues(e)}} name="category" id="category">
              {
                category?.map((el)=>{
                  return <option selected={values?.category?.toString() === el._id ? true : false} key={el._id} value={el._id}>{el.name}</option>
                })
              }
            </select>
            <button type='submit'>{selected === null ? "Add" : "Save"}</button>
        </form>
        </div> : <></>
      }
    </main>
  )
}

export default ProductsPage