// import Product from "@/types/product"
import { create } from "zustand"

import Cookies from "js-cookie";
import storeProduct from "@/types/storeCartProduct";
import request from "@/server/request";
// import storeProduct from "@/types/storeCartProduct";

interface CartInterface {
  refresh : boolean,
  setRefresh:(ref:boolean)=>void,
  buyThisProducts : ()=>void
}

interface cartBuy {
  cart: {
      product: string;
      quantity: number;
  }[];
  comment: string;
}

const JsonCart = Cookies.get("cart")

const StorageProducts =  JsonCart ? JSON.parse(JsonCart) : null

const useCart = create<CartInterface>()((set , get)=>({
  refresh : false ,
  setRefresh:(ref)=>{
    set({refresh : ref})    
  },
  buyThisProducts: async ()=>{
    const cartProducts:cartBuy = {
      cart:[],
      comment:"Buy",
    }
    await StorageProducts.map((el : storeProduct)=>{
      cartProducts.cart.push({
        product:el.el._id,
        quantity:el.quantity
      })
    })
    await request.post("payment" , cartProducts)
    Cookies.remove("cart")
    const {refresh} = get()
    set({refresh : !refresh })
  }
}))


export default useCart