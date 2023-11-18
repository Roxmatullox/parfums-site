import Register from "@/components/Register/register"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Register',
  description: 'Parfums',
}

const RegisterPage = () => {
  return (
    <main>
      <h1 style={{
        textAlign:"center",
        color:"white",
        marginBottom:"30px"
      }}>Register</h1>
      <Register />
    </main>
  )
}

export default RegisterPage