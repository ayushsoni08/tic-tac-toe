import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import './login_signup.css';

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="wrapper">
      <h2> Sign Up</h2>
      <div className="input">
        <input
          required
          placeholder="First Name"
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
        />
        <input
          required
          placeholder="Last Name"
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
        />
        <input
          required
          placeholder="Username"
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
        />
        <input
          required
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
        />
      </div>
      <button className="authBtn" onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
