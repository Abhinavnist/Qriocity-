import React, { useState, useEffect } from "react"
import UserPostBar from "./UserPostBar"
import { Favorite, ChatBubble, Send } from "@mui/icons-material" // Import icons from Material-UI
import axios from "axios" // Import Axios for making HTTP requests

const PostCard = ({ postId }) => {
  const [post, setPost] = useState(null) // State to hold the post data
  const [likes, setLikes] = useState(0) // State to hold the number of likes

  // Function to fetch post data
  const getPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/posts`) // Fetch post data from backend API
      setPost(response.data) // Set the fetched post data in the state
      console.log(response.data.name)
    } catch (error) {
      console.error("Error fetching post:", error)
    }
  }

  // Function to handle liking a post
  const handleLike = async () => {
    // try {
    //   // Make a POST request to the backend to like the post
    //   const response = await axios.post(`/api/posts/${postId}/like`)
    //   setLikes(likes + 1) // Update the number of likes in the state
    // } catch (error) {
    //   console.error("Error liking post:", error)
    // }
  }

  // Fetch post data when the component mounts
  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="mb-7">
      {post && <UserPostBar post={post} />}
      {post && <div className="ml-12 mt-[-10px]">{post.content}</div>}
      {post?.image && (
        <img
          src={setPost.image}
          alt="post image"
          className="w-full h-[400px] rounded-md cursor-pointer object-cover"
        />
      )}

      <div className="mt-2 flex space-x-4">
        <Favorite
          sx={{ fontSize: 20, cursor: "pointer" }}
          onClick={handleLike} // Call handleLike function on click
        />
        <ChatBubble sx={{ fontSize: 20, cursor: "pointer" }} />
        <Send sx={{ fontSize: 20, cursor: "pointer" }} />
      </div>

      <div className="mt-2">
        <span>3 replies</span>
        <span className="ml-3">{likes} Like</span>{" "}
        {/* Display the number of likes */}
      </div>
    </div>
  )
}

export default PostCard
