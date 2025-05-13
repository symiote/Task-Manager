import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axios from "axios"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  //if user is already loggedin then naviagte to home page
  if(isLoggedIn == true){
    navigate("/")
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup= async(e)=>{
    e.preventDefault();

    if (username==="" || email==="" || password==="") {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please Enter a valid email address.");
      return;
    }
  
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/v1/sign-in",{username,email,password});
      
      setUsername("");  
      setEmail(""); 
      setPassword("");

      console.log(response);
      console.log("signup Success:", response.data);

      toast.success("Signup complete");
      
      navigate("/login")  

    } catch (error) {
      console.error(error);
      
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong.please try agian.");
      }
    } 

  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-5/6 p-4 lg:w-2/6 sm:w-5/6 rounded-xl bg-white shadow-lg ">
        <div className="font-semibold text-2xl">Signup</div>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-100 py-2 px-3 my-3 mt-5 w-full border border-gray-300 rounded-md focus:outline-none "
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          required
          className="bg-gray-100 py-2 px-3 my-3 w-full border border-gray-300 rounded-md focus:outline-none "
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-gray-100 py-2 px-3 my-3 w-full border border-gray-300 rounded-md focus:outline-none "
          onChange={({ target }) => setPassword(target.value)}
        />
        {error && <p className="text-red-600 text-[14px]">{error}</p>}
        <button onClick={handleSignup} className="btn-primary w-full bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold text-md mt-4">
          SignUp
        </button>
        <p className="m-2 text-sm text-gray-600">
          {" "}
          already have an Account?{" "}
          <Link className="text-violet-700 font-bold underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
