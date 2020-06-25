import React from "react";
import Typed from "react-typed";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <>
      <div style={{ marginTop: "4rem" }}>
        <div style={{ height: "200px", marginBottom: "50px" }}>
          <Typed
            strings={[
              "<span className='w'>Welcome</span> to <span className='cb'>CHATBOX!</span> <br/><span className='cb'>Let's</span> chat <span className='w'>together</span>..",
            ]}
            typeSpeed={100}
            className="welcome-typed"
          />
        </div>
      </div>
      <div>
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          <Button id="welcome-btn" variant="contained" color="primary">
            Log In
          </Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
          <Button id="welcome-btn" variant="contained" color="secondary">
            Sign Up
          </Button>
        </Link>
      </div>
    </>
  );
}

export default WelcomePage;
