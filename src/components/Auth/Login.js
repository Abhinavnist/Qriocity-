import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material"
import axios from "axios"
import { useAuth } from "../../hooks/useAuth"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      )
      login(res.data.token)
      navigate("/")
      console.log(res.data) // Token response
      // You can handle token storage and redirection here
    } catch (error) {
      console.error(error.response.data)
      setError("Invalid email or password. Please try again.") // Set error message
    }
  }

  return (
    <Container>
      {error && (
        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ mt: 2 }}
        >
          {error}
        </Typography>
      )}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid
          item
          xs={10}
          sm={8}
          md={6}
          lg={4}
        >
          <Paper
            elevation={3}
            sx={{ padding: 4 }}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              Don't have an account?{" "}
              <RouterLink to="/signup">Sign up</RouterLink>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
