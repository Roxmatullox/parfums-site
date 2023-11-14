import { create } from "zustand"


interface locationInterface {
  location: string;
  isLogin: boolean;
  role: number | null;
}


interface locationRulesInterface {
  Rule:(location : locationInterface)=>void
}



const useLocationRules = create<locationRulesInterface>()((set , get)=>({
  Rule:({location , isLogin , role})=>{

    if (isLogin === false || role === 1) {
      if (location.split("/")[1] === "user") {
        window.location.replace("/admin")  
      }
    }

    if (isLogin === false || role === 0) {
      if (location.split("/")[1] === "admin") {
        window.location.replace("/user")  
      }
    }
    }
}))

export default useLocationRules