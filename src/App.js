import * as React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlankSlate from './pages/404/404'
import Login from './pages/Login/Login'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/*" element={<BlankSlate />} />
        <Route path="/*" element={<BlankSlate />} />
        <Route path="/log-in" element={<Login/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
