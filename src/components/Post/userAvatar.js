import React from "react"

const UserAvatar = ({ name, image }) => {
  return (
    <div className="avatar flex items-center justify-center rounded-full bg-gray-200 w-12 h-1/2">
      {image ? (
        <img
          src={image}
          alt="User Avatar"
          className="avatar-image rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className=" text-gray-500 rounded-full text-lg font-semibold">
          {name[0]}
        </div>
      )}
    </div>
  )
}

export default UserAvatar
