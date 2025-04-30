import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Chat from "./Chat";
import { useAuth } from "./context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import Profile from "./profile/Profile";
import Logout from "./home/left1/Logout";
import About from "./about/About";

function App() {
  const { authuser } = useAuth(); // ✅ Correct object destructuring

  if (authuser === undefined) return <div>Loading</div>;

  return (
    <>
    
    <div className="bg-DarkGray">
      
      {/* */}
      <Routes>
        <Route
          path="/"
          element={authuser ? <Chat /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={authuser ? <Navigate to={"/"} /> : <Login />}
        />

        <Route
          path="/signup"
          element={authuser ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route path="/profile" element={ <Profile />} />
        <Route path="/about" element={ <About/>} />

      </Routes>
      <Toaster /> 
    </div>
    </>
    
  );
}

export default App;
