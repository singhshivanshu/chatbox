import React, { useState} from "react";
import { signin } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
          await signin(email, password);
        } catch (error) {
          setError(error.message);
        }
      };

  return (
    <div>
      <h1>Lets login</h1>
      <form onSubmit={event => handleSubmit(event)}>
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

export default Login;
