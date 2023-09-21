import React from "react";
import { useState } from "react";
import { useSignup } from "../hook/useSignup";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { register, err, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, displayName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button>Register!</button>}
      {isPending && <button>Loading...</button>}
      {err && <p>{err}</p>}
    </form>
  );
};

export default Register;
