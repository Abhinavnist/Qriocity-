import React, { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import axios from "axios"
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const EditProfile = () => {
  const { auth } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          "http://localhost:5000/api/profile/profile",
          {
            headers: { token: localStorage.getItem("token") },
          }
        )
        const { name, email, interests } = response.data.user
        setFormData({ name, email, interests: interests.join(", ") })
        setLoading(false)
      } catch (error) {
        setError(error.response.data.message)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [auth.token])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.put(
        "http://localhost:5000/api/profile/profile",
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      setSuccess(true)
      setLoading(false)
      navigate("/profile")
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Interests"
          type="text"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>Profile updated successfully</p>
        )}
      </form>
    </div>
  )
}

export default EditProfile
