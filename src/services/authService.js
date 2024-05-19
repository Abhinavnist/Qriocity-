import axios from "axios"

const API_URL = "http://localhost:5000/api/auth/"

const register = async (userData) => {
  try {
    await axios.post(API_URL + "register", userData)
  } catch (error) {
    throw error
  }
}

const login = async (userData) => {
  try {
    const res = await axios.post(API_URL + "login", userData)
    localStorage.setItem("token", res.data.token)
  } catch (error) {
    throw error
  }
}

export default {
  register,
  login,
}
