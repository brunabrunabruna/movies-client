import React, { useState } from "react";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    fetch("https://movies-api-render-0a0q.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application / json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((credentials) => {
        console.log("login response:", credentials);
        if (credentials.user) {
          localStorage.setItem("user", JSON.stringify(credentials.user));
          localStorage.setItem("token", credentials.token);
          onLoggedIn(credentials.user, credentials.token);
        } else {
          alert("no such user");
        }
      });
    // .catch((err) => console.log("error", err));
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
