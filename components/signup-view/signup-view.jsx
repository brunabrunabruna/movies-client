import React, { useState } from "react";

const SignupView = () => {
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
      birthday: birthday
    };

    //DEBUG
    console.log(JSON.stringify(data));
    console.log(username);

    fetch("https://movies-api-render-0a0q.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application / json" },
      body: JSON.stringify(data),
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
