import React from 'react';
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";
import { Routes, Route } from 'react-router-dom';

function App() {
  const api_key = "cprnj6ekmttc";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (

    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame logOut={logOut} />
        </Chat>
      ) : (
        <Routes>
          <Route exact path='/signup' element={<SignUp setIsAuth={setIsAuth} />} />
          <Route exact path='/' element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
