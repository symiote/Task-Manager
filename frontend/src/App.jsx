import { useEffect, useState } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import Incompletetask from "./pages/Incompletetask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { FaTruckArrowRight } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //redux
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("login status : ", isLoggedIn);

  //check- is not a loggedin user
  useEffect(() => {
    //if user get login then then we sstore id and token in localstorage so make redux call isloggedin now true
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn == false) {
      navigate("/signup");
    }
  }, []);

  return (
    <>
      {/* Your Routes / Components */}
      <ToastContainer position="bottom-right" autoClose={3000} />

      <div className="h-screen relative">
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
            <Route path="/importanttasks" element={<ImportantTask />} />
            <Route path="/completedtasks" element={<CompletedTask />} />
            <Route path="/incompletetasks" element={<Incompletetask />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        
        </Routes>
      </div>
    </>
  );
}

export default App;
