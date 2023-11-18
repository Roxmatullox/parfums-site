import FavouriteProducts from "@/components/favouriteProducts/favouriteProducts"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Favorite',
  description: 'Parfums',
}

const CartPage = () => {
  return (
    <main>
      <FavouriteProducts />
    </main>
  )
}

export default CartPage