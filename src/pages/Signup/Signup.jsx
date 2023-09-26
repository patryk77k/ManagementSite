import React, { useState } from "react";
//styles
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, displayName);
  };

  const handleFileChange = (e) => {
    setThumbnailError(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("Please select a file");
      return; //zeby nie przechodzilo do kolejnego kroku i ew nie wywalalo bledow z kolejnego if
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
    }
    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
    }
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input required type="file" onChange={handleFileChange} />
      </label>
      <button className="btn">Sign up</button>
    </form>
  );
};

export default Signup;
