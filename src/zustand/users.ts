import getData from "./data-users";

interface User {
  role: number;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  password? : string ;
}

const useUsers = getData<User>("user")

export default useUsers