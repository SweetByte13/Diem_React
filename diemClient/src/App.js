import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/Context";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
