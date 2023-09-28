import { Link } from "react-router-dom";
import { useLogout } from "../hook/useLogout";
import { useAuthContext } from "../hook/useAuthContext";
//styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";
import React from "react";

const Navbar = () => {
  const { logout, err, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>
        {!user && (
          <li>
            {!user && <Link to="/login">Login</Link>}
            {!user && <Link to="/signup">Signup</Link>}
          </li>
        )}

        <li>
          {!isPending && user && (
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
