//styles
import "./OnlineUsers.css";
import { useCollection } from "../hook/useCollection";
import Avatar from "./Avatar";

import React from "react";

const OnlineUsers = () => {
  const { documents, isPending } = useCollection("users");
  console.log(documents);

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}

      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
