import React, { useState } from "react";

const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://movies-api-render-0a0q.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application / json" },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          alert("signup successful");
          window.location.reload();
        } else {
          alert("signup failed");
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
      <label>
        email:
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </label>
      <label>
        birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => {
            setBirthday(e.target.value);
          }}
          required
        />
      </label>

      <button>submit</button>
    </form>
  );
};

export default SignupView;
