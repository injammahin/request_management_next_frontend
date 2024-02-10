// HomePage.tsx

import React from "react";
// import "./HomePage.css"; // Assuming you will create a separate CSS file for styles

const HomePage: React.FC = () => {
  return (
    <div className="homePageContainer">
      <div className="contentWrapper">
        <div className="logoContainer">
          <img src="./dhaka_bank.png" alt="Dhaka Bank" className="bankLogo" />
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
