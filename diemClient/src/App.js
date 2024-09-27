import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/Context";
import Footer from "./components/Footer";
import NavBarLogIn from "./components/NavBarLogIn";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Monthly from "./pages/Monthly";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
      {user === null || user === undefined ? <NavBarLogIn /> : <NavBar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/monthly' element={<Monthly />} />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default App;
