import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null ))

  const login = async(inputs) => {
    try {
      const res = await axios.post("/auth/login", inputs)
      setCurrentUser(res.data)
      localStorage.setItem("user", JSON.stringify(res.data))
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async(inputs) => {
    try {
      await axios.post("/auth/logout")
      setCurrentUser(null)
      localStorage.removeItem("user")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/check")
        setCurrentUser(res.data)
        localStorage.setItem("user", JSON.stringify(res.data))
      } catch (err) {
        console.error(err)
        setCurrentUser(null)
        localStorage.removeItem("user")
      }
    }
  
    if (!currentUser) {
      fetchUser()
    }
  }, [currentUser])  

    return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
