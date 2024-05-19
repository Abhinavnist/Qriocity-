import React, { useState, useEffect } from "react"
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  Grid,
  makeStyles,
} from "@material-ui/core"
import { useAuth } from "../../hooks/useAuth"
import axios from "axios"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}))

const ProfilePage = () => {
  const classes = useStyles()
  const { auth } = useAuth()
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: "",
    password: "",
  })

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile/profile",
          {
            headers: { token: localStorage.getItem("token") },
          }
        )
        console.log(response.data)
        setUser(response.data.user)
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          interests: response.data.user.interests.join(", "),
          password: "",
        })
      } catch (error) {
        console.error("Error fetching profile data", error)
      }
    }

    fetchProfile()
  }, [auth.token])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    setFormData({
      name: user.name,
      email: user.email,
      interests: user.interests.join(", "),
      password: "",
    })
  }

  const handleSave = async () => {
    try {
      await axios.put(
        "/api/profile",
        {
          name: formData.name,
          email: formData.email,
          interests: formData.interests
            .split(",")
            .map((interest) => interest.trim()),
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      setEditMode(false)
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        interests: formData.interests
          .split(",")
          .map((interest) => interest.trim()),
      })
    } catch (error) {
      console.error("Error updating profile", error)
    }
  }

  if (!user) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          alignItems="center"
        >
          <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
          <Typography variant="h5">{user.name}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {user.email}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            {user.interests.join(", ")}
          </Typography>
        </Grid>
        {editMode ? (
          <>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              className={classes.formControl}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              className={classes.formControl}
            />
            <TextField
              label="Interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              fullWidth
              className={classes.formControl}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              className={classes.formControl}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              className={classes.button}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              className={classes.button}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            component={Link} // Use Link component
            to="/edit-profile" // Link to the edit profile page
            className={classes.button}
          >
            Edit Profile
          </Button>
        )}
      </Paper>
    </Container>
  )
}

export default ProfilePage
