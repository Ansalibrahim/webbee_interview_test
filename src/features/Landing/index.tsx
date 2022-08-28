import React from "react";
import { Outlet } from "react-router-dom";
import "../../App.css";
import { AppNavbar } from "../../components/AppNavbar";

function Landing() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}

export default Landing;
