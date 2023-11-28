import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

/// Footer component
function Footer() {
  // Social media from Ticketmaster
  const socialMedia = [
    {
      icon: <InstagramOutlined />,
      url: "https://www.instagram.com/ticketmaster/",
    },
    {
      icon: <YoutubeOutlined />,
      url: "https://www.youtube.com/user/Ticketmaster",
    },
    {
      icon: <TwitterOutlined />,
      url: "https://twitter.com/Ticketmaster",
    },
    {
      icon: <FacebookOutlined />,
      url: "https://www.facebook.com/Ticketmaster/",
    },
  ];

  return (
    <footer className="border-t bg-white border-stone-200 p-4 px-8 mb-2 flex flex-col md:flex-row items-center justify-between mt-16">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
        <Link to="/" className="mr-4 mb-4 md:mb-0">
          <img src={logo} className="w-48" alt="Page logo" />
        </Link>
        <div>
          {socialMedia.map((platform) => (
            <a
              key={platform.url}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4 hover:text-tmBlue transition"
            >
              {platform.icon}
            </a>
          ))}
        </div>
      </div>
      <p className="text-stone-400 text-xs">
        © 1999-2023 Ticketmaster. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
