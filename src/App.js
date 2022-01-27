import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlankSlate from './pages/404/404'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<BlankSlate />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
