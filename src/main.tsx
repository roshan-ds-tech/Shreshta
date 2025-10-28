import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#FFF8E7",
          color: "#2C1810",
          border: "1px solid #D4AF37",
          fontWeight: "500",
        },
      }}
    />
  </React.StrictMode>
);
