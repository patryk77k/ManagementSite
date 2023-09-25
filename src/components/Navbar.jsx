import React from "react";
import { useLogout } from "../hook/useLogout";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hook/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
      <button onClick={logout}>logout</button>
      {user && <p>{`Hello ${user.displayName}`}</p>}
    </div>
  );
};

export default Navbar;
