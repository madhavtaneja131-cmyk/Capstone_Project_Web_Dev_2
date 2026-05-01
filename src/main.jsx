import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProfileProvider } from "./Context/ProfileContext";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </React.StrictMode>
);