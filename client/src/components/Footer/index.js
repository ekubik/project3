import React from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import {
  TwitterIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
} from "@mui/icons-material";

const Instagram = () => {
    return (
        <a href= "https://instagram.com"> {InstagramIcon} </a>
    )
}

const Footer = () => {
  return (
    <footer>
        <div>
        <div>
        <MailOutlineRoundedIcon />
        </div>
      <div>
        <TwitterIcon />
      </div>
      <div>
        <FacebookIcon />
      </div>
      <div> <InstagramIcon/> </div>
      <div> {Instagram}</div>
      </div>
      <h4> Created by Ewa Kubik 2022</h4>
    </footer>
  );
};

export default Footer;
