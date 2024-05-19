// src/components/PrivateRoute.js
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const PrivateRoute = ({ element }) => {
  const { auth } = useAuth()

  return auth.isAuthenticated ? element : <Navigate to="/login" />
}

export default PrivateRoute
