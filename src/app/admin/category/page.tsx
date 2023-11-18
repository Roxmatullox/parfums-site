"use client"

import { useEffect , useState} from "react";
import useCategory from "@/zustand/category"

import "./category.scss"

const CategoryPage = () => {

  const [isModalOpen , setIsModalOpen] = useState(false)

  const {getData , selected , setOk , ok , handleOk , handlePhoto , resetValues , getValues , values , total , data , deleteData , editData} = useCategory()

  useEffect(()=>{
    getData()
  } , [getData]) 
  
  const showModal = ()=>{
    resetValues()
    setIsModalOpen(true)
    setOk(false)
  }

  const closeModal = ()=>{
    setIsModalOpen(false)
  }  

  const handleEdit = (id : string)=>{
    setIsModalOpen(true)
    editData(id)
    setOk(false)
  }

  const formOk = (e : React.FormEvent<HTMLFormElement>)=>{
    handleOk(e)  
    setOk(true)
  }

  useEffect(()=>{
    if (ok) {
      setIsModalOpen(false)
    }
  } , [ok])

  return (
    <main className="admin-main">
      <div className="all-categories">
        <div className="container">
          <h1>Categories ({total})</h1>
          <button className="show-modal" onClick={showModal}>Add category</button>
          <div className="categories-container">
            {
              data ? data.map((el)=>{                
                return <div className="category-card" key={el._id}>
                  <div className="category-card-img">
                    <img src={el?.image?.url} alt="category-img" />
                  </div>
                  <div className="category-card-text">
                    <h2>{el.name}</h2>
                    <p>{el.createdAt.split("T")[0]}</p>
                  </div>
                  <div className="category-card-btns">
                    <button onClick={()=>handleEdit(el._id)}>Edit</button>
                    <button onClick={()=>deleteData(el._id)}>Delete</button>
                  </div>
                </div>
              } ) : <></>
            }
          </div>
        </div>
      </div>
      {
        isModalOpen ? <div className="modal-container">
        <button onClick={closeModal}><h2>x</h2></button>
        <form onSubmit={(e)=>formOk(e)}>
          {
            values.image ? <img src={values.image.url} alt="category-img" /> : <></>
          }
          <input required={selected === null ? true : false} onChange={(e)=>handlePhoto(e)} type="file" id='image' />
          <label htmlFor="name"> <span>*</span>Category name</label>
          <input required onChange={(e)=>getValues(e)} value={values.name} type="text" id='name' />
          <button type='submit'>{selected === null ? "Add" : "Save"}</button>
        </form>
        </div> : <></>
      }
    </main>
  )
}

export default CategoryPage