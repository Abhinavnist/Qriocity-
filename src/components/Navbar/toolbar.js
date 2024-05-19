import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { fade, withStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useAuth } from "../../hooks/useAuth"

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
})

const ToolbarComponent = (props) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const { auth, logout } = useAuth()

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(mobileMoreAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      {!auth.isAuthenticated ? (
        <>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/signup"
            >
              Signup
            </Button>
          </MenuItem>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/post"
            >
              post
            </Button>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleMobileMenuClose}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/profile"
            >
              Profile
            </Button>
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout()
              handleMobileMenuClose()
            }}
          >
            <Button color="inherit">Logout</Button>
          </MenuItem>
        </>
      )}
    </Menu>
  )

  const { classes } = props

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="success"
      >
        <Toolbar>
          <RouterLink to="/">
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
            >
              Environment
            </Typography>
          </RouterLink>
          <div className={classes.grow} />
          <Button
            color="inherit"
            component={RouterLink}
            to="/post"
          >
            POST
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/initiative"
          >
            Initative
          </Button>
          <div className={classes.sectionDesktop}>
            {!auth.isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/signup"
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/profile"
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  )
}

export default withStyles(styles)(ToolbarComponent)
