import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function layout() {
  return (
    <div className="bg-bloom-1 min-h-dvw">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
