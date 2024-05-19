import React from "react"

const UserAvatar = ({ name, image }) => {
  return (
    <div className="avatar">
      {image ? (
        <img
          src={image}
          alt="User Avatar"
          className="avatar-image"
        />
      ) : (
        <div className="avatar-fallback">{name[0]}</div>
      )}
    </div>
  )
}

export default UserAvatar
