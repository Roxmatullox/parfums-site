import Product from "@/types/product"
import { create } from "zustand"

import Cookies from "js-cookie";
import storeProduct from "@/types/storeCartProduct";

interface CartInterface {
  refresh : boolean,
  setRefresh:(ref:boolean)=>void
}

const JsonCart = Cookies.get("cart")

const StorageProducts =  JsonCart ? JSON.parse(JsonCart) : null

const useCart = create<CartInterface>()((set , get)=>({
  refresh : false ,
  setRefresh:(ref)=>{
    set({refresh : ref})
  }
}))

export default useCart