import { Link } from "react-router-dom";
import { useLogout } from "../hook/useLogout";
//styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";
import React from "react";

const Navbar = () => {
  const { logout, err, isPending } = useLogout();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {!isPending && (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
          {isPending && (
            <button className="btn" disabled>
              Logging out...
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
