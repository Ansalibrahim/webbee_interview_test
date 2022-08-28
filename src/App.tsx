import React from "react";
import "./App.css";
import Landing from "./features/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageTypes from "./features/ManageTypes";
import AllMachines from "./features/AllMachines";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/all" element={<AllMachines />} />
          <Route path="/types" element={<ManageTypes />} />
          <Route path="/type/:id" element={<AllMachines />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
