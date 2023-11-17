
import request from "@/server/request"
import Cookies from "js-cookie"

import { toast } from "react-toastify";

import { create } from 'zustand'
interface AuthInterface {
  isLogin : boolean,
  role : number | null,
  login :(e : React.FormEvent<HTMLFormElement>)=>void,
  register :(e : React.FormEvent<HTMLFormElement>)=>void,
  logout : ()=>void
}

const useAuth = create<AuthInterface>()((set , get) => ({
  isLogin : Boolean(Cookies.get("isLogin")),
  role : +`${Cookies.get("userData")}` ,
  login: async (e)=>{
    e.preventDefault()
    try {
      const values = {
        username : e.currentTarget.username.value,
        password : e.currentTarget.password.value,
      } 
      const {data} = await request.post("auth/login" , values)
      set((state)=>({...state , isLogin : true , role : data.user.role}))      
      Cookies.set("isLogin" , data.accesstoken)
      Cookies.set("userData" , data.user.role)
      Cookies.set("MyId" , data.user._id)
      if (get().role === 1) {
        window.location.replace("/admin")
      } else{
        window.location.replace("/user")
      }
    }  catch (err : object | any) {      
      toast.error(err.response.data.msg || "Error")
    }
  },

  register : async (e)=>{
    e.preventDefault()
    try {
      const values = {
        firstName : e.currentTarget.firstName.value,
        lastName : e.currentTarget.lastName.value,
        username : e.currentTarget.username.value,
        phoneNumber : e.currentTarget.phoneNumber.value,
        password : e.currentTarget.password.value,
        confirmPassword : e.currentTarget.confirmPassword.value,
      }

      console.log(values);
      if (values.confirmPassword === values.password) {
        const {data} = await request.post("auth/register" , values)
        set((state)=>({...state , isLogin : true , role : data.user.role}))      
        Cookies.set("isLogin" , data.token)
        Cookies.set("userData" , data.user.role)
        Cookies.set("MyId" , data.user._id)
        if (get().role === 1) {
          window.location.replace("/admin")
        } else{
          window.location.replace("/user")
        }
      } else {
        toast.error("Parolni qayta tekshiring")
      }
    }  catch (err : object | any) {
      toast.error(err.response.data.msg || "Error")
    }
  },
  logout : ()=>{
      const logoutConfirm = confirm("Akkountdan chiqasizmi ?")
      if (logoutConfirm) {
        Cookies.remove("isLogin")
        Cookies.remove("userData")
        Cookies.remove("MyId")
        window.location.replace("/")
      }
  }
}))


export default useAuth