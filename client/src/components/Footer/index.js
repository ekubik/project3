import React from "react";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import {
  Twitter,
  Facebook,
  Instagram,
  Copyright,
} from "@mui/icons-material";

import "../../styles/Footer.css"




const Footer = () => {
  return (
    <footer className = "container-fluid">
      <div className = "row">
        <div className="d-flex container justify-content-center ">
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
      <div className=" d-flex container justify-content-center">
      <h4> Created by Ewa Kubik   <Copyright fontSize="small" />    2022</h4>
      </div>
     </div>
    </footer>
  );
};

export default Footer;
