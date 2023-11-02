import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Login.css";
import "./Login1.js";

const Login = () => {
  const [gstNo, set_gstNo] = useState("");
  const [password, set_password] = useState("");
  const [gstNo1, set_gstNo1] = useState("");
  const [password1, set_password1] = useState("");
  const [name1, set_name1] = useState("");

  console.log("heyyy");

  const PORT = 4000;
  const url = `http://localhost:${PORT}`;

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(`${url}/user/login`);
    await Axios.post(`${url}/user/login`, {
      gstNo: gstNo,
      password: password,
    }).then((response) => {
      // console.log(response);
      if (response.data === "Login") {
        localStorage.setItem("userGST", gstNo);
        localStorage.setItem("userPassword", password);
        window.location.reload();
      } else {
        alert("Invalid Credentials");
      }
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(`${url}/user/register`);
    // [req.body.name,req.body.gstNo,hashedPassword],
    // console.log(gstNo, password)
    await Axios.post(`${url}/user/register`, {
      name: name1,
      gstNo: gstNo1,
      password: password1,
    }).then((response) => {
      console.log(response);
      if (response.data === "User Created") {
        localStorage.setItem("userGST", gstNo1);
        localStorage.setItem("userPassword", password1);
        window.location.reload();
      } else {
        alert("Invalid Credentials");
      }
    });
  };

  return (
    <div>
      <link rel="stylesheet" type="text/css" href="log in.css" />
      <div className="login-page">
        {" "}
        {/* Login */}{" "}
        <div className="info">
          <form>
            <div>
              <input
                type="text"
                name="username"
                id="inputID"
                value={gstNo}
                placeholder="GST NO."
                onChange={(text) => {
                  set_gstNo(text.target.value);
                }}
              />{" "}
            </div>{" "}
            <div>
              <input
                type="password"
                id="inputID"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(text) => {
                  set_password(text.target.value);
                }}
              />{" "}
            </div>{" "}
            <div>
              <input
                type="submit"
                defaultValue="Submit"
                onClick={handleLogin}
              />{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
        <div className="arrow right"> &gt; </div>{" "}
      </div>{" "}
      <div className="register-page">
        {" "}
        {/* Registration */}{" "}
        <div className="info">
          <form>
            <div>
              {/* name */}
              <input
                type="text"
                id="inputID"
                name="username"
                value={name1}
                placeholder="Username"
                onChange={(text) => {
                  set_name1(text.target.value);
                }}
              />{" "}
            </div>{" "}
            <div>
            {/* GST No. */}
              <input
                type="text"
                name="username"
                id="inputID"
                value={gstNo1}
                placeholder="GST No."
                onChange={(text) => {
                  set_gstNo1(text.target.value);
                }}
              />{" "}
            </div>{" "}
            <div>
              {/* Password */}
              <input
                type="password"
                name="password"
                id="inputID"
                value={password1}
                placeholder="Password"
                onChange={(text) => {
                  set_password1(text.target.value);
                }}
              />{" "}
            </div>{" "}
            <div>
              <input
                type="submit"
                defaultValue="Submit"
                onClick={handleRegister}
              />{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
        <div className="arrow left"> &lt; </div>{" "}
      </div>{" "}
      {/* Home */}{" "}
      <div className="home">
        <div className="intro"> Welcome to Trade Management </div>{" "}
        <div className="button2">
          <div id="login" className="btn">
            Login{" "}
          </div>{" "}
          <div id="register" className="btn">
            Register{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Login;
