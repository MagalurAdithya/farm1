import React, { useState } from "react";
import API from "../API";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Register.css'

const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  const handleFirstName = (e) => setFirstName(e.target.value)
  const handleLastName = (e) => setLastName(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleRole = (e) => setRole(e.target.value)

  const save = async () => {
    
    if (!email.includes("@gmail.com")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!firstName || !lastName || !email || !password || !role) {
      toast.error("Please fill out all fields")
      return;
    }
   

    try {
      const { data } = await API.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      });
      console.log(data);
      toast.success("Registration successful")
      navigate("/login")
    } catch (error) {
      toast.error("Error in Registration")
    }
  };

  return (
    <div className="div1">
      <div className="div2">
        <h2 className="head1">Register</h2>

        <div className="input1">
          <label>First Name<b style={{color:"red"}}> * </b></label>
          <input
            type="text"
            value={firstName}
            placeholder="Enter your first name"
            onChange={handleFirstName}
          />
        </div>

        <div className="input1">
          <label>Last Name<b style={{color:"red"}}> * </b></label>
          <input
            type="text"
            value={lastName}
            placeholder="Enter your last name"
            onChange={handleLastName}
          />
        </div>

        <div className="input1">
          <label>Email<b style={{color:"red"}}> * </b></label>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleEmail}
          />
        </div>

        <div className="input1">
          <label>Password<b style={{color:"red"}}> * </b></label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={handlePassword}
          />
        </div>
        <div className="input1" >
        <label>Role<b style={{color:"red"}}> * </b></label>
        <select value={role} onChange={handleRole} style={{padding:"10px"}} >
        <option value="" disabled>
          Select Role
        </option>
        <option value="farmer">Farmer</option>
        <option value="investor">Investor</option>
        <option value="admin">Admin</option>
        </select>
        </div>
        <button onClick={save} className="save">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
