import React, { useState } from "react";
import { signup } from "../utils/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await signup(email, password);
      setStatus(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Lets sign up.</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email please.."
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
