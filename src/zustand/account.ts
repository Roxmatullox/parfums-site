import request from "@/server/request";
import { create } from "zustand";


interface UserDatas {
  role: number;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserDatasInterface {
  values: UserDatas,
  getUserDatas :()=>void,
  getValues:(e : React.FormEvent<HTMLInputElement>)=>void
  updateUserDatas : (e :React.FormEvent<HTMLFormElement> )=>void
}


const useUserDatas = create<UserDatasInterface>()((set , get)=>({
  values:{
    role: 0,
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  },
  getUserDatas: async ()=>{
    const {data} = await request.get("auth/me")
    set({values : data})
  },
  getValues:(e)=>{
    const {values} = get()    
    set({values : {...values , 
      [e.currentTarget.name]:e.currentTarget.value
    }})
  },
  updateUserDatas: async (e)=>{
    e.preventDefault()
    const values = {
      firstName : e.currentTarget.firstName.value,
      lastName : e.currentTarget.lastName.value,
      username : e.currentTarget.username.value,
      phoneNumber : e.currentTarget.phoneNumber.value,
    }
    const {data} = await request.put("auth/update" , values)
    set({values : data})
  },
}))

export default useUserDatas