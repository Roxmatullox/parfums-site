import request from "@/server/request";
import order from "@/types/order";
import storeProduct from "@/types/storeCartProduct";
import { create } from "zustand"






interface OrdersInterface {
  orders : order[],
  total : number,
  getOrders:()=>void,
}



const useOrders = create<OrdersInterface>()((set , get)=>({
  orders : [],
  total : 0,
  getOrders: async ()=>{
    try {
      const {data} = await request.get("auth/payments")
      data.reverse()
      const orders = data.slice(0,3)
      set({orders , total : data.length})
    } catch (err) {
      console.log(err);
    }
  }
}))

export default useOrders