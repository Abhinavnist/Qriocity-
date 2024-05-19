import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const BACKEND_URL = "http://localhost:5000/api/auth/register" // Replace with your backend URL

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignUp = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    interests: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(BACKEND_URL, formData)
      navigate("/login")
      console.log(res.data) // Response from backend
      // Optionally handle successful registration, e.g., redirect user
    } catch (error) {
      console.error(error.response.data.message)
    }
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignUp
