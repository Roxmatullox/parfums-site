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

    if (isLogin === false && location.split("/")[1] !== "logi" ) {  
      if (location.split("/")[1] !== "regi") {
        window.location.replace("/login")  
      }    
    } else if (role === 1 && location.split("/")[1] === "user") {      
        window.location.replace("/admin")  
    } else if ( role === 0 && location.split("/")[1] === "admi") {      
        window.location.replace("/user")  
    }

    }
}))

export default useLocationRules