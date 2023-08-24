import React from "react";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <div >
      <div>
        <a href="https://github.com/SebastianAsprino/" target="_blank" rel="noopener noreferrer">
          <button>
            GitHub
          </button>
        </a>
        <NavLink to="/home">
          <button>
            Go to Home
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;
