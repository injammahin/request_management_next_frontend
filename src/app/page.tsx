// HomePage.tsx

import React from "react";
// import "./HomePage.css"; // Ensure this CSS file includes the new styles

const HomePage: React.FC = () => {
  return (
    <div className="homePageContainer">
      <div className="animatedBackground"></div>{" "}
      {/* Parallax or animated background */}
      <div className="contentWrapper">
        <div className="logoContainer">
          <img
            src="./new-logo.png"
            alt="Dhaka Bank"
            className="bankLogo1 h-20 w-96 opacity-medium"
          />
        </div>
        <div className="textContainer">
          <h1 className="welcomeText">Welcome to Dhaka Bank</h1>
          <p className="loginPrompt">Please login to your portal</p>

          <div className="buttonContainer">
            <a href="/user/login" className="signInButton">
              Sign In
            </a>
            <a href="/user/registration" className="signUpButton">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
