// import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import Store from "./Store";
import First from "./First";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <Store /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First />}>
            <Route path="/store" element={<Store />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
