import React from "react";
import { useLogout } from "../hook/useLogout";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();
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
    </div>
  );
};

export default Navbar;
