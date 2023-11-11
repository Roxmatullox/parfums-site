import { create } from "zustand"


interface cart {
  product: string;
  quantity: number;
}

interface CartInterface {
  cart : null | cart[],
  
}

const useCart = create<CartInterface>()((set , get)=>({
  cart:null
}))