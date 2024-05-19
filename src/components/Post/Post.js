import React, { useState, useEffect } from "react"
import UserPostBar from "./UserPostBar"
import { Favorite, ChatBubble, Send } from "@mui/icons-material" // Import icons from Material-UI
import axios from "axios" // Import Axios for making HTTP requests

const PostCard = () => {
  const [posts, setPosts] = useState([]) // State to hold the post data
  const [likes, setLikes] = useState({}) // State to hold the number of likes for each post

  // Function to fetch post data
  const getPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/posts`) // Fetch post data from backend API
      setPosts(response.data) // Set the fetched post data in the state
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  // Function to handle liking a post
  const handleLike = async (postId) => {
    try {
      // Make a POST request to the backend to like the post
      await axios.post(`http://localhost:5000/api/posts/${postId}/like`)
      // Update the number of likes in the state
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: (prevLikes[postId] || 0) + 1,
      }))
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }

  // Fetch post data when the component mounts
  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="overflow-y-auto max-h-[600px]">
        {posts.map((post) => (
          <div
            key={post._id}
            className="mb-7"
          >
            <UserPostBar post={post} />
            <div className="ml-12 mt-[-10px]">{post.content}</div>
            {post.image && (
              <img
                src={post.image}
                alt="post image"
                className="w-full h-[400px] rounded-md cursor-pointer object-cover"
              />
            )}

            <div className="mt-2 flex space-x-4">
              <Favorite
                sx={{ fontSize: 20, cursor: "pointer" }}
                onClick={() => handleLike(post._id)} // Call handleLike function with post ID on click
              />
              <ChatBubble sx={{ fontSize: 20, cursor: "pointer" }} />
              <Send sx={{ fontSize: 20, cursor: "pointer" }} />
            </div>

            <div className="mt-2">
              <span>3 replies</span>
              <span className="ml-3">{likes[post._id] || 0} Like</span>{" "}
              {/* Display the number of likes */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostCard
