"use client"

import useUsers from '@/zustand/users'
import {useEffect} from 'react'

import "./user.scss"

const UsersPage = () => {

  const {getData , totalPaginate , active , setActive , handleOk , selected , getValues , data , handleCancel , total , values , showModal , isModalOpen , editData , deleteData} = useUsers()

  useEffect(()=>{
    getData()
  } , [getData])
  

  return (
    <main className='admin-main'>
      <div className="all-users">
        <div className="container">
          <h1>Users ({total})</h1>
          <button className="show-modal" onClick={showModal}>Add user</button>
          <div className="users-container">
            {
              data ? data.map((el)=>{                
                return <div className="user-card" key={el._id}>
                  <div className="user-card-text">
                    <h2>{el.username}</h2>
                    <h3>{el.firstName} {el.lastName}</h3>
                    <p>{el.createdAt.split("T")[0]}</p>
                  </div>
                  <div className="user-card-btns">
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
        <label htmlFor="firstName"> <span>*</span> Firstname</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.firstName ? values.firstName : ""} type="text" id='firstName' />
            <label htmlFor="lastName"> <span>*</span> Lastname</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.lastName ? values.lastName : ""} type="text" id='lastName' />
            <label htmlFor="username"> <span>*</span> Username</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.username ? values.username : ""} type="text" id='username' />
            <label htmlFor="phoneNumber"> <span>*</span> Phone number</label>
            <input onChange={(e)=>{getValues(e)}} value={values?.phoneNumber ? values.phoneNumber : ""} type="text" id='phoneNumber' />
            {
              selected === null ? <>
              <label htmlFor="password"> <span>*</span> Password</label>
              <input onChange={(e)=>{getValues(e)}} value={values?.password ? values.password : ""} type="password" id='password' />
              </> : <></>
            }
            <button type='submit'>{selected === null ? "Add" : "Save"}</button>
        </form>
        </div> : <></>
      }
    </main>
  )
}

export default UsersPage