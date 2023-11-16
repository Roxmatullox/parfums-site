import request from "@/server/request";
import { toast } from "react-toastify";
import { create } from "zustand";

function getData<T>(url : string){
  interface DataInterface {
    data : T[],
    total : number ,
    photo : string | null ,
    selected : string | null ,
    search : string ,
    loading : boolean,
    totalPaginate : number ,
    active : number ,
    isModalOpen : boolean ,
    values:T | null;
    getData : ()=> void ,
    handleOk : (e :  React.FormEvent<HTMLFormElement> )=>void,
    editData : ( id : string)=>void,
    deleteData : ( id : string)=>void,
    setActive : ( active : number)=>void,
    showModal : ()=>void,
    handleCancel : ()=>void,
    SearchData : (e : React.ChangeEvent<HTMLInputElement>)=>void,
    handlePhoto : ( e : React.FormEvent<HTMLInputElement> )=>void,
    getValues:(e : React.FormEvent<HTMLInputElement>)=>void
  }
  return create<DataInterface>()((set , get) => ({
    data : [],
    total : 0 ,
    photo : null ,
    selected : null ,
    search : "" ,
    loading : false,
    totalPaginate : 1 ,
    active : 1 ,
    isModalOpen : false ,
    values:null,
    getData : async ()=> {
      const {search , active} = get()
      const params = {
        search : search ,
        page : active ,
        limit : 12,
      }
      try {
        set((state)=>({...state , loading : true}))
        const {data} = await request.get(url ,{params})                
        set((state)=>({...state , data :data.users , total : data.total , totalPaginate : Math.ceil(data.total / 12) }))
      } catch (err) {
        toast.error("Server bilan hatolik !")
      } finally {
        set((state)=>({...state , loading : false}))
      }
    } ,
    handleOk : async (e)=>{
      e.preventDefault()
      const {selected , getData} = get()
      const {values} = get()
      try {
        if (selected === null) {
          await request.post(url , values)
          getData()
          set((state)=>({...state , isModalOpen : false}))
        } else {
          await request.put(`${url}/${selected}` , values)
          getData()
          set((state)=>({...state , isModalOpen : false}))
        }
      } catch (err) {
        toast.error("Malumot jonatishda hatolik !")
      }
    },
    editData : async (id)=>{
      const {data} = await request.get(`${url}/${id}`)
      set((state)=>({...state , values : data}))
      set((state)=>({...state , selected : id , isModalOpen : true}))
    },
    deleteData : async (id)=>{
      const deleteConfirm = confirm("Bu skill ochirilsinmi?")
      if (deleteConfirm) {
        await request.delete(`${url}/${id}`)
        get().getData()
      }
    },
    setActive : (active)=>{
      set((state)=>({...state , active}))
      get().getData()
    },
    showModal : ()=>{
      set({values : null})
      set((state)=>({...state , selected : null , photo : null , isModalOpen : true}))
    },
    handleCancel : ()=>{
      set((state)=>({...state , isModalOpen : false , selected : null}))
    },
    SearchData : (e)=>{      
      set((state)=>({...state , search : e.target.value}))
      get().getData()
    },
    handlePhoto : async (e)=>{
      const formData = new FormData()
      if (e.currentTarget.files) {
        formData.append("file"  , e.currentTarget.files[0])
      }
      const {data : photo} = await request.post("upload" , formData )
      const {values} = get()
      const newValues = {
        ...values ,
        image : photo ,
      }      
      set({values : newValues as T})
    },
    getValues:(e)=>{
      const {values} = get()          
      set({values : {...values , 
        [e.currentTarget.id]:e.currentTarget.value
      } as T})
    },
  }))
}

export default getData
