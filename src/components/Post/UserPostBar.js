import React from "react"
import UserAvatar from "./userAvatar"
import { MoreHoriz } from "@mui/icons-material"

export default function UserPostBar({ post }) {
  // Extracting date parts
  const dateParts = post.date.split(" ")
  const dayMonth = dateParts[0] + " " + dateParts[1] // Extracting day and month
  const time = dateParts[4] // Extracting time

  return (
    <div className="flex">
      <UserAvatar
        name={post.author.name}
        image=""
      />
      <div className="flex justify-between w-full ml-2 items-start">
        <strong>{post.author.name}</strong>
      </div>
      <div className="flex items-center ">
        <span className="mr-2">
          {dayMonth}, {time}
        </span>{" "}
        {/* Adjusted date format */}
        <MoreHoriz sx={{ fontSize: 22 }} />{" "}
        {/* Use MoreHoriz icon from Material-UI */}
      </div>
    </div>
  )
}
