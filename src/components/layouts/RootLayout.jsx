import React from "react";
import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="content">
      <Header />
      <main className="router-content">
        <Outlet />
      </main>
    </div>
  );
}
