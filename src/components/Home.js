import React from "react";
import { Link } from "react-router-dom";
import "./style/home.css";

const Home =()=> {
  return (
      <div className="container">
        <div className="text-content">
          <p>
            KOD ACIKTIRIR <br /> PIZZA, DOYURUR
          </p>
        </div>
        <div className="button">
          <button id="order-pizza">
          <Link style={{ textDecoration: "none" }} to="/pizza">ACIKTIM</Link>
          </button>
        </div>    
    </div>
  );
}
export default Home;