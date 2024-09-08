import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"
function DefaultLayout({ children }) {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <Sidebar></Sidebar>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;