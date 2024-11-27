import React, { useState, useEffect, Component } from "react";
import NavBar from "./components/NavBar"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContext } from "./context/Context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./components/Calendar";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import Monthly from "./pages/Monthly";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);
  const [id, setId] = useState('')

  useEffect(() => {
    fetch("/check_session")
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        }
      }).then((user) => {
        console.log(user)
        setUser(user)
        setId(user.user.id)
      });
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, setUser, id, setId}}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/weekly" element={<Weekly />} />
            <Route path="/daily" element={<Daily />} />
            {/* Add other routes as needed */}
          </Routes>
          <Footer />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;


