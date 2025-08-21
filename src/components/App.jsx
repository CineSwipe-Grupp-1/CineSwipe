import { Navbar } from "./Navbar";
import "../styles/App.css";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="app-layout">
      <main className="page-content">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}
