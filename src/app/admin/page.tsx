"use client"

import useCategory from "@/zustand/category"
import useProducts from "@/zustand/products"
import useUsers from "@/zustand/users"
import Link from "next/link"
import {useEffect} from "react"

import "./dashboard.scss"
import useOrdersAdmin from "@/zustand/orders-admin"

const AdminDashboard = () => {

  const {getData : getProducts ,total : productsTotal } = useProducts()
  const {getData : getUsers ,total : usersTotal } = useUsers()
  const {getData : getCategories ,total : categoryTotal } = useCategory()
  const {total : ordersTotal , getData : getOrders} = useOrdersAdmin()

  useEffect(()=>{
    getProducts()
    getUsers()
    getCategories()
    getOrders()
  } , [getProducts , getUsers , getCategories ,getOrders])


  return (
    <main className="admin-main">
      <div className="dashboard">
        <div className="container">
          <div className="dashboard-container">
            <div>
              <h3>Categories ({categoryTotal ? categoryTotal : "-"})</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus, similique esse unde ducimus beatae?</p>
              <Link href="admin/category" >Go{" ->"}</Link>
            </div>
            <div>
              <h3>Products ({productsTotal ? productsTotal : "-"})</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus, similique esse unde ducimus beatae?</p>
              <Link href="admin/products" >Go{" ->"}</Link>
            </div>
            <div>
              <h3>Users ({usersTotal ? usersTotal : "-"})</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus, similique esse unde ducimus beatae?</p>
              <Link href="admin/users" >Go{" ->"}</Link>
            </div>
            <div>
              <h3>Orders ({ordersTotal ? ordersTotal : "-"})</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus, similique esse unde ducimus beatae?</p>
              <Link href="admin/orders" >Go{" ->"}</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdminDashboard