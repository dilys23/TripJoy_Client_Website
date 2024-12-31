import Hero from "./Home/Hero";
import Navbar from "../components/Header/Navbar1";
import Fetured from "./Home/Featured";
import Packages from "./Home/Packages";
import Extension from "./Home/Extension";

// import Discover from "../components/Layout/Discover"
import Footer from "./Home/Footer";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header/Header";
function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Header></Header>
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
