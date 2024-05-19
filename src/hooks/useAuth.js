import { useState, useEffect, useContext, createContext } from "react"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token")
    return { token, isAuthenticated: !!token }
  })

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/auth/verify-token",
            {
              headers: { token: token },
            }
          )
          if (res.data.isValid) {
            setAuth({ token, isAuthenticated: true })
          } else {
            localStorage.removeItem("token")
            setAuth({ token: null, isAuthenticated: false })
          }
        } catch (error) {
          console.error("Token validation error:", error)
          localStorage.removeItem("token")
          setAuth({ token: null, isAuthenticated: false })
        }
      }
    }

    checkAuthStatus()
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token)
    setAuth({ token, isAuthenticated: true })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setAuth({ token: null, isAuthenticated: false })
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
