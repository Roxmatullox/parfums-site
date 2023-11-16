import getData from "./data-no-pagination";


interface category {
  _id: string;
  name: string;
  image: {
      public_id: string;
      url: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const useCategory = getData<category>("category")

export default useCategory