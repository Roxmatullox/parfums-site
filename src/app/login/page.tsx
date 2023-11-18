import Login from "@/components/Login/login"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'Parfums',
}

const LoginPage = () => {
  return (
    <main>
      <h1 style={{
        textAlign:"center",
        color:"white",
        marginBottom:"30px"
      }}>Login</h1>
      <Login />
    </main>
  )
}

export default LoginPage