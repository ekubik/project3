import React from "react";
import MailOutlineRounded from "@mui/icons-material/MailOutlineRounded";
import {
  Twitter,
  Facebook,
  GitHub,
  Instagram,
} from "@mui/icons-material";

const InstagramLink = () => {
    return (
        <a href= "https://instagram.com"> {Instagram} </a>
    )
}

const Footer = () => {
  return (
    <footer>
        <div>
        <div>
        <MailOutlineRounded />
        </div>
      <div>
        <Twitter />
      </div>
      <div>
        <Facebook />
      </div>
      <div> <Instagram/> </div>
      <div> {InstagramLink}</div>
      </div>
      <h4> Created by Ewa Kubik 2022</h4>
    </footer>
  );
};

export default Footer;
