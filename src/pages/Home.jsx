import Hero from "./Home/Hero";
import Navbar from "../components/Header/Navbar";
import Fetured from "./Home/Featured";
import Packages from "./Home/Packages";
import Extension from "./Home/Extension";
// import Discover from "../components/Layout/Discover"
import Footer from "./Home/Footer";
import { Toaster } from "react-hot-toast";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Fetured />
      <Packages />
      <Extension />
      <Footer />
      <Toaster />
    </>
  );
}

export default Home;
