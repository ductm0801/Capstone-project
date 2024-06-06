import React from "react";
import "../styles/footer.css";
import logo from "../images/Logo.png";
import { TfiEmail } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import appstore from "../images/Mobile-app-store-badge.png";
import android from "../images/Mobile-android-badge.png";

const Footer = () => {
  return (
    <div className="footer-bg">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <img className="logo-footer" src={logo} alt=""></img>
        <div>
          <p>Experiment our mobile app on</p>
          <div>
            <img
              style={{ marginLeft: "auto", marginBottom: "16px" }}
              src={appstore}
              alt=""
            ></img>
            <img style={{ marginLeft: "auto" }} src={android} alt=""></img>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <div style={{ marginBottom: "32px", maxHeight: 16 }}>
            PickleBall Tournament Management Software
          </div>
        </div>
        <ul className="footer-content-left">
          <li>Contact Us</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Support</li>
        </ul>
        <div style={{ display: "flex" }}>
          <i style={{ marginRight: "24px" }}>
            <TfiEmail />
          </i>
          <i>
            <FaFacebook />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
