import { Outlet } from "react-router-dom";
import Navbar from "../Componets/NavBar";
import Footer from "../Componets/Footer";


const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-serif">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;