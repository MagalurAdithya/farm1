// import React, { useState } from "react";
// import API from "../API";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import'./Login.css'
// import Home from "./Home";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleEmail = (e) => setEmail(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);

//   const login = async () => {
//     if (!email || !password) {
//       toast.error("Please fill out all fields");
//       return;
//     }
  
//     try {
//       const { data } = await API.post("/auth/login", { email, password });
//       console.log("Login Response:", data);
  
//       localStorage.setItem("token", data.token);
      
  
//       switch (data.role) {
//         case "farmer":
//           navigate("/farmerdashbord");
//           break;
//         case "investor":
//           navigate("/avaliable");
//           break;
//         case "admin":
//           navigate("/admin");
//           break;
//         default:
//           toast.error("Invalid user role");
//       }
  
//       toast.success("Login successful");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error in login");
//       console.error("Login Error:", error);
//     }
//   };
  

//   return (
//     <div>
//       <div><Home></Home></div>
//       <div className="body">
      
//       <div>
//       <div className="container">
//       <h2 className="head">Login</h2>
//       <div className="inputs">
//         <label>📧Email<b style={{color:"red"}}> * </b></label>
//         <input
//           type="email"
//           value={email}
//           placeholder="Enter your email"
//           onChange={handleEmail}
//           required
//         />
//       </div>

//       <div className="inputs">
//         <label>🔑Password<b style={{color:"red"}}> * </b></label>
//         <input
//           type="password"
//           value={password}
//           placeholder="Enter your password"
//           onChange={handlePassword}
//           required
//         />
//       </div>

//       <button className="login" onClick={login} >
//         Login
//       </button>

//       <p className="para">
//         Don't have an account? <Link to="/register">Sign Up</Link>
//       </p>
//     </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import Home from "./Home";
import API from "../API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import'./Login.css'

import 'boxicons/css/boxicons.min.css';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  // const [emails, setEmails] = useState("")
  // const [passwords, setPasswords] = useState("")
  const [role, setRole] = useState("")
    
  const handleFirstName = (e) => setFirstName(e.target.value)
  const handleLastName = (e) => setLastName(e.target.value)
  // const handleEmails = (e) => setEmails(e.target.value)
  // const handlePasswords = (e) => setPasswords(e.target.value)
  const handleRole = (e) => setRole(e.target.value)
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
          navigate("/avaliable");
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
      
    } catch (error) {
      toast.error("Error in Registration")
    }
  }

  return (
    <div>
      <div>
        <Home></Home>
      </div>
      <div className='body22'>
      <div className={`container ${isRegistering ? "active" : ""}`}>
        <div className='form-box login'>
          <form className='forms'>
            <h1>Login</h1>
            <div className='input-box'>
              <input type="email"
               value={email}
               placeholder="Enter your email"
               onChange={handleEmail}
               required />
              <i className='bx bxs-user'></i>
            </div>
            <div className='input-box'>
              <input 
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={handlePassword}
              required
              ></input>
              <i className='bx bxs-lock-alt'></i>
            </div>
           
            <button type='submit' className='buttons2' onClick={(e) => { e.preventDefault(); login(); }}>Login</button>

          </form>
        </div>


        <div className='form-box register'>
          <form className='forms'>
            <h1>register</h1>
            <div className='input-box'>
              <input 
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                onChange={handleFirstName}
               />
              
            </div>
            <div className='input-box'>
              <input
               type="text"
               value={lastName}
               placeholder="Enter your last name"
               onChange={handleLastName}
              ></input>
             
            </div>
            <div className='input-box'>
              <input 
               type="email"
               value={email}
               placeholder="Enter your email"
               onChange={handleEmail}
              ></input>
              <i className='bx bxs-user'></i>
            </div>
            <div className='input-box'>
              <input 
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={handlePassword}
              ></input>
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className='input-box'>
            <select value={role} onChange={handleRole} style={{padding:"10px"}} >
            <option value="" disabled>
            Select Role
            </option>
             <option value="farmer">Farmer</option>
             <option value="investor">Investor</option>
             <option value="admin">Admin</option>
            </select>  
            </div>
            {/* <button type='submit' className='buttons2' onClick={(e) => { e.preventDefault(); save(); }}>register</button> */}
            <button type='submit' className='buttons2' onClick={save}>register</button>
          </form>
        </div>
        <div className='toggle-box'>
          <div className='toggle-pannel toggle-left'>
              <h1>Hello, Welcome</h1>
              <p>Don't have an account</p>
              <button className="button" onClick={() => setIsRegistering(true)}>
                 Register
               </button>
          </div>
          <div className='toggle-pannel toggle-right'>
              <h1>Welcome Back</h1>
              <p>Already have an account</p>
              <button className="button" onClick={() => setIsRegistering(false)}>
                 Login
               </button>
          </div>
        <div>

        </div>
        </div>
      </div>
    </div>
    
    </div>
    
  )
}

export default Login



