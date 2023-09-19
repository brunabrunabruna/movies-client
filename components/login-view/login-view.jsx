import React, { useState } from "react";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    //DEBUG
    // console.log("login data stringified", JSON.stringify(data));

    fetch("https://movies-api-render-0a0q.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // console.log("response json", response.json());
        return response.json();
      })
      .then(async (data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          console.log("data.user:", data.user);
          alert("no such user");
        }
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username:
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
      </label>

      <label>
        password:
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </label>

      <button>submit</button>
    </form>
  );
};

export default LoginView;
