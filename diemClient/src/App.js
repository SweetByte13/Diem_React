import React, { useState, useEffect, Component } from "react";
import NavBar from "./components/NavBar"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppContext } from "./context/Context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./components/Calendar"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
      .then((resp) => {
        if (resp.ok) {
          return resp.json()
        }
      }).then((user) => {
        console.log(user.id)
        setUser(user)
      });
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/calendar" element={<Calendar />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
