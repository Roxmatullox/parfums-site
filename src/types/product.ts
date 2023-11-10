interface Product {
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
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Product