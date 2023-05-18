import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <div className="wrapper">
      <h2> Login</h2>
      <div className="input">
        <input
          required
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <input
          required
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </div>
      <button className="authBtn" onClick={login}>Sign In</button>
      <p className="Account">Don't have an account ? <Link className="navLink" to="/signup">SignUp</Link></p>
    </div>
  );
}

export default Login;
