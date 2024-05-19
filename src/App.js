// src/App.js
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import SignIn from "./components/Auth/Login"
import SignUp from "./components/Auth/Register"
import Navbar from "./components/Navbar/index"
import Home from "./components/HomePage/HomePage"
import ProfilePage from "./components/Profile/Profile"
import PrivateRoute from "./components/PrivateRoute"
import EditProfile from "./components/Profile/EditProfile"
import InitiativePage from "./components/Initiative/InitiativePage"
import PostCard from "./components/Post/Post"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<SignIn />}
          />
          <Route
            path="/initiative"
            element={<InitiativePage />}
          />
          <Route
            path="/post"
            element={<PostCard />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<ProfilePage />} />}
          />
          <Route
            path="/edit-profile"
            element={<PrivateRoute element={<EditProfile />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
