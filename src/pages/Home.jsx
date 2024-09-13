import Hero from "../components/Layout/Hero"
import Navbar from "../components/Header/Navbar"
import Fetured from "../components/Layout/Featured"
import Packages from "../components/Layout/Packages"
import Extension from "../components/Layout/Extension"
// import Discover from "../components/Layout/Discover"
import Footer from "../components/Footer/Footer"
function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Fetured />
            <Packages />
            <Extension />
            <Footer />
        </>
    );
}

export default Home;