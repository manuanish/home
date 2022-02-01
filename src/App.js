import * as React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlankSlate from './pages/404/404'
import SignUp from './pages/SignUp/SignUp'
import LogIn from './pages/Login/LogIn'
import app from './scripts/firebase';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/*" element={<BlankSlate />} />
        <Route path="/*" element={<BlankSlate />} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/log-in" element={<LogIn/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
