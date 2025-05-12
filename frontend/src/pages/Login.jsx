import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  //if user is already loggedin then naviagte to home page
  if(isLoggedIn == true){
    navigate("/")
  }

  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("All fields are required");
      return;
    }
  
    if (password.length < 6) {
      setError("password conatins at least 6 digits");
      return;
    }
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/v1/login", {
        username,
        password,
      });
      
      setUsername("");  setPassword("");
      // console.log(response);
      // console.log("login Success:", response.data);

      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
       
      //it will redirext ho home page
      navigate("/"); 
      toast.success(`Hi.. ${username}`)
      
    } catch (error) {
      console.error(error);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong.please try agian.");
      }
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-5/6 p-4 lg:w-2/6 sm:w-5/6  rounded-xl bg-white shadow-lg">
        <div className="font-semibold text-2xl">Login</div>
        <input
          type="username"
          name="username"
          placeholder="username"
          className="bg-gray-100 py-2 px-3 my-3 mt-5 w-full border border-gray-300 rounded-md focus:outline-none "
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="bg-gray-100 py-2 px-3 my-3 w-full border border-gray-300 rounded-md focus:outline-none "
          onChange={({ target }) => setPassword(target.value)}
        />
        
        {error && <p className="text-red-600 text-[14px]">{error}</p>}

        <button onClick={handleLogin} className="btn-primary w-full bg-blue-600 text-white px-3 py-2 rounded-xl font-semibold text-md mt-4">
          Login
        </button>
        <p className="m-2 text-sm text-gray-600">
          {" "}
          Not having an Account?{" "}
          <Link className="text-violet-700 font-bold underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
