import React from "react";
import { useLogout } from "../hook/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Navbar;
