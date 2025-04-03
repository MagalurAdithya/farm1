import React, { useState } from "react";
import API from "../API";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import'./Login.css'
import Home from "./Home";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const login = async () => {
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
  
    try {
      const { data } = await API.post("/auth/login", { email, password });
      console.log("Login Response:", data);
  
      localStorage.setItem("token", data.token);
      
  
      switch (data.role) {
        case "farmer":
          navigate("/farmerdashbord");
          break;
        case "investor":
          navigate("/investor");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          toast.error("Invalid user role");
      }
  
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in login");
      console.error("Login Error:", error);
    }
  };
  

  return (
    <div>
      <div><Home></Home></div>
      <div className="body">
      
      <div>
      <div className="container">
      <h2 className="head">Login</h2>
      <div className="input">
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleEmail}
          required
        />
      </div>

      <div className="input">
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={handlePassword}
          required
        />
      </div>

      <button className="login" onClick={login} >
        Login
      </button>

      <p className="para">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
