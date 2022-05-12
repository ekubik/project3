import React from "react";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import {
  Twitter,
  Facebook,
  GitHub,
  Instagram,
  Copyright,
} from "@mui/icons-material";


const Footer = () => {
  return (
    <footer>
        <div className="d-flex container-fluid  justify-content">
        <div>
       <a href="mailto:ewa.kubik@hotmail.com"><MailOutlineRounded /> </a>
        </div>
      <div>
        <a href="https://twitter.com" target="_blank"> <Twitter /> </a>
      </div>
      <div>
        <a href="https://facebook.com" target="_blank"><Facebook /> </a>
      </div>
      <div> <a href="https://instagram.com" target="_blank"><Instagram/> </a> </div> 
      </div>
      <h4> Created by Ewa Kubik<Copyright />2022</h4>
    </footer>
  );
};

export default Footer;
