import getProducts from "./data-products";

interface product {
  checked: boolean;
  sold: number;
  _id: string;
  title: string;
  price: number;
  description: string;
  image: {
      public_id: string;
      url: string;
  };
  quantity: number;
  category: {
      _id: string;
      name: string;
      image: {
        public_id: string;
        url: string;
      }
      createdAt: string;
      updatedAt: string;
      __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}



const useProducts = getProducts<product>("product")

export default useProducts