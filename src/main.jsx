import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
  
    <UserProvider>
      <GlobalStyles>
        <ToastContainer className="justify-center" />
        <App />
      </GlobalStyles>
    </UserProvider>
 {/* </React.StrictMode> */}
  </>
);